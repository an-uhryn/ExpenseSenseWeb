import { PieChart } from '@mui/x-charts/PieChart'
import { IChartDatasetItem } from '../common/interfaces'

interface Props {
  chartData: IChartDatasetItem[]
}

const StyledPieChart = ({ chartData }: Props) => {
  return (
    <PieChart
      series={[
        {
          data: chartData,
          highlightScope: { faded: 'global', highlighted: 'item' },
          faded: { innerRadius: 10, additionalRadius: -10, color: 'gray' },
        },
      ]}
      width={600}
      height={250}
    />
  )
}

export default StyledPieChart
