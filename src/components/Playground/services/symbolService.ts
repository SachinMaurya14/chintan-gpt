export interface CodeSymbol {
  name: string;
  kind: "function" | "class" | "method" | "component" | "variable" | "tag";
  line: number;
  column: number;
}

export class PlaygroundSymbolService {
  static extractSymbols(content: string, language: string): CodeSymbol[] {
    if (!content.trim()) return [];

    const lines = content.split("\n");
    const symbols: CodeSymbol[] = [];

    lines.forEach((line, index) => {
      const lineNum = index + 1;
      const trimmed = line.trim();

      // Python def / class
      if (language === "python") {
        const defMatch = line.match(/^\s*def\s+([a-zA-Z0-9_]+)\s*\(/);
        if (defMatch) {
          symbols.push({
            name: `${defMatch[1]}()`,
            kind: "function",
            line: lineNum,
            column: line.indexOf("def") + 1,
          });
        }
        const classMatch = line.match(/^\s*class\s+([a-zA-Z0-9_]+)/);
        if (classMatch) {
          symbols.push({
            name: classMatch[1],
            kind: "class",
            line: lineNum,
            column: line.indexOf("class") + 1,
          });
        }
      }

      // JavaScript / TypeScript / React
      else if (["javascript", "typescript", "react"].includes(language)) {
        // Function declaration
        const funcMatch = line.match(/^\s*(?:export\s+)?(?:default\s+)?function\s+([a-zA-Z0-9_]+)\s*\(/);
        if (funcMatch) {
          const isComponent = /^[A-Z]/.test(funcMatch[1]);
          symbols.push({
            name: isComponent ? `<${funcMatch[1]} />` : `${funcMatch[1]}()`,
            kind: isComponent ? "component" : "function",
            line: lineNum,
            column: line.indexOf(funcMatch[1]) + 1,
          });
        }

        // Arrow function / Const component
        const arrowMatch = line.match(/^\s*(?:export\s+)?const\s+([a-zA-Z0-9_]+)\s*=\s*(?:(?:\([^)]*\)|[a-zA-Z0-9_]+)\s*=>|function)/);
        if (arrowMatch) {
          const isComponent = /^[A-Z]/.test(arrowMatch[1]);
          symbols.push({
            name: isComponent ? `<${arrowMatch[1]} />` : `${arrowMatch[1]}()`,
            kind: isComponent ? "component" : "function",
            line: lineNum,
            column: line.indexOf(arrowMatch[1]) + 1,
          });
        }

        // Class declaration
        const classMatch = line.match(/^\s*(?:export\s+)?class\s+([a-zA-Z0-9_]+)/);
        if (classMatch) {
          symbols.push({
            name: classMatch[1],
            kind: "class",
            line: lineNum,
            column: line.indexOf("class") + 1,
          });
        }
      }

      // C++ / Java / Kotlin
      else if (["cpp", "java", "kotlin"].includes(language)) {
        // Kotlin fun
        if (language === "kotlin") {
          const funMatch = line.match(/^\s*(?:override\s+)?(?:private\s+|public\s+)?fun\s+([a-zA-Z0-9_]+)\s*\(/);
          if (funMatch) {
            symbols.push({
              name: `${funMatch[1]}()`,
              kind: "function",
              line: lineNum,
              column: line.indexOf("fun") + 1,
            });
          }
          const classMatch = line.match(/^\s*(?:data\s+)?class\s+([a-zA-Z0-9_]+)/);
          if (classMatch) {
            symbols.push({
              name: classMatch[1],
              kind: "class",
              line: lineNum,
              column: line.indexOf("class") + 1,
            });
          }
        } else {
          // C++ / Java methods and functions
          const methodMatch = line.match(
            /^\s*(?:public\s+|private\s+|protected\s+|static\s+|virtual\s+|inline\s+)*(?:[a-zA-Z0-9_<>,:*&]+\s+)+([a-zA-Z0-9_]+)\s*\([^;]*\)\s*(?:const\s*)?\{?/
          );
          if (methodMatch && !trimmed.startsWith("if") && !trimmed.startsWith("for") && !trimmed.startsWith("while") && !trimmed.startsWith("switch")) {
            symbols.push({
              name: `${methodMatch[1]}()`,
              kind: "method",
              line: lineNum,
              column: line.indexOf(methodMatch[1]) + 1,
            });
          }

          const classMatch = line.match(/^\s*(?:public\s+|private\s+)?(?:class|struct|interface)\s+([a-zA-Z0-9_]+)/);
          if (classMatch) {
            symbols.push({
              name: classMatch[1],
              kind: "class",
              line: lineNum,
              column: line.indexOf(classMatch[1]) + 1,
            });
          }
        }
      }
    });

    return symbols;
  }
}
