<script>
import { Bar, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

export default {
  extends: Bar,
  mixins: [reactiveProp],
  props: {
    chartData: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      chartOptions: {
        responsive: false,
        maintainAspectRatio: true
      }
    };
  },
  mounted() {
    if (this.chartData) this.renderChart(this.chartData, this.chartOptions);
    else {
      this.renderChart(
        {
          labels: ["Unknown Intent"],
          datasets: [
            {
              label: "Unknown Intent",
              backgroundColor: "lightgray",
              data: [1]
            }
          ]
        },
        this.chartOptions
      );
    }
  }
};
</script>
