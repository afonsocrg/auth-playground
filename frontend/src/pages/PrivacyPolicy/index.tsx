import "./styles.css";
import { useState, useEffect } from "react";
import MyMarkdown from "@components/Markdown";

export default function Home() {
  const [markdown, setMarkdown] = useState(null);
  useEffect(() => {
    import("@data/privacy_policy.md").then((res) => {
      fetch(res.default)
        .then((response) => response.text())
        .then((text) => setMarkdown(text))
        .catch((error) => console.error(error));
    });
  }, []);
  return <MyMarkdown markdown={markdown} />;
}
