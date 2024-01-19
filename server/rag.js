require("dotenv").config();
const Document = require("./models/document");

const ANYSCALE_API_KEY = process.env.ANYSCALE_API_KEY;
const CHROMADB_URI = process.env.CHROMADB_URI || "http://localhost:8000";

// some information about this model: https://ai.meta.com/llama/
const MODEL = "meta-llama/Llama-2-13b-chat-hf";

// another common choice of embedding model is text-embedding-ada-002.
// we use gte-large because this is the only embedding model anyscale has access to
const EMBEDDING_MODEL = "thenlper/gte-large";

// anyscale uses openAI under the hood! but anyscale gives us $10 free credits
const { OpenAI } = require("openai");
const anyscale = new OpenAI({
  baseURL: "https://api.endpoints.anyscale.com/v1",
  apiKey: ANYSCALE_API_KEY,
});

// check whether the api key is valid.
// this is only called on server start, so it does not waste too many resources (and will present expensive server crashes when api keys expire)
let hasapikey = false;
const validateAPIKey = async () => {
  try {
    await anyscale.chat.completions.create({
      model: "meta-llama/Llama-2-7b-chat-hf",
      messages: [{ role: "system", content: "" }],
    });
    hasapikey = true;
    return hasapikey;
  } catch {
    console.log("validate api key failed");
    return hasapikey;
  }
};

const isRunnable = () => hasapikey && collection !== null;

// embedding helper function
const generateEmbedding = async (document) => {
  const embedding = await anyscale.embeddings.create({
    model: EMBEDDING_MODEL,
    input: document,
  });
  return embedding.data[0].embedding;
};

// initialize vector database
const COLLECTION_NAME = "catbook-collection";
const { ChromaClient } = require("chromadb");
const client = new ChromaClient({
  path: CHROMADB_URI,
});

let collection = null;

// sync main and vector dbs
const syncDBs = async () => {
  // retrieve all documents
  const allDocs = await collection.get();
  // delete all documents
  await collection.delete({
    ids: allDocs.ids,
  });
  // retrieve corpus from main db
  const allMongoDocs = await Document.find({});
  if (allMongoDocs.length === 0) {
    // avoid errors associated with passing empty lists to chroma
    console.log("number of documents", await collection.count());
    return;
  }
  const allMongoDocIds = allMongoDocs.map((mongoDoc) => mongoDoc._id.toString());
  const allMongoDocContent = allMongoDocs.map((mongoDoc) => mongoDoc.content);
  let allMongoDocEmbeddings = allMongoDocs.map((mongoDoc) => generateEmbedding(mongoDoc.content));
  allMongoDocEmbeddings = await Promise.all(allMongoDocEmbeddings); // ensure embeddings finish generating
  // add corpus to vector db
  await collection.add({
    ids: allMongoDocIds,
    embeddings: allMongoDocEmbeddings,
    documents: allMongoDocContent,
  });
  console.log("number of documents", await collection.count());
};

const initCollection = async () => {
  await validateAPIKey();
  if (!hasapikey) return;
  try {
    collection = await client.getOrCreateCollection({
      name: COLLECTION_NAME,
    });
    // initialize collection embeddings with corpus
    // in production, this function should not run that often, so it is OK to resync the two dbs here
    await syncDBs();
    console.log("finished initializing chroma collection");
  } catch (error) {
    console.log("chromadb not running");
  }
};

// This is an async function => we don't know that the collection is
// initialized before someone else runs functions that depend on the
// collection, so we could get null pointer errors when collection = null
// before initCollection() has finished. That's probably okay, but if we
// see errors, it's worth keeping in mind.
initCollection();

// add a document to collection
const addDocument = async (document) => {
  // TODO(step1): add document to chroma
};

// delete a document in collection
const deleteDocument = async (id) => {
  // TODO(step1): delete document from chroma
};

// update a document in collection
const updateDocument = async (document) => {
  // TODO(step1): update document in chroma
};

module.exports = {
  isRunnable: isRunnable,
  addDocument: addDocument,
  updateDocument: updateDocument,
  deleteDocument: deleteDocument,
};
