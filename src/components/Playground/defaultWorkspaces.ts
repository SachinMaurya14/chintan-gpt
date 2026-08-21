import { PlaygroundLanguageId, WorkspaceFile } from "./types.js";
import { PLAYGROUND_LANGUAGES } from "./languages.js";

export function createDefaultWorkspaces(): Record<PlaygroundLanguageId, WorkspaceFile[]> {
  const ws: Record<PlaygroundLanguageId, WorkspaceFile[]> = {
    cpp: [
      {
        id: "cpp-main",
        name: "main.cpp",
        path: "src/main.cpp",
        extension: ".cpp",
        language: "cpp",
        isEntry: true,
        content: `#include <iostream>
#include "utils.h"
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    cout << "Sum from helper: " << add(15, 27) << endl;
    return 0;
}
`,
      },
      {
        id: "cpp-utils-h",
        name: "utils.h",
        path: "src/utils.h",
        extension: ".h",
        language: "cpp",
        content: `#pragma once

int add(int a, int b);
`,
      },
      {
        id: "cpp-utils-cpp",
        name: "utils.cpp",
        path: "src/utils.cpp",
        extension: ".cpp",
        language: "cpp",
        content: `#include "utils.h"

int add(int a, int b) {
    return a + b;
}
`,
      },
      {
        id: "cpp-readme",
        name: "README.md",
        path: "README.md",
        extension: ".md",
        language: "markdown",
        content: `# C++ Project Workspace

Multi-file C++ project with modular source files and headers.
Run the project to compile with GCC 14 (C++20).
`,
      },
    ],
    python: [
      {
        id: "python-main",
        name: "main.py",
        path: "src/main.py",
        extension: ".py",
        language: "python",
        isEntry: true,
        content: `from helper import greet, calculate_stats

def main():
    print("Hello, World!")
    print(greet("Developer"))
    
    data = [10, 20, 30, 40, 50]
    total, mean = calculate_stats(data)
    print(f"Stats -> Total: {total}, Mean: {mean:.1f}")

if __name__ == "__main__":
    main()
`,
      },
      {
        id: "python-helper",
        name: "helper.py",
        path: "src/helper.py",
        extension: ".py",
        language: "python",
        content: `def greet(name: str) -> str:
    return f"Welcome to Playground IDE, {name}!"

def calculate_stats(numbers: list[float]) -> tuple[float, float]:
    total = sum(numbers)
    mean = total / len(numbers) if numbers else 0.0
    return total, mean
`,
      },
      {
        id: "python-readme",
        name: "README.md",
        path: "README.md",
        extension: ".md",
        language: "markdown",
        content: `# Python Project Workspace

Modular Python 3.12 workspace with helper modules and functions.
`,
      },
    ],
    java: [
      {
        id: "java-main",
        name: "Main.java",
        path: "src/Main.java",
        extension: ".java",
        language: "java",
        isEntry: true,
        content: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        Calculator calc = new Calculator();
        System.out.println("25 + 17 = " + calc.add(25, 17));
    }
}
`,
      },
      {
        id: "java-calc",
        name: "Calculator.java",
        path: "src/Calculator.java",
        extension: ".java",
        language: "java",
        content: `public class Calculator {
    public int add(int a, int b) {
        return a + b;
    }
}
`,
      },
      {
        id: "java-readme",
        name: "README.md",
        path: "README.md",
        extension: ".md",
        language: "markdown",
        content: `# Java Project Workspace

OpenJDK 21 LTS project workspace with multi-class compilation.
`,
      },
    ],
    kotlin: [
      {
        id: "kotlin-main",
        name: "Main.kt",
        path: "src/Main.kt",
        extension: ".kt",
        language: "kotlin",
        isEntry: true,
        content: `fun main() {
    println("Hello, World!")
    val result = formatMessage("Kotlin Developer")
    println(result)
}
`,
      },
      {
        id: "kotlin-utils",
        name: "Utils.kt",
        path: "src/Utils.kt",
        extension: ".kt",
        language: "kotlin",
        content: `fun formatMessage(name: String): String {
    return "Welcome to Kotlin 2.0 on Playground, $name!"
}
`,
      },
      {
        id: "kotlin-readme",
        name: "README.md",
        path: "README.md",
        extension: ".md",
        language: "markdown",
        content: `# Kotlin Project Workspace

Kotlin 2.0 modern JVM workspace.
`,
      },
    ],
    javascript: [
      {
        id: "js-index",
        name: "index.js",
        path: "src/index.js",
        extension: ".js",
        language: "javascript",
        isEntry: true,
        content: `console.log("Hello, World!");

const numbers = [1, 2, 3, 4, 5];
const squares = numbers.map(x => x * x);
console.log("Squares:", squares);
`,
      },
      {
        id: "js-package",
        name: "package.json",
        path: "package.json",
        extension: ".json",
        language: "json",
        content: `{
  "name": "playground-js-project",
  "version": "1.0.0",
  "main": "src/index.js"
}
`,
      },
    ],
    nodejs: [
      {
        id: "node-server",
        name: "server.js",
        path: "src/server.js",
        extension: ".js",
        language: "javascript",
        isEntry: true,
        content: `const http = require('http');

console.log("Hello, World!");
console.log("Node.js runtime active:", process.version);
`,
      },
      {
        id: "node-package",
        name: "package.json",
        path: "package.json",
        extension: ".json",
        language: "json",
        content: `{
  "name": "playground-nodejs-project",
  "version": "1.0.0",
  "main": "src/server.js"
}
`,
      },
    ],
    html: [
      {
        id: "html-index",
        name: "index.html",
        path: "index.html",
        extension: ".html",
        language: "html",
        isEntry: true,
        content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Playground Web Project</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div class="card">
        <h1>Hello, World!</h1>
        <p>Interactive client-side web workspace.</p>
        <button id="btn" onclick="alert('Clicked!')">Click Me</button>
    </div>
</body>
</html>
`,
      },
      {
        id: "html-css",
        name: "style.css",
        path: "css/style.css",
        extension: ".css",
        language: "css",
        content: `body {
    font-family: system-ui, -apple-system, sans-serif;
    background: #09090b;
    color: #f4f4f5;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    margin: 0;
}

.card {
    background: #18181b;
    border: 1px solid #27272a;
    padding: 2rem;
    border-radius: 12px;
    text-align: center;
}

button {
    background: #f97316;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    cursor: pointer;
    font-weight: bold;
}
`,
      },
    ],
    css: [
      {
        id: "css-style",
        name: "style.css",
        path: "style.css",
        extension: ".css",
        language: "css",
        isEntry: true,
        content: `/* Modern CSS Stylesheet */
:root {
    --primary: #f97316;
    --bg-dark: #09090b;
}

body {
    background: var(--bg-dark);
    color: #fff;
    font-family: sans-serif;
}
`,
      },
    ],
    react: [
      {
        id: "react-app",
        name: "App.jsx",
        path: "src/App.jsx",
        extension: ".jsx",
        language: "javascript",
        isEntry: true,
        content: `import React, { useState } from 'react';

export default function App() {
    const [count, setCount] = useState(0);

    return (
        <div style={{ padding: '2rem', fontFamily: 'sans-serif', textAlign: 'center' }}>
            <h1>Hello from React!</h1>
            <p>Interactive JSX Component</p>
            <button 
                onClick={() => setCount(c => c + 1)}
                style={{
                    background: '#f97316',
                    color: 'white',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    cursor: 'pointer'
                }}
            >
                Count: {count}
            </button>
        </div>
    );
}
`,
      },
    ],
    nextjs: [
      {
        id: "nextjs-page",
        name: "page.jsx",
        path: "app/page.jsx",
        extension: ".jsx",
        language: "javascript",
        isEntry: true,
        content: `export default function Page() {
    return (
        <main className="p-8 text-center">
            <h1 className="text-3xl font-bold text-orange-500">Next.js App Router</h1>
            <p className="text-zinc-400 mt-2">Server & Client component architecture</p>
        </main>
    );
}
`,
      },
    ],
  };

  return ws;
}
