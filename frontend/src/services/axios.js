import axios from "axios";

export async function makeHandshake() {
  const response = await axios.get("http://localhost:3000/rest/token");
  return response.data.id;
}

export function postMessage(ourMessage, nlpRestToken) {
  return axios({
    method: "post",
    url: `http://localhost:3000/directline/conversations/${nlpRestToken}/activities`,
    data: {
      text: ourMessage
    }
  }).then(response => response);
}

export function getBotReply(nlpRestToken) {
  return axios.get(
    `http://localhost:3000/directline/conversations/${nlpRestToken}/activities`
  );
}
