import 'katex/dist/katex.min.css';
import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';

/** マークダウン表記のテキストを表示するコーンポー年と */
export const MarkdownViewer = ({ content }: { content: string }) => {
  return (
    <Markdown
      remarkPlugins={[remarkMath]}
      rehypePlugins={[rehypeKatex]}
      children={content}
      components={{
        code: ({ children, className, ref, ...rest }) => {
          const match = /language-(\w+)/.exec(className || '');
          return match ? (
            <SyntaxHighlighter
              {...rest}
              PreTag="div"
              children={String(children).replace(/\n$/, '')}
              language={match[1]}
              style={prism}
              ref={ref as React.LegacyRef<SyntaxHighlighter>}
            />
          ) : (
            <code {...rest} className={`${className} inline`}>
              {children}
            </code>
          );
        },
      }}
    />
  );
};
