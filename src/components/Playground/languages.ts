import { LanguageConfig, PlaygroundLanguageId } from "./types.js";

export const PLAYGROUND_LANGUAGES: LanguageConfig[] = [
  {
    id: "cpp",
    name: "C++ (GCC 14 / C++20)",
    shortName: "C++",
    category: "Systems & Native",
    monacoLang: "cpp",
    version: "C++20 / GCC 14.2",
    fileExtension: ".cpp",
    defaultFileName: "main.cpp",
    compilerBadge: "GCC 14.2",
    description: "High-performance systems programming with STL and modern C++20 standard.",
    plannedFeatures: ["Native Clang / GCC toolchain", "STL & Boost support", "GDB execution debugger", "Memory diagnostics (Valgrind/ASan)"],
    runtimeMode: "compiled-native",
    defaultCode: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!";
    return 0;
}
`,
  },
  {
    id: "python",
    name: "Python (3.12 / CPython)",
    shortName: "Python",
    category: "Backend & General",
    monacoLang: "python",
    version: "Python 3.12",
    fileExtension: ".py",
    defaultFileName: "main.py",
    compilerBadge: "CPython 3.12",
    description: "Versatile, dynamic programming language with rich standard library.",
    plannedFeatures: ["CPython 3.12 runtime", "Standard Library + NumPy", "REPL Mode", "Pytest unit test runner"],
    runtimeMode: "interpreted",
    defaultCode: `print("Hello, World!")
`,
  },
  {
    id: "java",
    name: "Java (OpenJDK 21 LTS)",
    shortName: "Java",
    category: "Backend & General",
    monacoLang: "java",
    version: "Java 21 LTS",
    fileExtension: ".java",
    defaultFileName: "Main.java",
    compilerBadge: "OpenJDK 21",
    description: "Robust, object-oriented language for enterprise architectures and competitive programming.",
    plannedFeatures: ["OpenJDK 21 HotSpot VM", "JUnit 5 test framework", "Multi-file packages", "Heap memory profiler"],
    runtimeMode: "compiled-native",
    defaultCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
`,
  },
  {
    id: "kotlin",
    name: "Kotlin (JVM / 2.0)",
    shortName: "Kotlin",
    category: "Mobile & Modern",
    monacoLang: "kotlin",
    version: "Kotlin 2.0",
    fileExtension: ".kt",
    defaultFileName: "Main.kt",
    compilerBadge: "kotlinc 2.0",
    description: "Modern, concise multiplatform language with coroutines and null-safety.",
    plannedFeatures: ["Kotlin K2 Compiler", "Coroutines runtime", "Kotlin Multiplatform targets", "JVM Bytecode inspector"],
    runtimeMode: "compiled-native",
    defaultCode: `fun main() {
    println("Hello, World!")
}
`,
  },
  {
    id: "javascript",
    name: "JavaScript (ES2024 / V8)",
    shortName: "JavaScript",
    category: "Web & Frontend",
    monacoLang: "javascript",
    version: "ECMAScript 2024",
    fileExtension: ".js",
    defaultFileName: "script.js",
    compilerBadge: "V8 Engine",
    description: "Universal language of the modern web with modern async/await and ES Modules.",
    plannedFeatures: ["Isolated V8 Sandbox", "Web APIs / Fetch polyfills", "Console logger hook", "Module bundler support"],
    runtimeMode: "node-vm",
    defaultCode: `console.log("Hello, World!");
`,
  },
  {
    id: "html",
    name: "HTML5 (Semantic Markup)",
    shortName: "HTML",
    category: "Web & Frontend",
    monacoLang: "html",
    version: "HTML5 Standard",
    fileExtension: ".html",
    defaultFileName: "index.html",
    compilerBadge: "DOM Renderer",
    description: "Modern semantic web document structure with live sandboxed preview support.",
    plannedFeatures: ["Live iframe preview", "DOM tree inspector", "Emmet abbreviations", "W3C validator"],
    runtimeMode: "client-preview",
    defaultCode: `<!DOCTYPE html>
<html>
<head>
    <title>Playground</title>
</head>
<body>
    <h1>Hello, World!</h1>
</body>
</html>
`,
  },
  {
    id: "css",
    name: "CSS3 (Modern Stylesheet)",
    shortName: "CSS",
    category: "Web & Frontend",
    monacoLang: "css",
    version: "CSS3 Spec",
    fileExtension: ".css",
    defaultFileName: "style.css",
    compilerBadge: "CSS Engine",
    description: "Cascading style sheets featuring flexbox, CSS Grid, and custom properties.",
    plannedFeatures: ["Live preview injector", "CSS Grid inspector", "Autoprefixer", "Color picker"],
    runtimeMode: "client-preview",
    defaultCode: `body {
    font-family: sans-serif;
}
`,
  },
  {
    id: "react",
    name: "React (19 / JSX)",
    shortName: "React",
    category: "Frameworks & Fullstack",
    monacoLang: "javascript",
    version: "React 19",
    fileExtension: ".jsx",
    defaultFileName: "App.jsx",
    compilerBadge: "React 19 + Babel",
    description: "Component-driven UI library with hooks, suspense, and JSX syntax.",
    plannedFeatures: ["Live Component Preview", "Babel JSX Transformer", "React DevTools Hook", "Tailwind CSS integration"],
    runtimeMode: "client-preview",
    defaultCode: `function App() {
    return <h1>Hello, World!</h1>;
}

export default App;
`,
  },
  {
    id: "nodejs",
    name: "Node.js (v20 LTS)",
    shortName: "Node.js",
    category: "Backend & General",
    monacoLang: "javascript",
    version: "Node.js v20 LTS",
    fileExtension: ".js",
    defaultFileName: "server.js",
    compilerBadge: "Node.js 20",
    description: "Asynchronous event-driven JavaScript backend runtime with npm ecosystem.",
    plannedFeatures: ["Secure Node.js VM container", "npm package resolution", "HTTP mock server", "File system sandbox"],
    runtimeMode: "node-vm",
    defaultCode: `// Node.js Environment
const http = require('http');

console.log("Starting Node.js application...");

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello from Node.js!');
});

console.log("Hello, World!");
`,
  },
  {
    id: "nextjs",
    name: "Next.js (App Router)",
    shortName: "Next.js",
    category: "Frameworks & Fullstack",
    monacoLang: "javascript",
    version: "Next.js 14/15",
    fileExtension: ".jsx",
    defaultFileName: "app/page.jsx",
    compilerBadge: "Next.js App Router",
    description: "Full-stack React framework with server-side rendering, routing, and optimizations.",
    plannedFeatures: ["App Router preview", "Server components pipeline", "Route handlers API", "Edge runtime support"],
    runtimeMode: "ssr-ready",
    defaultCode: `// app/page.jsx - Next.js App Router
export default function Page() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24">
            <h1 className="text-4xl font-bold">Hello from Next.js!</h1>
        </main>
    );
}
`,
  },
];

export function getLanguageConfig(id: PlaygroundLanguageId): LanguageConfig {
  const found = PLAYGROUND_LANGUAGES.find((lang) => lang.id === id);
  if (!found) {
    return PLAYGROUND_LANGUAGES[0];
  }
  return found;
}
