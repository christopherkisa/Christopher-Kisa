import type {
  AnchorHTMLAttributes,
  ComponentPropsWithoutRef,
} from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";

const components = {
  h1: (props: ComponentPropsWithoutRef<"h1">) => (
    <h1 className="mt-0 font-display text-3xl font-bold" {...props} />
  ),
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2 className="mt-10 font-display text-2xl font-semibold" {...props} />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3 className="mt-8 font-display text-xl font-semibold" {...props} />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p className="mt-4 leading-7 text-muted-foreground" {...props} />
  ),
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul className="mt-4 list-disc space-y-2 pl-6 text-muted-foreground" {...props} />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol className="mt-4 list-decimal space-y-2 pl-6 text-muted-foreground" {...props} />
  ),
  li: (props: ComponentPropsWithoutRef<"li">) => (
    <li className="leading-7" {...props} />
  ),
  a: ({ href, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const isExt = href?.startsWith("http");
    if (isExt) {
      return (
        <a
          href={href}
          className="font-medium text-accent underline-offset-4 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
          {...props}
        />
      );
    }
    return (
      <Link
        href={href ?? "#"}
        className="font-medium text-accent underline-offset-4 hover:underline"
        {...props}
      />
    );
  },
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className="mt-6 border-l-4 border-accent pl-4 italic text-muted-foreground"
      {...props}
    />
  ),
  code: (props: ComponentPropsWithoutRef<"code">) => (
    <code
      className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm"
      {...props}
    />
  ),
};

export function MdxContent({ source }: { source: string }) {
  return (
    <article className="max-w-none">
      <MDXRemote source={source} components={components} />
    </article>
  );
}
