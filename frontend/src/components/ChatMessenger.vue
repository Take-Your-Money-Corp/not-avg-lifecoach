<template>
  <div id="chat-bot">
    <div id="chat-header">
      <h3>Not Your Average Life Coach</h3>
    </div>
    <div class="chat-messages" v-chat-scroll>
      <div class="filler"></div>
      <div v-for="(message, index) in conversation" :key="message.index">
        <Bot :conversation="conversation" :index="index" />
        <User :conversation="conversation" :index="index" />
      </div>
    </div>
    <div class="user-input">
      <input
        :disabled="!typingEnabled"
        ref="textinput"
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
import { makeHandshake, postMessage, getBotReply } from "@/services/axios.js";
import VueChatScroll from "vue-chat-scroll";
import Bot from "@/components/Bot.vue";
import User from "./User.vue";
Vue.use(VueChatScroll);

export default {
  components: {
    Bot,
    User
  },
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
      typingEnabled: true
    };
  },

  name: "ChatBot",
  props: {
    msg: String
  },
  methods: {
    nlpHandshake() {
      makeHandshake()
        .then(dataId => {
          this.nlpRestToken = dataId;
        })
        .catch(error => {
          console.log(error);
        });
    },
    initialMessage() {
      this.conversation.push({
        chatStyle: "bot",
        message: "Hello, I am your Motivational Lifecoach, ask me anything!"
      });
    },
    sendMessage() {
      if (this.ourMessage != "") {
        this.userMessages.push(this.ourMessage);
        this.conversation.push({ chatStyle: "user", message: this.ourMessage });

        postMessage(this.ourMessage, this.nlpRestToken)
          .then(response => {
            this.typingEnabled = false;
            setTimeout(() => {
              this.reply = response.data;
              this.typingEnabled = true;
              this.$nextTick(() => {
                this.$refs["textinput"].focus();
              });
              this.getReply();
            }, Math.random() * 1500 + 500);
          })
          .catch(error => {
            console.log(error);
          })
          .finally(() => {
            this.ourMessage = "";
          });
      }
    },

    getReply() {
      getBotReply(this.nlpRestToken)
        .then(response => {
          this.reply =
            response.data.activities[(this.botMessageCount += 2)].text;
          this.botMessages.push(this.reply);
          this.conversation.push({ chatStyle: "bot", message: this.reply });
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {});
    },
    updateMessage(currentMessage) {
      this.ourMessage = currentMessage;
    }
  }
};
</script>

<style lang="scss">
@media only screen and (max-width: 600px) {
  #chat-bot {
    width: 100vw !important;
    height: 100vh !important;
    margin: 0 !important;
  }
}

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
  box-shadow: 0px 2px 5px 0px gray;
  z-index: 100;
}
#chat-header h3 {
  color: white;
  margin-top: 3%;
}

.send-message {
  background-color: white;
  z-index: 1;
  border: none;
  width: 3em;
  border-radius: 40px;
}
.user-input {
  background-color: white;
  border-top: grey solid 2px;
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

.filler {
  height: -webkit-fill-available;
}

.chat-messages {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  overflow-y: scroll;
  height: -webkit-fill-available;
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
}

.bot-flexbox {
  display: flex;
  justify-content: center;
  align-items: center;
}

.user-flexbox {
  display: flex;
  justify-content: center;
  align-items: center;
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
}

header .filler {
  flex: 0 10000 100%;
}
#send-icon {
  width: 1.75rem;
}

#chat-bot {
  padding: 0px;
  background-color: rgba(255, 255, 255, 0.747);
  border: #845ec2 solid 4px;
  width: 450px;
  height: 80vh;
  display: flex;
  flex-direction: column;
  margin: 30px auto;
  border-radius: 5px;
}
textarea:focus,
input:focus,
button:focus {
  outline: none;
}
</style>
