<template>
  <div class="hello">
    <button @click="submit">Make Conversation</button>
    <p>The convo Id is: {{ convoId }}</p>
    <button @click="sendMessage">Send Message</button>
    <!-- <p>The reply is {{ reply }}</p> -->
    <button @click="getReply">Get Reply</button>
    <p>The reply is {{ reply }}</p>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      convoId: "",
      reply: ""
    };
  },
  name: "HelloWorld",
  props: {
    msg: String
  },
  methods: {
    submit() {
      axios
        .get("http://localhost:3000/rest/token")
        .then(response => {
          console.log(response.data);
          this.convoId = response.data.id;
        })
        .catch(error => {
          console.log(error);
        });
    },
    sendMessage() {
      axios({
        method: "post",
        url: `http://localhost:3000/directline/conversations/${this.convoId}/activities`,
        headers: {
          "Content-Type": "application/json"
        },
        data: {
          text: "who are you",
          textFormat: "plain",
          type: "message",
          channelId: "webchat",
          from: { id: "User", name: "", role: "user" },
          locale: "es-ES",
          timestamp: "2021-02-02T14:14:04.268Z",
          entities: [
            {
              requiresBotState: true,
              supportsListening: true,
              supportsTts: true,
              type: "ClientCapabilities"
            }
          ]
        }
      })
        .then(response => {
          console.log(response.data);
          // this.reply = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    getReply() {
      axios
        .get(
          `http://localhost:3000/directline/conversations/${this.convoId}/activities`
        )
        .then(response => {
          this.reply = response.data.activities[1].text;
          console.log(response.data.activities[1].text);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
