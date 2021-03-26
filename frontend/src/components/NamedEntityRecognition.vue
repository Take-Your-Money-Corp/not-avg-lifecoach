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
  },
  methods: {
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
        { text: 'Danielle', entityType: 'name', tag: 'name' },
        { text: 'Matt', entityType: 'name', tag: 'name' },
        { text: 'James', entityType: 'name', tag: 'name' },
        { text: 'John', entityType: 'name', tag: 'name' },
        { text: 'Robert', entityType: 'name', tag: 'name' },
        { text: 'Michael', entityType: 'name', tag: 'name' },
        { text: 'William', entityType: 'name', tag: 'name' },
        { text: 'David', entityType: 'name', tag: 'name' },
        { text: 'Olivia', entityType: 'name', tag: 'name' },
        { text: 'Ava', entityType: 'name', tag: 'name' },
        { text: 'Sophia', entityType: 'name', tag: 'name' },
        { text: 'Isabella', entityType: 'name', tag: 'name' },
        { text: 'Maria', entityType: 'name', tag: 'name' },
        { text: 'Nushi', entityType: 'name', tag: 'name' },
        { text: 'Mohammed', entityType: 'name', tag: 'name' },
        { text: 'Jose', entityType: 'name', tag: 'name' },
        { text: 'Muhammad', entityType: 'name', tag: 'name' },
        { text: 'Mohamed', entityType: 'name', tag: 'name' },
        { text: 'Wei', entityType: 'name', tag: 'name' },
        { text: 'Mohammad', entityType: 'name', tag: 'name' },
        { text: 'Ahmed', entityType: 'name', tag: 'name' },
        { text: 'Guy', entityType: 'guy', tag: 'guy' },
        { text: 'Devon', entityType: 'chad', tag: 'chad' },
        //countries
        { text: 'canada',entityType: 'country', tag: 'country' },
        { text: 'united states',entityType: 'country', tag: 'country' },
        { text: 'spain',entityType: 'country', tag: 'country' },
        { text: 'france',entityType: 'country', tag: 'country' },
        { text: 'india',entityType: 'country', tag: 'country' },
        { text: 'mexico',entityType: 'country', tag: 'country' },
        { text: 'greece',entityType: 'country', tag: 'country' },
        { text: 'australia',entityType: 'country', tag: 'country' },
        { text: 'japan',entityType: 'country', tag: 'country' },
        { text: 'china',entityType: 'country', tag: 'country' },
        //cities
        { text: 'kelowna',entityType: 'city', tag: 'city' },
        { text: 'vernon', entityType: 'city', tag: 'city' },
        { text: 'vancouver', entityType: 'city', tag: 'city' },
        { text: 'new york', entityType: 'city', tag: 'city' },
        { text: 'toronto', entityType: 'city', tag: 'city' },
        { text: 'regina', entityType: 'city', tag: 'city' },
        { text: 'winnipeg', entityType: 'city', tag: 'city' },
        { text: 'sydney', entityType: 'city', tag: 'city' },
        { text: 'albury', entityType: 'city', tag: 'city' },
        { text: 'brisbane', entityType: 'city', tag: 'city' },
        { text: 'atlanta', entityType: 'city', tag: 'city' },
        { text: 'denver', entityType: 'city', tag: 'city' },
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
          // put result for each string at conversation[i].namedEntities
          this.conversation[i].namedEntities = tokens;
        }
      }
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
