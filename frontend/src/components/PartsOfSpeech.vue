<template>
  <div>
    <h3>
      Part of Speech Tagging
    </h3>
    <br />
    <div v-if="conversation">
      <div v-if="conversation.length > 0" v-html="fullText"></div>
    </div>
    <div v-else>
      Please chat to enable POS Tagging
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
    ('<div class = "msg">');
    if (this.$store.state.conversation)
      this.conversation = this.$store.state.conversation;
    ("</div>");
    var i;
    var f;
    var flag;
    var meaning;
    this.flag = 0;
    try {
      for (i = 0; i < this.conversation.length; i = i + 2) {
        var tagger = posTagger();
        this.word = tagger.tagSentence(this.conversation[i].text);
        this.fullText += '<table class = "table">';
        for (f = 0; f < this.word.length; f++) {
          if (this.flag == 0) {
            this.fullText +=
              "<tr class = 'tr'><h3><b>" + this.conversation[i].text + "</h3></b></tr>";
            this.fullText +=
              "<tr class = 'tr'><th> Word </th><th> Abbreviation </th><th> Meaning </th></tr>";
          }
          if (this.word[f].pos == "UH") meaning = "interjection";
          if (this.word[f].pos == "CC") meaning = "coordinating conjunction";
          if (this.word[f].pos == "CD") meaning = "cardinal digit";
          if (this.word[f].pos == "DT") meaning = "determiner";
          if (this.word[f].pos == "EX") meaning = "existential there";
          if (this.word[f].pos == "FW") meaning = "foreign word";
          if (this.word[f].pos == "IN")
            meaning = "preposition/subordinating conjunction";
          if (this.word[f].pos == "JJ") meaning = "adjective";
          if (this.word[f].pos == "JJR") meaning = "adjective, comparitive";
          if (this.word[f].pos == "JJS") meaning = "adjective, superlative";
          if (this.word[f].pos == "LS") meaning = "list market";
          if (this.word[f].pos == "MD") meaning = "modal";
          if (this.word[f].pos == "NN") meaning = "noun, singular";
          if (this.word[f].pos == "NNS") meaning = "noun, plural";
          if (this.word[f].pos == "NNP") meaning = "proper noun";
          if (this.word[f].pos == "NNPS") meaning = "proper noun, plural";
          if (this.word[f].pos == "PDT") meaning = "predeterminer";
          if (this.word[f].pos == "POS") meaning = "possessive ending";
          if (this.word[f].pos == "PRP") meaning = "personal pronoun";
          if (this.word[f].pos == "PRP$") meaning = "possessive pronoun";
          if (this.word[f].pos == "RB") meaning = "adverb";
          if (this.word[f].pos == "RBR") meaning = "adverb, comparitive";
          if (this.word[f].pos == "RBS") meaning = "adverb, superlative";
          if (this.word[f].pos == "RP") meaning = "particle";
          if (this.word[f].pos == "TO") meaning = "infinite marker";
          if (this.word[f].pos == "VB") meaning = "verb";
          if (this.word[f].pos == "VBG") meaning = "verb gerund";
          if (this.word[f].pos == "VBD") meaning = "verb past tense";
          if (this.word[f].pos == "VBN") meaning = "verb past participle";
          if (this.word[f].pos == "VBP")
            meaning = "verb, present tense not 3rd person singular";
          if (this.word[f].pos == "VBZ")
            meaning = "verb, present tense with 3rd person singular";
          if (this.word[f].pos == "WDT") meaning = "wh-determiner";
          if (this.word[f].pos == "WP") meaning = "wh-pronoun";
          if (this.word[f].pos == "WRB") meaning = "wh-adverb";

          this.fullText +=
            "<tr class = 'tr'><td>" +
            this.word[f].value +
            "</td><td>" +
            this.word[f].pos +
            "</td><td>" +
            meaning;
          ("</td></tr>");
          this.flag = 1;
        }
        this.flag = 0;
        this.fullText += "</table>";
      }
    } catch {}
  }
};
</script>

<style>
.table {
  width: 50%;
  margin: auto;
  border: none;
  overflow: scroll;
}
.tr:nth-child(odd) {background-color: #f0f0f0;}
.tr:hover {background-color: rgb(234, 225, 238);}
</style>
