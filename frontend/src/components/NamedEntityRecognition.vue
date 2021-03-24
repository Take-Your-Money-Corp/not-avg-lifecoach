<template>
  <div>
    <h3>
      Named Entity Recognition
    </h3>
    <div v-if="$store.state.repliesAndSentimentAnalyses">
      <div v-for="message in conversation" :key="message.index">
        {{ message.chatStyle }} said: {{ message.text }}
      </div>
    </div>
    <div v-else>
      Please chat.
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
    if (this.$store.state.conversation)
      this.conversation = this.$store.state.conversation;
  }
};
</script>

<style></style>
