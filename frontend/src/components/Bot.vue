<template>
  <div class="bot-flexbox" v-if="conversation[index].chatStyle === 'bot'">
    <img class="botPic" src="../assets/male.png" />
    <p
      v-if="language === 'French'"
      data-testid="botMessage"
      class="chat-message botMessage"
    >
      {{ conversation[index].text }}
    </p>
    <p
      v-else-if="language === 'English'"
      data-testid="botMessage"
      class="chat-message botMessage"
    >
      {{ frenchText }}
    </p>
  </div>
</template>

<script>
import translate from "translate";

export default {
  created() {
    translate.engine = "libre";
    this.translateToFrench(this.conversation[this.index].text);
  },
  methods: {
    async translateToFrench(englishText) {
      this.frenchText = await translate(englishText, "fr");
    }
  },
  data() {
    return {
      frenchText: ""
    };
  },
  props: {
    conversation: {
      type: Array
    },
    index: {
      type: Number
    },
    language: {
      type: String
    }
  }
};
</script>
