<template>
  <div id="chat-bot">
    <div id="chat-header">
        <h3>Not Your Average Life Coach</h3>
    </div>
    <div class="chat-messages" v-chat-scroll>
      <div v-for="(message, index) in conversation" :key="message.index">
        <div v-if="conversation[index].chatStyle === 'bot'">
          <img class="botPic" src="../assets/male.png" />
          <p class="chat-message botMessage">
            {{ conversation[index].message }}
          </p>
        </div>
        <div v-if="conversation[index].chatStyle === 'user'">
          <img class="userPic" src="../assets/female.png" />
          <p class="chat-message userMessage">
            {{ conversation[index].message }}
          </p>
        </div>
      </div>
    </div>
    <div class="user-input">
      <input
        class="text-input"
        type="text"
        @keyup.enter="sendMessage"
        v-model="ourMessage"
        placeholder="Type a message..."
      />
      <button @click="sendMessage" class="send-message">
        <img id="send-icon" src="../assets/sendIcon.png" />
      </button>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import VueChatScroll from "vue-chat-scroll";
Vue.use(VueChatScroll);

export default {
  created() {
    this.nlpHandshake();
    this.initialMessage();
  },
  data() {
    return {
      nlpRestToken: "",
      ourMessage: "",
      reply: "",
      botMessages: [],
      userMessages: [],
      botMessageCount: -1,
      conversation: [],
    };
  },

  name: "ChatBot",
  props: {
    msg: String,
  },
  methods: {
    nlpHandshake() {
      axios
        .get("http://localhost:3000/rest/token")
        .then((response) => {
          this.nlpRestToken = response.data.id;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    initialMessage() {
      this.conversation.push({
        chatStyle: "bot",
        message: "Hello, I am your Motivational Lifecoach, ask me anything!",
      });
    },
    sendMessage() {
      console.log(this.ourMessage);
      if (this.ourMessage != "") {
        this.userMessages.push(this.ourMessage);
        this.conversation.push({ chatStyle: "user", message: this.ourMessage });

        axios({
          method: "post",
          url: `http://localhost:3000/directline/conversations/${this.nlpRestToken}/activities`,
          data: {
            text: this.ourMessage,
          },
        })
          .then((response) => {
            this.reply = response.data;
            this.getReply();
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            this.ourMessage = "";
          });
      }
    },

    getReply() {
      axios
        .get(
          `http://localhost:3000/directline/conversations/${this.nlpRestToken}/activities`
        )
        .then((response) => {
          this.reply =
            response.data.activities[(this.botMessageCount += 2)].text;
          this.botMessages.push(this.reply);
          this.conversation.push({ chatStyle: "bot", message: this.reply });
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          console.log(this.conversation);
          this.scrollToElement();
        });
    },
    updateMessage(currentMessage) {
      this.ourMessage = currentMessage;
    },
    scrollToElement() {
      const el = this.$el.getElementsByClassName("chat-messages");

      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "end" });
      }
    },
  },
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
#chat-header {
  margin: 0em 0em auto 0em;
  background-color: #d65db1;
  justify-content: center;
  height: 2.5em;
  display: flex;
}
#chat-header h3 {
  color: white;
  margin: 0em, auto, auto, auto;
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
  margin: 0em 0em 0em 0em;
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
.chat-messages {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  overflow-y: scroll;
}

.chat-message {
  display: flex;
  width: 50%;
  padding: 0.2em;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
}
.botMessage {
  background-color: #ff9671;
  margin-right: auto;
  margin-left: 5px;
  border-radius: 5px;
  box-shadow: 0px 4px 4px rgba(100, 75, 65, 0.25);
  padding-left: 15px;
  padding-top: 15px;
  padding-bottom: 15px;
  padding-right: 15px;
}

.botPic {
  width: 3em;
  height: 3em;
  float: left;
}

.userMessage {
  background-color: #ffc75f;
  margin-left: auto;
  margin-right: 5px;
  border-radius: 5px;
  margin-bottom: 1em;
  box-shadow: 0px 4px 4px rgba(100, 86, 61, 0.25);
  padding-left: 15px;
  padding-top: 15px;
  padding-bottom: 15px;
  padding-right: 15px;
}
.userPic {
  width: 3em;
  height: 3em;
  float: right;
}

header .filler {
  flex: 0 10000 100%;
}
#send-icon {
  width: 1.75rem;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
}

#chat-bot {
  padding: 0px;
  background-color: rgba(255, 255, 255, 0.774);
  border: #845ec2 solid 4px;
  width: 20em;
  height: 80vh;
  display: flex;
  flex-direction: column;
  // justify-self: center;
  margin: 30px auto;
  border-radius: 5px;
}
textarea:focus,
input:focus {
  outline: none;
}
</style>
