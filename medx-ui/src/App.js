import FileUpload from "./components/FileUpload";
import "./App.css";

function App() {
  return (
    <div className="app">
      <h1 className="title">MedXplain AI</h1>
      <p className="subtitle">
        Understand your medical reports in simple language
      </p>

      <FileUpload />
    </div>
  );
}

export default App;
