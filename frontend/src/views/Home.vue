<template>
  <div class="home">
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
