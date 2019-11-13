//utility functions to make API requests.

//convert JSON Object of Params to URL String of params
// ex: {"some_key":"some_value", "a": "b"} => "some_key=some_value&a=b"
function formatParams(params) {
  //iterate of all the keys of params as an array,
  // map it to a new array of URL string encoded key,value pairs
  // join all the url params using an ampersand (&).
  return Object.keys(params)
    .map(function(key) {
      return key + "=" + encodeURIComponent(params[key]);
    })
    .join("&");
}

// Helper code to make a get request. Default parameter of empty JSON Object for params.
export function get(endpoint, params = {}) {
  const fullPath = endpoint + "?" + formatParams(params);
  return fetch(fullPath).then((res) => res.json());
}

// Helper code to make a post request.
export function post(endpoint, body = {}) {
  return fetch(endpoint, {
    method: "post",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(body),
  }).then((res) => res.json());
}
