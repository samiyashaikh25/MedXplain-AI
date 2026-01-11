import { useState } from "react";
import ResultSummary from "./ResultSummary";
import "./FileUpload.css";

function FileUpload() {
  const [file, setFile] = useState(null);
  const [email, setEmail] = useState("");
  const [language, setLanguage] = useState("English");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);


   const handleAnalyze = async () => {
  if (!file) {
    alert("Please upload a medical report first.");
    return;
  }

  setLoading(true);

  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("language", language);
    formData.append("email", email);

    const response = await fetch("http://127.0.0.1:8000/analyze", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    console.log("BACKEND RESPONSE:", data);
    setResult(data);
  } catch (error) {
    alert("Backend error. Please try again.");
    console.error(error);
  } finally {
    setLoading(false);
  }
};



return (
  <div className="card">
    <label>Upload Medical Report</label>
    <input
      type="file"
      accept=".pdf,.jpg,.png"
      onChange={(e) => setFile(e.target.files[0])}
    />

    <label>Email Address</label>
    <input
      type="email"
      placeholder="example@gmail.com"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />

    <label>Preferred Language</label>
    <select value={language} onChange={(e) => setLanguage(e.target.value)}>
      <option>English</option>
      <option>Hindi</option>
      <option>Marathi</option>
    </select>

    <button onClick={handleAnalyze} disabled={loading}>
      {loading ? "Analyzing..." : "Analyze Report"}
    </button>

    {/* ✅ ONLY SHOW SUMMARY WHEN DATA EXISTS */}
    {result && <ResultSummary result={result} />}
  </div>
);

}

export default FileUpload;
