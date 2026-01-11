// src/components/PdfReport.js
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 30 },
  section: { marginBottom: 10, fontSize: 12 }
});

function PdfReport({ result }) {
  const MyDoc = (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={{ fontSize: 16, marginBottom: 10 }}>Health Report Summary</Text>

        <View style={styles.section}>
          <Text>Summary:</Text>
          <Text>{result.simpleSummary}</Text>
        </View>

        <View style={styles.section}>
          <Text>Translated Summary:</Text>
          <Text>{result.translatedSummary}</Text>
        </View>

        <View style={styles.section}>
          <Text>Values:</Text>
          {result.values.map((v, i) => (
            <Text key={i}>{v.test}: {v.value} (Safe: {v.range}) - {v.status}</Text>
          ))}
        </View>

        <View style={styles.section}>
          <Text>Do:</Text>
          {result.do.map((d, i) => <Text key={i}>- {d}</Text>)}
        </View>

        <View style={styles.section}>
          <Text>Don't:</Text>
          {result.dont.map((d, i) => <Text key={i}>- {d}</Text>)}
        </View>
      </Page>
    </Document>
  );

  return (
    <div style={{ marginTop: "20px" }}>
      <PDFDownloadLink document={MyDoc} fileName="Health_Report.pdf">
        {({ loading }) => (loading ? "Preparing PDF..." : "📄 Download Report")}
      </PDFDownloadLink>
    </div>
  );
}

export default PdfReport;
