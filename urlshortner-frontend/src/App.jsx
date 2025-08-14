import React, { useState } from "react";
import "./App.css";

function App() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setShortUrl("");
    try {
      const response = await fetch(
        "https://shortlyurt.vercel.app/api/url/shorten",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ originalUrl }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setShortUrl(data.shortUrl);
      } else {
        setError(data.message || "Something went wrong");
      }
    } catch (err) {
      setError("Server error");
    }
  };

  return (
    <div className="container">
      <h1>URL Shortener</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="url"
          placeholder="Enter your URL"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          required
        />
        <button type="submit">Shorten</button>
      </form>
      {shortUrl && (
        <div className="result">
          Short URL:{" "}
          <a href={shortUrl} target="_blank" rel="noopener noreferrer">
            {shortUrl}
          </a>
        </div>
      )}
      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default App;
