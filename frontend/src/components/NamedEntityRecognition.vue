<template>
  <div>
    <h3>
      Named Entity Recognition
    </h3>

    <div v-if="conversation">
        <b-list-group>
            <div v-for="message in conversation" :key="message.index">

              <b-list-group-item>
                <h5 align="left">{{ message.chatStyle }}</h5>
                <p align="left" style="font-size: 150%;">{{ message.text }}</p>
                <div align="left" style="font-weight: 600;">Named Entities:</div>
                <table style="width: 100%; margin-top: 1em;">
                  <tr>
                    <th style="width:50%; text-align:left; background-color: rgb(236, 220, 255);">Value</th>
                    <th style="width:50%; text-align:left; background-color: rgb(236, 220, 255);">Type</th>
                  </tr>
                  <tr style="color: rgb(116, 0, 170);" v-for="entity in message.namedEntities" :key="entity.index"><td align="left" style="padding: 0.1em;">"{{entity.value}}"</td><td align="left" style="padding: 0.1em;">{{entity.tag}}</td></tr>
                </table>
              </b-list-group-item>
              
            </div>
        </b-list-group>
    </div>

    <div v-else>
      Please chat.
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
    if (this.$store.state.conversation)
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
      // Since recognize() requires tokens, use wink-tokenizer.
      var winkTokenizer = require( 'wink-tokenizer' );
      // Create your instance of wink ner & use default config.
      var myNER = ner();
      // Define training data.
      var trainingData = [
        //names
        { text: 'Danielle', tag: 'name' },
        { text: 'Matt', tag: 'name' },
        { text: 'James', tag: 'name' },
        { text: 'John', tag: 'name' },
        { text: 'Robert', tag: 'name' },
        { text: 'Michael', tag: 'name' },
        { text: 'William', tag: 'name' },
        { text: 'David', tag: 'name' },
        { text: 'Olivia', tag: 'name' },
        { text: 'Ava', tag: 'name' },
        { text: 'Sophia', tag: 'name' },
        { text: 'Isabella', tag: 'name' },
        { text: 'Devon', tag: 'name' },
        //countries
        { text: 'canada', tag: 'country' },
        { text: 'united states', tag: 'country' },
        { text: 'spain', tag: 'country' },
        { text: 'france', tag: 'country' },
        { text: 'india', tag: 'country' },
        { text: 'mexico', tag: 'country' },
        { text: 'greece', tag: 'country' },
        { text: 'australia', tag: 'country' },
        { text: 'japan', tag: 'country' },
        { text: 'china', tag: 'country' },
        //cities
        { text: 'kelowna', tag: 'city' },
        { text: 'vernon', tag: 'city' },
        { text: 'vancouver', tag: 'city' },
        { text: 'new york', tag: 'city' },
        { text: 'toronto', tag: 'city' },
        { text: 'regina', tag: 'city' },
        { text: 'winnipeg', tag: 'city' },
        { text: 'sydney', tag: 'city' },
        { text: 'albury', tag: 'city' },
        { text: 'brisbane', tag: 'city' },
        { text: 'atlanta', tag: 'city' },
        { text: 'denver', tag: 'city' },
      ];
      // Learn from the training data.
      myNER.learn( trainingData );
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
h5 {
  color: rgb(116, 0, 170);
  font-weight: 600;
}
tr:nth-child(even) {background-color: #f7f7f7;}
tr:hover {background-color: rgb(234, 225, 238);}
</style>
