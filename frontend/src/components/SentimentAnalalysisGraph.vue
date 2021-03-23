<script>
import { Bar } from "vue-chartjs";

export default {
  props: {
    intentNames: {
      type: Array
    },
    intentScores: {
      type: Array
    }
  },
  extends: Bar,
  mounted() {
    this.renderChart({
      labels: this.intentNames,
      datasets: [
        {
          label: "Top 6 Intent Scores",
          backgroundColor: "#f87979",
          data: this.intentScores
        }
      ]
    });
  }
};
</script>

<style></style>
