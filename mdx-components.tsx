import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold text-brown-900 mb-6">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-semibold text-brown-900 mb-4 mt-8">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-semibold text-brown-900 mb-3 mt-6">{children}</h3>
    ),
    p: ({ children }) => (
      <p className="text-lg text-brown-600 leading-relaxed mb-4">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="list-disc list-inside text-brown-600 mb-4 space-y-2">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside text-brown-600 mb-4 space-y-2">{children}</ol>
    ),
    a: ({ children, href }) => (
      <a href={href} className="text-brown-700 hover:text-brown-900 underline">
        {children}
      </a>
    ),
    ...components,
  }
}

