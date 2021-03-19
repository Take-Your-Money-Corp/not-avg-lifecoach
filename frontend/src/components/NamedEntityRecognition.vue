<template>
  <div>
    <h3>
      Named Entity Recognition
    </h3>

    <div v-if="conversation">
        <b-list-group>
            <div v-for="message in conversation" :key="message.index">
              <b-list-group-item><h4 align="left">{{ message.chatStyle }} said: </h4><p align="left">{{ message.text }}</p></b-list-group-item>
            </div>
        </b-list-group>
    </div>

    <div v-else>
      Please interact with the chatbot to see messages.
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      conversation: undefined
    };
  },
  created() {
    if (this.$store.state.responseScore)
      this.conversation = this.$store.state.conversation;
  }
};
</script>

<style></style>
