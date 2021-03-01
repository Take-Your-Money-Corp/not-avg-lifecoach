import axios from "axios";

export function makeHandshake() {
  return axios.get("http://localhost:3000/rest/token").then(response => {
    return response.data.id;
  });
}

export function postMessage(ourMessage, nlpRestToken) {
  return axios({
    method: "post",
    url: `http://localhost:3000/directline/conversations/${nlpRestToken}/activities`,
    data: {
      text: ourMessage
    }
  }).then(response => {
    return response;
  });
}

export function getBotReply(nlpRestToken) {
  return axios
    .get(
      `http://localhost:3000/directline/conversations/${nlpRestToken}/activities`
    )
    .then(response => response);
}
