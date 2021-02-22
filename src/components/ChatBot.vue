<template>
  <div class="chat-bot">
    <input type="text" v-model="ourMessage" />
    <button @click="sendMessage">Send Message</button>
    <p v-if="showMessageFlag">You said: {{ ourMessage }}</p>
    <button @click="getReply">Get Reply</button>
    <p v-if="showReplyFlag">Bot said: {{ reply }}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  created() {
    this.nlpHandshake();
  },
  data() {
    return {
      nlpRestToken: "",
      ourMessage: "",
      reply: "",
      showMessageFlag: false,
      showReplyFlag: false
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
          this.nlpRestToken = response.data.id;
        })
        .catch(error => {
          console.log(error);
        });
    },
    sendMessage() {
      console.log(this.ourMessage);
      axios({
        method: "post",
        url: `http://localhost:3000/directline/conversations/${this.nlpRestToken}/activities`,
        data: {
          text: this.ourMessage
        }
      })
        .then(response => {
          this.showMessageFlag = true;
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
          this.showReplyFlag = true;
        })
        .catch(error => {
          console.log(error);
        });
    },
    updateMessage(currentMessage) {
      this.ourMessage = currentMessage;
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
