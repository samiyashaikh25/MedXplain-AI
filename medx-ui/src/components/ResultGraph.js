import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

function ResultGraph({ values }) {
  if (!values || values.length === 0) {
    return <p>No graph data available.</p>;
  }

  const labels = values.map((item) => item.test);

  const actualValues = values.map((item) =>
    parseFloat(item.value)
  );

  const maxSafeValues = values.map((item) =>
    parseFloat(item.range.split("–")[1])
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Your Value",
        data: actualValues,
        backgroundColor: "rgba(239, 68, 68, 0.6)",
      },
      {
        label: "Max Safe Value",
        data: maxSafeValues,
        backgroundColor: "rgba(34, 197, 94, 0.6)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "10px",
      }}
    >
      <h3 style={{ marginBottom: "10px" }}>
        📊 Health Report Comparison
      </h3>
      <Bar data={data} options={options} />
    </div>
  );
}

export default ResultGraph;
