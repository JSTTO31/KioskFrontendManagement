import { defineComponent, h, PropType } from 'vue'

import { Bar } from 'vue-chartjs'

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  Plugin
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default defineComponent({
  name: 'BarChart',
  components: {
    Bar
  },
  props: {
    chartId: {
      type: String,
      default: 'bar-chart'
    },
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 400
    },
    cssClasses: {
      default: '',
      type: String
    },
    styles: {
      type: Object as PropType<Partial<CSSStyleDeclaration>>,
      default: () => {}
    },
    plugins: {
      type: Array as PropType<Plugin<'bar'>[]>,
      default: () => []
    },
    chartData: {
        type: Object,
        default: () => ({
            labels: [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
              ],
              datasets: [
                {
                  label: 'Data One',
                  backgroundColor: '#ff6f00',
                  data: [40, 20, 12, 39, 10, 40, 39, 80, 40]
                },
              ]
        })
    }
  },
  setup(props) {
    const chartData = props.chartData

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      border: false,
      plugins: {
        legend: {
          display: false
        },
      },
      scales: {
        x: {
           grid: {
              display: false
           }
        },
        y: {
           grid: {
              display: false
           }
        }
   }
    }

    return () =>
      h(Bar, {
        chartData,
        chartOptions,
        chartId: props.chartId,
        width: props.width,
        height: props.height,
        cssClasses: props.cssClasses,
        styles: props.styles,
        plugins: props.plugins
      })
  }
})
