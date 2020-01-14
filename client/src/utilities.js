/**
 * Utilities that force synchronous behavior on every http request.
 * NEVER USE THIS IN AN ACTUAL WEBSITE!!
 */

const ASYNC_ENABLED = false;

// ex: formatParams({ some_key: "some_value", a: "b"}) => "some_key=some_value&a=b"
function formatParams(params) {
  // iterate of all the keys of params as an array,
  // map it to a new array of URL string encoded key,value pairs
  // join all the url params using an ampersand (&).
  return Object.keys(params)
    .map((key) => key + "=" + encodeURIComponent(params[key]))
    .join("&");
}

// Helper code to make a get request. Default parameter of empty JSON Object for params.
// Returns a Promise to a JSON Object.
export function get(endpoint, params = {}) {
  const fullPath = endpoint + "?" + formatParams(params);

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", fullPath, ASYNC_ENABLED);
    xhr.onload = (err) => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject(xhr.statusText);
        }
      }
    };
    xhr.onerror = (err) => {
      reject(xhr.statusText);
    };
    xhr.send(null);
  });
}

// Helper code to make a post request. Default parameter of empty JSON Object for params.
// Returns a Promise to a JSON Object.
export function post(endpoint, params = {}) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", endpoint, ASYNC_ENABLED);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.withCredentials = true;
    xhr.onload = (err) => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject(xhr.statusText);
        }
      }
    };
    xhr.onerror = (err) => {
      reject(xhr.statusText);
    };
    xhr.send(JSON.stringify(params));
  });
}
