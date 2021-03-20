<template>
  <div>
    <h3>
      Part of Speech Tagging
    </h3>
    <div v-if="conversation">
      <div v-for="message in conversation" :key="message.index">
        {{ message.chatStyle }} said: {{ message.text }}
      </div>
    </div>
    <div v-else>
      Please go chat
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      conversation: undefined
    };
  },
  created() {
    if (this.$store.state.responseScore)
      this.conversation = this.$store.state.conversation;
  }
};
</script>

<style></style>
