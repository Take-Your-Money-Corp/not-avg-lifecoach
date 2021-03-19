import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    responseScore: undefined,
    conversation: undefined,
    currentChatAnalysisComponent: {
      sentimentAnalysis: true,
      partOfSpeech: false,
      namedEntityRecognition: false
    }
  },
  mutations: {
    setResponseScores(state, response) {
      state.responseScore = response;
    },
    setConversation(state, conversation) {
      state.conversation = conversation;
    },
    setCurrentChatAnalysisComponentBools(state, showComponents) {
      state.currentChatAnalysisComponent = showComponents;
    }
  }
});
