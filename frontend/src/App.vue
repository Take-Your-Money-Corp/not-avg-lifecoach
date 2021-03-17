<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
@import "@/scss/theme.scss";
html,
body {
  margin: 0;
  padding: 0;
  background-color: $primaryLight !important;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
