<template>
  <div>
    <h3>
      Part of Speech Tagging
    </h3>
    <div v-if="conversation">
      <div v-html="fullText"></div>
    </div>
    <div v-else>
      Please chat first before POS Tagging analysis is available
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      conversation: undefined,
      word: undefined,
      sentence: "",
      fullText: ""
    };
  },
  created() {
    var posTagger = require("wink-pos-tagger");
    if (this.$store.state.responseScore)
      this.conversation = this.$store.state.conversation;

    var i;
    var f;
    var flag;
    this.flag = 0;
    try {
      for (i = 1; i < this.conversation.length; i = i + 2) {
        var tagger = posTagger();
        this.word = tagger.tagSentence(this.conversation[i].text);
        this.fullText +=
          '<table style="width:20%; margin-left: auto; margin-right: auto;" cellpadding="0" cellspacing="0">';
        for (f = 0; f < this.word.length; f++) {
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
      }
    } catch {}
  }
};
</script>

<style></style>
