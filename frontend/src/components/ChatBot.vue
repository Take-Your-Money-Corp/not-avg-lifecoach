<template>
  <div id="chat-bot">
    <p class="bot-message" v-if="showReplyFlag">Bot said: {{ reply }}</p>
    <p class="user-message" v-if="showMessageFlag">You said: {{ ourMessage }}</p>
    <input type="text" v-model="ourMessage" />
    <button @click="sendMessage">Send Message</button>
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
          this.getReply()
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

#chat-bot {
  padding: 100px;
  border:#42b983 solid 1px;
  width: 300px;
  display:flex;
  flex-direction: column;
  // justify-self: center;
  margin: 0 auto;
}
</style>
