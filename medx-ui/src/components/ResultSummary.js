import { useState } from "react";
import ResultGraph from "./ResultGraph";
import PdfReport from "./PdfReport";
import "./ResultSummary.css";

function ResultSummary({ result }) {
  const [activeTab, setActiveTab] = useState("summary");
  const [showDo, setShowDo] = useState(true);
  const [showDont, setShowDont] = useState(true);

  if (!result) return null;

  const tabs = [
    { key: "summary", label: "SUMMARY" },
    { key: "graph", label: "GRAPH" },
    { key: "do", label: "DO" },
    { key: "dont", label: "DON'T" },
    { key: "consequences", label: "CONSEQUENCES" },
    { key: "pdf", label: "PDF" },
  ];

  return (
    <div
      style={{
        maxWidth: "1100px",
        margin: "20px auto",
        background: "#f9fafb",
        borderRadius: "14px",
        padding: "20px",
        boxShadow: "0 4px 10px rgba(129, 25, 25, 0.08)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* TAB BUTTONS */}
      <div
        style={{
          display: "flex",
          gap: "12px",
          marginBottom: "25px",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        {tabs.map((tab) => (
         <button
  key={tab.key}
  onClick={() => setActiveTab(tab.key)}
  style={{
    flex: "1 1 140px",
    padding: "12px 16px",
    borderRadius: "10px",
    border: "2px solid #4f46e5",
    backgroundColor:
      activeTab === tab.key ? "#e0e7ff" : "#ffffff",
    boxShadow:
      activeTab === tab.key
        ? "0 0 0 2px #4f46e5"
        : "none",
    cursor: "pointer",
    fontWeight: "bold",
    color: "#1e1b4b",
  }}
>
  {tab.label}
</button>

        ))}
      </div>

      {/* TAB CONTENT */}
      <div style={{ minHeight: "300px" }}>
        {/* SUMMARY */}
        {activeTab === "summary" && (
          <>
            <div
              style={{
                background: "#fff7ed",
                padding: "20px",
                borderRadius: "12px",
                marginBottom: "20px",
                fontSize: "18px",
              }}
            >
              <h2>⚠️ Health Status</h2>
              <p>
                Your report shows <strong>abnormal values</strong>. Please
                review the explanation below.
              </p>
            </div>

            <h3>📄 Simple Explanation</h3>
            <p
              style={{
                background: "#eef2ff",
                padding: "15px",
                borderRadius: "10px",
                fontSize: "16px",
              }}
            >
              {result.simpleSummary}
            </p>

            <h3 style={{ marginTop: "15px" }}>🌍 Local Language</h3>
            <p
              style={{
                background: "#ecfdf5",
                padding: "15px",
                borderRadius: "10px",
                fontSize: "16px",
              }}
            >
              {result.translatedSummary}
            </p>

            <h3 style={{ marginTop: "20px" }}>📊 Important Values</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
              {result.values.map((item, index) => {
                const valueNum = parseFloat(item.value);
                const [minSafe, maxSafe] = item.range
                  .split("–")
                  .map(Number);

                let bg = "#dcfce7";
                if (valueNum > maxSafe) bg = "#fee2e2";
                else if (valueNum < minSafe) bg = "#fef9c3";

                return (
                  <div
                    key={index}
                    style={{
                      flex: "1 1 45%",
                      background: bg,
                      padding: "15px",
                      borderRadius: "10px",
                      border: "1px solid #ddd",
                    }}
                  >
                    <p><strong>Test:</strong> {item.test}</p>
                    <p><strong>Your Value:</strong> {item.value}</p>
                    <p><strong>Safe Range:</strong> {item.range}</p>
                    <p>
                      <strong>Status:</strong>{" "}
                      {item.status === "High" ? "🔴 High" : "🟢 Normal"}
                    </p>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* GRAPH */}
      {activeTab === "graph" && (
  <div style={{ paddingTop: "20px" }}>
    <ResultGraph values={result.values} />
  </div>
)}


        {/* DO */}
        {activeTab === "do" && (
          <div>
            <h3
              style={{ color: "green", cursor: "pointer" }}
              onClick={() => setShowDo(!showDo)}
            >
              ✅ What You SHOULD Do {showDo ? "▲" : "▼"}
            </h3>
            {showDo && (
              <ul>
                {result.do.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* DON'T */}
        {activeTab === "dont" && (
          <div>
            <h3
              style={{ color: "red", cursor: "pointer" }}
              onClick={() => setShowDont(!showDont)}
            >
              ❌ What You SHOULD NOT Do {showDont ? "▲" : "▼"}
            </h3>
            {showDont && (
              <ul>
                {result.dont.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* CONSEQUENCES */}
        {activeTab === "consequences" && (
          <div>
            <h3 style={{ color: "#b91c1c" }}>⚠️ Possible Risks</h3>
            <p
              style={{
                background: "#fee2e2",
                padding: "15px",
                borderRadius: "10px",
              }}
            >
              Ignoring abnormal values can lead to serious long-term health
              problems affecting the heart, kidneys, eyes, and nerves.
            </p>
          </div>
        )}

        {/* PDF */}
        {activeTab === "pdf" && (
          <div>
            <PdfReport result={result} />
          </div>
        )}
      </div>
    </div>
  );
}

export default ResultSummary;
