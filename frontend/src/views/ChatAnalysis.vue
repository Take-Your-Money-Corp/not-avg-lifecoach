<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand fluid href="#"
        >Not Your Average Life Coach</b-navbar-brand
      >
      <button @click="goToChatRoute" class="button-link">Chat</button>
    </b-navbar>
    <b-container fixed fluid>
      <h1 class="text-dark">Chat Analysis</h1>
      <SentimentAnalysis v-show="showComponent.sentimentAnalysis" />
      <NamedEntityRecognition v-show="showComponent.namedEntityRecognition" />
      <PartsOfSpeech v-show="showComponent.partOfSpeech" />
      <b-row class="py-5 my-5"
        ><hr />
        <hr />
      </b-row>
    </b-container>
    <b-navbar
      toggleable="lg"
      type="dark"
      fixed="bottom"
      variant="info"
      class="center"
    >
      <b-navbar-nav class="mx-auto">
        <b-nav-item @click="showPartOfSpeech"
          >Part of Speech Tagging</b-nav-item
        >
        <b-nav-item @click="showSentimentAnalysis"
          >Sentiment Analysis</b-nav-item
        >
        <b-nav-item @click="showNamedEntityRecognition"
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
      showComponent: {
        sentimentAnalysis: true,
        partOfSpeech: false,
        namedEntityRecognition: false
      }
    };
  },
  created() {
    this.showComponent = this.$store.state.currentChatAnalysisComponent;
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
    showSentimentAnalysis() {
      this.$store.commit("setConversation", this.conversation);
      this.$store.commit("setCurrentChatAnalysisComponentBools", {
        sentimentAnalysis: true,
        partOfSpeech: false,
        namedEntityRecognition: false
      });
      this.updateComponent();
    },
    showPartOfSpeech() {
      this.$store.commit("setConversation", this.conversation);
      this.$store.commit("setCurrentChatAnalysisComponentBools", {
        sentimentAnalysis: false,
        partOfSpeech: true,
        namedEntityRecognition: false
      });
      this.updateComponent();
    },

    showNamedEntityRecognition() {
      this.$store.commit("setConversation", this.conversation);
      this.$store.commit("setCurrentChatAnalysisComponentBools", {
        sentimentAnalysis: false,
        partOfSpeech: false,
        namedEntityRecognition: true
      });
      this.updateComponent();
    },
    updateComponent() {
      this.showComponent = this.$store.state.currentChatAnalysisComponent;
    }
  }
};
</script>

<style></style>
