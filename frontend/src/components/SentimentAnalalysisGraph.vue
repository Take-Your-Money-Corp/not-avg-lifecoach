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
    this.renderChart(this.chartData, this.chartOptions);
  }
};
</script>
