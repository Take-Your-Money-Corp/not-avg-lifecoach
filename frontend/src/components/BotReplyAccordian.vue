<template>
  <div
    v-if="loaded && conversation && chartData.length > 0"
    class="accordion"
    role="tablist"
  >
    <div v-for="(message, index) in conversation" :key="message.id">
      <b-card v-if="index % 2 === 0" class="mb-1">
        User said: {{ message.text }}
      </b-card>
      <b-card v-if="index % 2 === 1" no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block v-b-toggle="'accordion-' + index" variant="info">
            Bot replied: {{ repliesAndSentimentAnalyses[index].text }}
          </b-button>
        </b-card-header>
        <b-collapse
          :id="'accordion-' + index"
          accordion="my-accordion"
          role="tabpanel"
        >
          <b-card-body>
            <b-card-text>
              <SentimentAnalalysisGraph
                :chartData="chartData[Math.floor(index / 2)]"
                :height="300"
              />
            </b-card-text>
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
      intentScores: [],
      chartData: [],
      once: true,
      loaded: false
    };
  },
  mounted() {
    new Promise(resolve => {
      this.repliesAndSentimentAnalyses.forEach(
        (replyAndSentimentAnalysis, idx, array) => {
          if (idx % 2 === 1) {
            this.loadGraph(replyAndSentimentAnalysis);
          }
          if (idx === array.length - 1) {
            resolve();
          }
        }
      );
    }).then(() => {
      this.loaded = true;
    });
  },
  methods: {
    loadGraph(replyAndSentimentAnalysis) {
      this.intentScores = [];
      this.intentNames = [];

      const classifications = [
        ...replyAndSentimentAnalysis.nlp.classifications
      ];
      classifications.some(classification => {
        let score = parseFloat(classification.score.toFixed(2));
        console.log(classification.intent);
        console.log(score);
        if (score <= 0.01) {
          if (score !== 0) {
            this.intentNames.push(classification.intent);
            this.intentScores.push(score);
          }
          this.chartData.push({
            labels: this.intentNames,
            datasets: [
              {
                label: "Top Intent Scores",
                backgroundColor: "#f87979",
                data: this.intentScores
              }
            ]
          });
          return true;
        } else if (score !== 0) {
          this.intentNames.push(classification.intent);
          this.intentScores.push(score);
        }
      });
    }
  }
};
</script>

<style>
canvas#bar-chart {
  display: flex;
  margin: auto;
}

@media (max-width: 600px) {
  canvas#bar-chart {
    width: 100% !important;
  }
}
</style>
