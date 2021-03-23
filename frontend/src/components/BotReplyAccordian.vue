<template>
  <div class="accordion" role="tablist">
    <div v-for="(message, index) in conversation" :key="message.id">
      <b-card v-if="index % 2 === 1" class="mb-1">
        User said: {{ message.text }}
      </b-card>
      <b-card v-if="index % 2 === 1" no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button
            @click="loadGraph(repliesAndSentimentAnalyses[index])"
            block
            v-b-toggle="'accordion-' + index"
            variant="info"
            >Bot replied: {{ repliesAndSentimentAnalyses[index].text }}
          </b-button>
        </b-card-header>
        <b-collapse
          :id="'accordion-' + index"
          accordion="my-accordion"
          role="tabpanel"
        >
          <b-card-body>
            <b-card-text> </b-card-text>
            <SentimentAnalalysisGraph
              :intentNames="intentNames"
              :intentScores="intentScores"
            />
          </b-card-body>
        </b-collapse>
      </b-card>
    </div>
  </div>
</template>

<script>
import SentimentAnalalysisGraph from "./SentimentAnalalysisGraph.vue";

export default {
  components: { SentimentAnalalysisGraph },
  props: {
    repliesAndSentimentAnalyses: {
      type: Array
    },
    conversation: {
      type: Array
    }
  },
  data() {
    return {
      intentNames: [],
      intentScores: []
    };
  },
  mounted() {},
  methods: {
    loadGraph(replyAndSentimentAnalysis) {
      const classifications = [
        ...replyAndSentimentAnalysis.nlp.classifications
      ];

      console.log(this.intentNames);
      classifications.forEach((intent, idx) => {
        if (idx < 6) {
          this.intentNames.push(intent.intent);
          this.intentScores.push(intent.score);
        }
      });
    }
  }
};
</script>
