<template>
  <div id="chat-bot">
    <header>
      <div class="filler">
        <button class="minimize">
          <span class="ms-Icon ms-Icon--ChromeMinimize"> </span>
        </button>
      </div>
    </header>
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
    <div class="user-input">
      <input
        class="text-input"
        type="text"
        @keyup.enter="sendMessage"
        v-model="ourMessage"
      />
      <button @click="sendMessage" class="send-message">
        <img id="send-icon" src="./sendIcon.png" />
      </button>
    </div>
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
header {
  margin: 0em 0em 5em 0em;
  background-color: #d65db1;
  width: 20em;
  height: 2.5em;
  display: flex;
}
.send-message {
  background-color: white;
  z-index: 1;
  border: none;
  width: 3em;
  border-radius: 40px;
}
.user-input {
  border-top: grey solid 1px;
  margin: auto 0em 0em 0em;
  display: flex;
}
.text-input {
  padding: 1em;
  border-right: none;
  border-bottom: none;
  border-left: none;
  border-top: none;
  width: -webkit-fill-available;
}
.bot-message {
  background-color: #ff9671;
  margin: 0em auto 0em 0.5em;
  border: grey solid 1px;
  display: flex;
  border-radius: 10px;
  padding: 0.2em;
}
.user-message {
  background-color: #ffc75f;
  border: grey solid 1px;
  margin: 0em 0.5em 0em auto;
  display: flex;
  border-radius: 10px;
  padding: 0.2em;
}
header .filler {
  flex: 0 10000 100%;
}
#send-icon {
  width: 1.75rem;
}

#chat-bot {
  padding: 0px;
  background-color: white;
  border: #845ec2 solid 4px;
  width: 20em;
  height: 80vh;
  display: flex;
  flex-direction: column;
  // justify-self: center;
  margin: 30px auto;
}
</style>
