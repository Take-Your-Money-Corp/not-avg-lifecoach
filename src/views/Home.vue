<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <ChatBot msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import ChatBot from "@/components/ChatBot.vue";

export default {
  name: "Home",
  components: {
    ChatBot
  }
};
</script>
