import "./styles.css";
import { useState, useEffect } from "react";
import { Typography, List } from "antd";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

const { Title, Text } = Typography;

const renderers = {
  heading: function Heading(props) {
    return <Title level={props.level}>{props.children}</Title>;
  },
  list: function MakeList(props) {
    return <List bordered>{props.children}</List>;
  },
  listItem: function MakeListItem(props) {
    return <List.Item>{props.children}</List.Item>;
  },
  inlineCode: function makeInlineCode(props) {
    return <Text code>{props.children}</Text>;
  },
  // code: function makeCodeBlock(props) {
  //     return <SyntaxHighlighter language={props.language} style={coy}>{props.value}</SyntaxHighlighter>
  // },
  blockquote: function makeBlockQuote(props) {
    return <Text type="secondary">{props.children}</Text>;
  },
};

export default function Home() {
  const [markdown, setMarkdown] = useState(null);
  useEffect(() => {
    import("../../../../README.md").then((res) => {
      fetch(res.default)
        .then((response) => response.text())
        .then((text) => setMarkdown(text))
        .catch((error) => console.error(error));
    });
  }, []);
  return (
    <Markdown remarkPlugins={[remarkGfm]} components={{}}>
      {markdown}
    </Markdown>
  );
}
