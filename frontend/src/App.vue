<template>
  <div id="app">
    <ChatBot />
  </div>
</template>
<script>
import ChatBot from "@/components/ChatBot.vue";

export default {
  components: {
    ChatBot
  }
};
</script>

<style lang="scss">
html,
body {
  margin: 0;
  padding: 0;
  background-color: thistle;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
