import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";
import moment from "moment";
import { AreaGraphic } from "redux/getGraphics/types";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

type LineCharProps = {
  array: AreaGraphic;
};

const LineChart: React.FC<LineCharProps> = ({ array }) => {
  const options = {
    responsive: true,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
    animations: {
      tension: {
        duration: 8000,
        easing: "linear",
        from: 1,
        to: 0,
        loop: true,
      },
    },
  };

  const data = {
    labels: array[0].values.prices.map((item: number[]) => moment(item[0]).format("DD.MM.YY")),
    datasets: [
      {
        label: array[0].name,
        data: array[0].values.prices.map((item: number[]): number => {
          return item[1] as number;
        }),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: array[1].name,
        data: array[1].values.prices.map((item: number[]): number => {
          return item[1] as number;
        }),
        borderColor: "rgb(0, 154, 255)",
        backgroundColor: "rgba(0, 154, 255, 0.5)",
      },
    ],
  };
  // @ts-ignore
  return <Line options={options} data={data} />;
};

export default LineChart;
