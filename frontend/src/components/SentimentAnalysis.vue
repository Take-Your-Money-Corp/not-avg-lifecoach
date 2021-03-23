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
      conversation: undefined
    };
  },
  mounted() {
    if (this.$store.state.allConvoData) {
      this.repliesAndSentimentAnalyses = this.$store.state.allConvoData.activities;
      this.conversation = this.$store.state.conversation;
      // console.log(this.response.nlp.classifications);
    }
  }
};
</script>

<style></style>
