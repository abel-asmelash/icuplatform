import { MDXRemote } from "next-mdx-remote/rsc";

export const Preview = ({ content = "" }: { content: string }) => {
  const formattedContent = content.replace(/\\/g, "").replace(/&#x20;/g, "");

  return (
    <section className="prose dark:prose-invert max-w-none">
      <MDXRemote
        source={formattedContent}
        components={{
          pre: ({ children }) => (
            <pre className="bg-light-800 dark:bg-dark-300 rounded-md p-4 overflow-x-auto text-sm">
              {children}
            </pre>
          ),
          code: ({ children }) => (
            <code className="bg-light-800 dark:bg-dark-300 rounded px-1.5 py-0.5 text-sm font-mono">
              {children}
            </code>
          ),
        }}
      />
    </section>
  );
};
