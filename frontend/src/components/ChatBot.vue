<template>
  <div class="chat-bot">
    <button @click="nlpHandshake">Make Conversation</button>
    <p>The convo Id is: {{ nlpRestToken }}</p>
    <input type="text" :ourMessage="ourMessage" />
    <button @click="sendMessage">Send Message</button>
    <p>Our message is {{ ourMessage }}</p>
    <button @click="getReply">Get Reply</button>
    <p>The reply is {{ reply }}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      nlpRestToken: "",
      ourMessage: "Hey you",
      reply: ""
    };
  },
  name: "HelloWorld",
  props: {
    msg: String
  },
  methods: {
    nlpHandshake() {
      axios
        .get("http://localhost:3000/rest/token")
        .then(response => {
          console.log(response.data);
          this.nlpRestToken = response.data.id;
        })
        .catch(error => {
          console.log(error);
        });
    },
    sendMessage() {
      axios({
        method: "post",
        url: `http://localhost:3000/directline/conversations/${this.nlpRestToken}/activities`,
        data: {
          text: this.ourMessage
        }
      })
        .then(response => {
          console.log(response.data.activities[1].text);
          this.reply = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    getReply() {
      axios
        .get(
          `http://localhost:3000/directline/conversations/${this.nlpRestToken}/activities`
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
