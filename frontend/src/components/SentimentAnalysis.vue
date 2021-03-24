<template>
  <div>
    <h3>Sentiment Analysis</h3>
    <BotReplyAccordian
      :repliesAndSentimentAnalyses="repliesAndSentimentAnalyses"
      :conversation="conversation"
    />
  </div>
</template>

<script>
import BotReplyAccordian from "@/components/BotReplyAccordian.vue";

export default {
  components: {
    BotReplyAccordian
  },
  data() {
    return {
      repliesAndSentimentAnalyses: undefined,
      conversation: []
    };
  },
  created() {
    if (this.$store.state.conversation && this.$store.state.allConvoData) {
      this.repliesAndSentimentAnalyses = this.$store.state.allConvoData.activities;
      this.conversation = this.$store.state.conversation;
      this.conversation.shift();
    }
  }
};
</script>

<style></style>
