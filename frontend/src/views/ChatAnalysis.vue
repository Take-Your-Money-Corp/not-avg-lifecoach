<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand fluid href="#"
        >Not Your Average Life Coach</b-navbar-brand
      >
      <button @click="goToChatRoute" class="button-link">Chat</button>
    </b-navbar>
    <h2 class="text-dark">Chat Analysis</h2>
    <b-container fluid>
      <SentimentAnalysis v-show="showSentimentAnalysis" />
      <NamedEntityRecognition v-show="showNamedEntityRecognition" />
      <PartsOfSpeech v-show="showPartOfSpeech" />
    </b-container>
    <b-navbar
      toggleable="lg"
      type="dark"
      variant="info"
      fixed="bottom"
      class="center"
    >
      <b-navbar-nav class="mx-auto">
        <b-nav-item @click="toShowPartOfSpeech"
          >Part of Speech Tagging</b-nav-item
        >
        <b-nav-item @click="toShowSentimentAnalysis"
          >Sentiment Analysis</b-nav-item
        >
        <b-nav-item @click="toShowNamedEntityRecognition"
          >Named Entity Recognition</b-nav-item
        >
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
import SentimentAnalysis from "@/components/SentimentAnalysis.vue";
import NamedEntityRecognition from "../components/NamedEntityRecognition.vue";
import PartsOfSpeech from "../components/PartsOfSpeech.vue";

export default {
  data() {
    return {
      showSentimentAnalysis: true,
      showPartOfSpeech: false,
      showNamedEntityRecognition: false
    };
  },
  components: {
    SentimentAnalysis,
    PartsOfSpeech,
    NamedEntityRecognition
  },
  methods: {
    goToChatRoute() {
      this.$router.push("/");
    },
    toShowSentimentAnalysis() {
      this.showSentimentAnalysis = true;
      this.showPartOfSpeech = false;
      this.showNamedEntityRecognition = false;
    },
    toShowPartOfSpeech() {
      this.showSentimentAnalysis = false;
      this.showPartOfSpeech = true;
      this.showNamedEntityRecognition = false;
    },

    toShowNamedEntityRecognition() {
      this.showSentimentAnalysis = false;
      this.showPartOfSpeech = false;
      this.showNamedEntityRecognition = true;
    }
  }
};
</script>

<style></style>
