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
                <table style="margin: 0.5em;">
                  <tr>
                    <th>Type</th>
                    <th>Value</th>
                  </tr>
                  <tr style="color: rgb(116, 0, 170);" v-for="entity in message.namedEntities" :key="entity.index"><td align="left" style="padding: 0.1em;">{{entity.tag}}</td><td align="left" style="padding: 0.1em;">"{{entity.value}}"</td></tr>
                </table>
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
      this.WINKNER();
      //this.STANFORDNER();
  },
  methods: {
    STANFORDNER() {
      if(this.conversation != null){
        for(var i = 0; i < this.conversation.length; i++)
        {
          this.conversation[i].namedEntities = "test";
        }
      }else{console.log("Conversation is empty or undefined!")}
    },
    WINKNER() {
      // Load wink ner.
      var ner = require( 'wink-ner' );
      // Create your instance of wink ner & use default config.
      var myNER = ner();
      // Define training data.
      var trainingData = [
        //names
        { text: 'Danielle', entityType: 'name' },
        { text: 'Matt', entityType: 'name' },
        { text: 'James', entityType: 'name' },
        { text: 'John', entityType: 'name' },
        { text: 'Robert', entityType: 'name' },
        { text: 'Michael', entityType: 'name' },
        { text: 'William', entityType: 'name' },
        { text: 'David', entityType: 'name' },
        { text: 'Olivia', entityType: 'name' },
        { text: 'Ava', entityType: 'name' },
        { text: 'Sophia', entityType: 'name' },
        { text: 'Isabella', entityType: 'name' },
        //countries
        { text: 'canada', entityType: 'country' },
        { text: 'united states', entityType: 'country' },
        { text: 'spain', entityType: 'country' },
        { text: 'france', entityType: 'country' },
        { text: 'india', entityType: 'country' },
        { text: 'mexico', entityType: 'country' },
        { text: 'greece', entityType: 'country' },
        { text: 'australia', entityType: 'country' },
        { text: 'japan', entityType: 'country' },
        { text: 'china', entityType: 'country' },
        //cities
        { text: 'kelowna', entityType: 'city' },
        { text: 'vernon', entityType: 'city' },
        { text: 'vancouver', entityType: 'city' },
        { text: 'new york', entityType: 'city' },
        { text: 'toronto', entityType: 'city' },
        { text: 'regina', entityType: 'city' },
        { text: 'winnipeg', entityType: 'city' },
        { text: 'sydney', entityType: 'city' },
        { text: 'albury', entityType: 'city' },
        { text: 'brisbane', entityType: 'city' },
        { text: 'atlanta', entityType: 'city' },
        { text: 'denver', entityType: 'city' },
      ];
      // Learn from the training data.
      myNER.learn( trainingData );
      // Since recognize() requires tokens, use wink-tokenizer.
      var winkTokenizer = require( 'wink-tokenizer' );
      // Instantiate it and extract tokenize() api.
      var tokenize = winkTokenizer().tokenize;

      if(this.conversation != null){
        for(var i = 0; i < this.conversation.length; i++)
        {
          // Tokenize the sentence
          var tokens = tokenize(this.conversation[i].text);
          // Detect entities
          tokens = myNER.recognize(tokens);
          console.log(i + ": ");console.log(tokens);
          // put result for each string at conversation[i].namedEntities
          this.conversation[i].namedEntities = tokens;
        }
      }else{console.log("Conversation is empty or undefined!")}
    }
  }
};
</script>

<style>
h4 {
  color: rgb(116, 0, 170);
  font-weight: 600;
}
tr:nth-child(even) {background-color: #f7f7f7;}
tr:hover {background-color: rgb(234, 225, 238);}
</style>
