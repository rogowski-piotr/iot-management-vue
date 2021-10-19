<script>
import { measurementService } from '../services';
import { defineComponent } from 'vue'
import { Line } from 'vue3-chart-v2'


export default defineComponent({
    name: 'ChartSensor',
    extends: Line,
    props: {
        info: Object,
        /* info: {
            sensorId: String,
            type: String,
        } */
    },
    data () {
        return {
            data: [],
        }
    },
    mounted () {
        measurementService.getLastMeasurements(this.info.sensorId)
            .then(response => {
                this.data = response;
                console.log(this.data)

                let labels = new Array;
                this.data.forEach(measurement => {
                    if (! labels.includes(measurement.date)) {
                        labels.push(measurement.date)
                    }
                });
                labels.reverse();

                let datasets = this.generateDatasets(response)

                let dataset_index = null
                for (let i = 0; i < datasets.length; i++) {
                    if (datasets[i].label === this.info.type) {
                        dataset_index = i;
                    }
                }
                
                this.renderChart({
                    labels: labels,
                    datasets: [datasets[dataset_index]]
                })
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