<template>
  <div>
    <h3>Sentiment Analysis</h3>
    <BotReplyAccordian :response="response" />
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
      response: undefined
    };
  },
  mounted() {
    if (this.$store.state.responseScore) {
      this.response = this.$store.state.responseScore;
      // console.log(this.response.nlp.classifications);
    }
  }
};
</script>

<style></style>
