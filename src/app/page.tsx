"use client";
import { useState } from "react";

export default function Home() {
  const [transcript, setTranscript] = useState("");
  const [prompt, setPrompt] = useState("");
  const [summary, setSummary] = useState("");
  const [emails, setEmails] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailSending, setEmailSending] = useState(false);


  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      setTranscript(text);
    };
    reader.readAsText(file);
  };

  const handleSummarize = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transcript, prompt }),
      });
      const data = await res.json();
      setSummary(data.summary);
    } catch (err) {
      alert("Error generating summary. Please try again.");
    } finally {
      setLoading(false);
    }
  };

const handleSendEmail = async () => {
  setEmailSending(true);
  try {
    await fetch("/api/sendEmail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ summary, emails }),
    });
    alert("✅ Summary sent!");
  } catch (err) {
    alert("Error sending email.");
  } finally {
    setEmailSending(false);
  }
};


  return (
    <div className="p-6 space-y-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold">AI Meeting Notes Summarizer</h1>

      <input type="file" accept=".txt" onChange={handleFileUpload} />

      <textarea
        placeholder="Paste or upload meeting transcript..."
        value={transcript}
        onChange={(e) => setTranscript(e.target.value)}
        className="w-full border p-2 h-32"
      />

      <input
        type="text"
        placeholder="Enter custom prompt (e.g. 'Highlight action items')"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="w-full border p-2"
      />

      <button
        onClick={handleSummarize}
        disabled={loading}
        className={`px-4 py-2 rounded text-white ${
          loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {loading ? "Generating..." : "Generate Summary"}
      </button>

      {summary && (
        <>
          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            className="w-full border p-2 h-32"
          />

          <input
            type="text"
            placeholder="Enter recipient emails"
            value={emails}
            onChange={(e) => setEmails(e.target.value)}
            className="w-full border p-2"
          />

          <button
            onClick={handleSendEmail}
            disabled={emailSending}
            className={`px-4 py-2 rounded text-white ${
              emailSending ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {emailSending ? "Sending..." : "Send via Email"}
          </button>
        </>
      )}
    </div>
  );
}
