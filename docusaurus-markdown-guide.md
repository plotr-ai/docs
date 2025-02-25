# Docusaurus Markdown Guide

This guide serves as a reference for writing documentation using Docusaurus markdown features. It covers the main features and provides examples for each.

## Table of Contents

- [MDX and React Components](#mdx-and-react-components)
- [Tabs](#tabs)
- [Code Blocks](#code-blocks)
- [Admonitions](#admonitions)
- [Table of Contents](#table-of-contents)
- [Assets](#assets)
- [Links](#links)
- [MDX Plugins](#mdx-plugins)
- [Math Equations](#math-equations)
- [Diagrams](#diagrams)
- [Head Metadata](#head-metadata)

## MDX and React Components

Docusaurus supports MDX, allowing you to use React components within markdown files.

### Using React Components

```jsx
export const Highlight = ({ children, color }) => (
  <span
    style={{
      backgroundColor: color,
      borderRadius: "2px",
      color: "#fff",
      padding: "0.2rem",
    }}
  >
    {children}
  </span>
);

<Highlight color="#25c2a0">Highlighted text</Highlight>;
```

### Importing Components

```jsx
import TOCInline from "@theme/TOCInline";
import MyComponent from "@site/src/components/MyComponent";
```

## Tabs

Tabs help organize content into different categories or versions.

```jsx
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

<Tabs>
  <TabItem value="apple" label="Apple" default>
    This is an apple 🍎
  </TabItem>
  <TabItem value="orange" label="Orange">
    This is an orange 🍊
  </TabItem>
  <TabItem value="banana" label="Banana">
    This is a banana 🍌
  </TabItem>
</Tabs>;
```

## Code Blocks

Code blocks support syntax highlighting and various features:

\```jsx title="src/components/Hello.js"
function Hello() {
return (
<div>
<h1>Hello, World!</h1>
</div>
);
}
\```

### Line Highlighting

\```jsx {2,4-6}
function MyComponent() {
const highlighted = true; // This line is highlighted
return (
<div> // This block is highlighted
<h1>Hello World</h1>
</div> // This block is highlighted
);
}
\```

## Admonitions

Admonitions (callouts) help emphasize important information:

:::note
This is a note
:::

:::tip
This is a tip
:::

:::info
This is info
:::

:::caution
This is a caution
:::

:::danger
This is a danger warning
:::

## Table of Contents

You can include an inline table of contents:

```jsx
import TOCInline from "@theme/TOCInline";

<TOCInline toc={toc} />;
```

## Assets

### Images

```md
![Alt Text](./path/to/image.png)
```

### Files

```md
[Download PDF](./path/to/file.pdf)
```

## Links

### Internal Links

```md
[Link to Another Doc](./other-doc.md)
[Link to External Site](https://example.com)
```

### Reference-style Links

```md
[Reference Link][1]
[1]: https://example.com
```

## MDX Plugins

Docusaurus supports various MDX plugins for enhanced functionality. Common plugins include:

- remark-math
- rehype-katex
- remark-gfm

## Math Equations

Math equations using KaTeX:

Inline math: $E = mc^2$

Block math:

$$
\sum_{n=1}^{\infty} \frac{1}{n^2} = \frac{\pi^2}{6}
$$

## Diagrams

Mermaid diagrams for visualizing workflows:

\```mermaid
graph TD;
A-->B;
A-->C;
B-->D;
C-->D;
\```

## Head Metadata

```jsx
<head>
  <title>My Doc Title</title>
  <meta name="description" content="My doc description" />
</head>
```

## Best Practices

1. Use appropriate admonitions for different types of content
2. Keep code blocks focused and well-commented
3. Provide descriptive alt text for images
4. Use consistent heading levels
5. Include examples for complex features
6. Maintain a clear document structure
7. Use tabs for alternative implementations or versions
8. Include diagrams for complex workflows
9. Keep math equations readable and well-formatted
10. Optimize assets for web delivery

## File Organization

- Use descriptive filenames in kebab-case
- Group related documents in subdirectories
- Maintain a logical hierarchy
- Include README files in each directory
- Keep assets organized in dedicated folders

## Version Control

- Use front matter for versioning information
- Document breaking changes
- Maintain a changelog
- Include last updated dates
