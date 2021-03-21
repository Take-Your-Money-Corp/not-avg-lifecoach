<template>
  <div>
    <h3>Sentiment Analysis</h3>
    <!-- <BotReplyAccordian :response="response" /> -->

    <div v-html="fullText"></div>
  </div>
</template>

<script>
import BotReplyAccordian from "@/components/BotReplyAccordian.vue";

export default {
  components: {
    // BotReplyAccordian
  },
  data() {
    return {
      response: undefined,
      word: undefined,
      sentence: "",
      fullText: ""
    };
  },
  created() {
    if (this.$store.state.responseScore) {
      this.response = this.$store.state.responseScore;

      console.log(this.$store);
      //console.log(this.response.nlp.classifications);
      //console.log(this.response.nlp);
      console.log(this.response.nlp.classifications[0].intent);
      console.log(this.response.nlp.classifications[0].score);
      // console.log(this.response.nlp.classifications);
      var flag;
      this.flag = 0;
      try {
        for (var i = 1; i < this.response.nlp.classifications.length; i++) {
          this.word = "test";
          this.fullText +=
            '<table style="width:20%; margin-left: auto; margin-right: auto;" cellpadding="0" cellspacing="0">';
          for (var f = 0; f < this.word.length; f++) {
            if (this.flag == 0) {
              this.fullText +=
                "<tr><h3><b>" + this.conversation[i].text + "</h3></b></tr>";
              this.fullText += "<tr><th>Word</th><th>Analysis</th></tr>";
            }
            this.fullText +=
              "<tr><td>" +
              this.word[f].value +
              "</td><td>" +
              this.word[f].pos +
              "</td></tr>";
            this.flag = 1;
          }
          this.flag = 0;
          this.fullText += "</table>";
          console.log("haha");
        }
      } catch {}
    }
  }
};
</script>

<style></style>
