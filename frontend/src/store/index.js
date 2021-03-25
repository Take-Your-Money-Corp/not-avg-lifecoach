import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    allConvoData: undefined,
    conversation: undefined,
    currentChatAnalysisComponent: {
      sentimentAnalysis: true,
      partOfSpeech: false,
      namedEntityRecognition: false
    }
  },
  mutations: {
    setAllConvoData(state, data) {
      state.allConvoData = data;
    },
    setConversation(state, conversation) {
      state.conversation = conversation;
    },
    setCurrentChatAnalysisComponentBools(state, showComponents) {
      state.currentChatAnalysisComponent = showComponents;
    }
  }
});
