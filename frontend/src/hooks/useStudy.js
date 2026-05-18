import { useState } from "react";
import { studyAPI } from "../services/api";

export default function useStudy() {
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const summarize = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await studyAPI.summarize(text, title);

      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    text,
    setText,
    title,
    setTitle,
    result,
    loading,
    error,
    summarize,
  };
}