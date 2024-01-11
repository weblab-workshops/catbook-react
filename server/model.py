import json
import requests

# vector database: https://www.trychroma.com/
import chromadb

# to enforce typing in Python (:
from typing import TypedDict


class Doc(TypedDict):
    _id: str
    content: str


# initialize db
client = chromadb.Client()
collection = client.create_collection(name="retrieval_chroma_db_rag")

# huggingface endpoint
ENDPOINT = "https://zd61t1pdcidbysuu.us-east-1.aws.endpoints.huggingface.cloud"


def update(doc: Doc):
    """
    add a document to the collection if it does not already exist; otherwise, update it
    """
    collection.upsert(ids=[doc["_id"]], documents=[doc["content"]])


def delete(_id: str):
    """
    delete a document from the collection
    """
    collection.delete(ids=[_id])


def get_query(query: str, k: int):
    """
    return the top k documents from the collection
    """
    return collection.query(query_texts=[query], n_results=k)


def retrieval_augmented_generation(query: str, k: int):
    """
    prompt the llm using rag!
    """
    q = get_query(query, k)
    context = "\n".join([(document) for document in q["documents"][0]])
    prompt = (
        "Answer the following question. You are given some context to help answer the question: \n"
        + context
        + f"\n. Here is the question: {query}"
    )
    payload = {"inputs": prompt}
    response = requests.post(ENDPOINT, json=payload)
    if response.status_code == 200:
        result = response.json()
        print("success!", result[0]["generated_text"])
    else:
        print("error")


if __name__ == "__main__":
    print("done loading db")
    while True:
        cmd = input()
        cmd = cmd.split(" ", 1)
        match cmd[0]:
            case "add" | "update":
                doc = json.loads(cmd[1])
                update(doc)
                print("updated")
            case "delete":
                _idjson = json.loads(cmd[1])
                delete(_idjson["_id"])
                print("deleted")
            case "query":
                queryjson = json.loads(cmd[1])
                print(queryjson, queryjson["query"])
                retrieval_augmented_generation(queryjson["query"], 2)
            case _:
                print("invalid command")
