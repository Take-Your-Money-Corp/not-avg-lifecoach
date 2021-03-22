<template>
  <div>
    <h3>
      Named Entity Recognition
    </h3>

    <div v-if="conversation">
        <b-list-group>
            <div v-for="message in conversation" :key="message.index">

              <b-list-group-item>
                <h4 align="left">{{ message.chatStyle }} said: </h4>
                <p align="left">{{ message.text }}</p>
                <div align="left" style="font-weight: 600;">Named Entities:</div>
                <div align="left" style="color: rgb(116, 0, 170);">{{message.namedEntities}}</div>
              </b-list-group-item>
              
            </div>
        </b-list-group>
    </div>

    <div v-else>
      Please chat with the bot before attempting to inspect messages
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      conversation: undefined,
    };
  },
  created() {
    if (this.$store.state.responseScore)
      this.conversation = this.$store.state.conversation;
      this.NER();
  },
  methods: {
    NER() {
      for(var i = 0; i < this.conversation.length; i++)
      {
        this.conversation[i].namedEntities = i;
        // perform ner on text
        // put result for each string at conversation[i].namedEntities
        // Format: [type0, name0, type0, name0, ... , typen, namen]
      }
    }
  }
};
</script>

<style>
h4 {
  color: rgb(116, 0, 170);
  font-weight: 600;
}
</style>
