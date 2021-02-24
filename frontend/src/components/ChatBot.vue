<template>
  <div id="chat-bot">
    <div v-if="showReplyFlag">
      <p
        v-for="botMessage in botMessages"
        :key="botMessage.index"
        class="bot-message"
      >
        Bot said: {{ botMessage }}
      </p>
    </div>

    <div v-if="showMessageFlag">
      <p
        v-for="userMessage in userMessages"
        :key="userMessage.index"
        class="user-message"
      >
        You said: {{ userMessage }}
      </p>
    </div>
    <input type="text" @keyup.enter="sendMessage" v-model="ourMessage" />
    <button @click="sendMessage">Send</button>
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
      showReplyFlag: false,
      botMessages: [],
      userMessages: [],
      botMessageCount: -1
    };
  },
  name: "ChatBot",
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
      this.userMessages.push(this.ourMessage);

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
          this.getReply();
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
          this.reply =
            response.data.activities[(this.botMessageCount += 2)].text;
          this.botMessages.push(this.reply);
          this.showReplyFlag = true;
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          console.log("user messages " + this.userMessages);
          console.log("bot messages " + this.botMessages);
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
  border: #42b983 solid 1px;
  width: 300px;
  display: flex;
  flex-direction: column;
  // justify-self: center;
  margin: 0 auto;
}
</style>
