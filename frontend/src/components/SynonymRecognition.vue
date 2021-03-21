<template>
  <div>
    <h3>
      Synonym Recognition
    </h3>
    <div v-if="conversation">
      <div v-html="fullText"></div>
    </div>
    <div v-else>
      Please chat first before Synonym Recognition analysis is available
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
      fullText: "",
      thesaurusText: ""
    };
  },
  created() {
    var posTagger = require("wink-pos-tagger");
    var thesaurus = require("thesaurus");
    if (this.$store.state.responseScore)
      this.conversation = this.$store.state.conversation;

    var flag;
    this.flag = 0;
    try {
      for (var i = 1; i < this.conversation.length; i = i + 2) {
        var tagger = posTagger();
        this.word = tagger.tagSentence(this.conversation[i].text);
        this.fullText +=
          '<table style="width:70%; margin-left: auto; margin-right: auto; text-align: left;" cellpadding="15" >';
        for (var f = 0; f < this.word.length; f++) {
          if (this.flag == 0) {
            this.fullText +=
              "<tr><h3><b>" + this.conversation[i].text + "</h3></b></tr>";
            this.fullText += "<tr><th>Word</th><th>Analysis</th></tr>";
          }
          if (thesaurus.find(this.word[f].value).length > 0) {
            for (var g = 0; g < thesaurus.find(this.word[f].value).length; g++) {
              if (g == thesaurus.find(this.word[f].value).length - 1) {
                this.thesaurusText += thesaurus.find(this.word[f].value)[g];
              } else {
                this.thesaurusText +=
                  thesaurus.find(this.word[f].value)[g] + ", ";
              }
            }
          } else {
            this.thesaurusText = "None";
          }

          this.fullText +=
            "<tr><td>" +
            this.word[f].value +
            "</td><td>" +
            this.thesaurusText +
            "</td></tr>";
          this.flag = 1;
          this.thesaurusText = "";
        }
        this.flag = 0;
        this.fullText += "</table>";
      }
    } catch {}
  }
};
</script>

<style></style>
