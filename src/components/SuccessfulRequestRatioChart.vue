<script>
import { statsService } from '../services';
import { defineComponent } from 'vue'
import { Pie } from 'vue3-chart-v2'


export default defineComponent({
    name: 'SuccessfulRequestRatioChart',
    extends: Pie,
    data () {
        return {
            data: [],
        }
    },
    mounted () {
        statsService.getAllStats()
            .then(response => {
                this.renderChart(
                {
                    labels: ["successes", "failures"],
                    datasets: [
                    {
                        backgroundColor: ["#66cc99", "#ff8080"],
                        data: [response['successes'], response['failures']]
                    }
                    ]
                },
                { responsive: true, maintainAspectRatio: false }
                );
        });
  },
  methods: {
    generateDatasets(data) {
        const COLOURS = {
            'TEMPERATURE': '#f87979',
            'HUMIDITY': '#33CEFF',
            'SOIL_MOISTURE': '#39C688',
            'default': '#8B8B8B'
        };

        let typeLabels = [];
        data.forEach(measurement => {
            if (! typeLabels.includes(measurement.measurementType)) {
                typeLabels.push(measurement.measurementType)
            }
        });

        let datasets = []
        for (let i = 0; i < typeLabels.length; i++) {
            let type = typeLabels[i]
            let colour = type in COLOURS ? COLOURS[type] : COLOURS['default'];
            datasets[i] = {
                label: type,
                data: [],
                backgroundColor: colour
            }

            let reversedData = new Array;
            data.forEach(measurement => {
                if (type === measurement.measurementType) {
                    reversedData.push(measurement.value)
                }
            });
            
            datasets[i].data = reversedData.reverse();
        }
        return datasets;
    }
  }
})
</script>

<style scoped>
</style>