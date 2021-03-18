<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand fluid href="#"
        >Not Your Average Life Coach</b-navbar-brand
      >
      <button @click="goToChatRoute" class="button-link">Chat</button>
    </b-navbar>
    <h2 class="text-dark">Chat Analysis</h2>
    <b-navbar
      toggleable="lg"
      type="dark"
      variant="info"
      fixed="bottom"
      class="center"
    >
      <b-navbar-nav class="mx-auto">
        <b-nav-item href="#">Part of Speech Tagging</b-nav-item>
        <b-nav-item href="#">Sentiment Analysis</b-nav-item>
        <b-nav-item href="#">Named Entity Recognition</b-nav-item>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
export default {
  methods: {
    goToChatRoute() {
      this.$router.push("/");
    }
  }
};
</script>

<style></style>
