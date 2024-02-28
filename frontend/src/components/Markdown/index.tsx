import "./styles.css";
import { Link } from "react-router-dom";
import { Typography } from "antd";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import SyntaxHighlighter from "react-syntax-highlighter";
import { github } from "react-syntax-highlighter/dist/esm/styles/hljs";

import Loading from "@components/Loading";

const { Title, Text, Paragraph } = Typography;
// const renderers = {
//   heading: function Heading(props) {
//     return <Title level={props.level}>{props.children}</Title>;
//   },
//   list: function MakeList(props) {
//     return <List bordered>{props.children}</List>;
//   },
//   listItem: function MakeListItem(props) {
//     return <List.Item>{props.children}</List.Item>;
//   },
//   inlineCode: function makeInlineCode(props) {
//     return <Text code>{props.children}</Text>;
//   },
//   // code: function makeCodeBlock(props) {
//   //     return <SyntaxHighlighter language={props.language} style={coy}>{props.value}</SyntaxHighlighter>
//   // },
//   blockquote: function makeBlockQuote(props) {
//     return <Text type="secondary">{props.children}</Text>;
//   },
// };

type Props = {
  markdown: string;
};
export default function MyMarkdown({ markdown }: Props) {
  return markdown ? (
    <Markdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => <Title level={1}>{children}</Title>,
        h2: ({ children }) => <Title level={2}>{children}</Title>,
        h3: ({ children }) => <Title level={3}>{children}</Title>,
        h4: ({ children }) => <Title level={4}>{children}</Title>,
        h5: ({ children }) => <Title level={5}>{children}</Title>,
        h6: ({ children }) => <Title level={5}>{children}</Title>,
        p: ({ children }) => <Text>{children}</Text>,
        strong: ({ children }) => <Text strong>{children}</Text>,
        em: ({ children }) => <Text italic>{children}</Text>,
        a: ({ href, children }) => {
          return <Link to={href}>{children}</Link>;
        },
        code: ({ children, className, ...props }) => {
          let multiLine =
            typeof children === "string" && children.includes("\n");

          if (!multiLine) {
            return <Text code>{children}</Text>;
          }
          return (
            <div className="multiline-code">
              <SyntaxHighlighter language="bash" style={github}>
                {children}
              </SyntaxHighlighter>
            </div>
          );
        },
      }}
    >
      {markdown}
    </Markdown>
  ) : (
    <Loading />
  );
}
