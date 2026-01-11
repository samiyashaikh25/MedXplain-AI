import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function HealthGraph({ values }) {
  if (!values || values.length === 0) return null;

  const data = {
    labels: values.map(v => v.test),
    datasets: [
      {
        label: "Measured Value",
        data: values.map(v => parseFloat(v.value)),
      },
    ],
  };

  return (
    <div style={{ maxWidth: "700px", margin: "auto" }}>
      <h3>Health Overview</h3>
      <Bar data={data} />
    </div>
  );
}

export default HealthGraph;
