/**
 * Autocomplete and IntelliSense service for Monaco Editor.
 * Registers syntax-aware completion providers for supported languages.
 */

let providersRegistered = false;

export function registerPlaygroundCompletions(monaco: any) {
  if (!monaco || providersRegistered) return;
  providersRegistered = true;

  // 1. C++ Completion Provider
  monaco.languages.registerCompletionItemProvider("cpp", {
    provideCompletionItems: (model: any, position: any) => {
      const word = model.getWordUntilPosition(position);
      const range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn,
      };

      const suggestions = [
        {
          label: "cout",
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: "cout << ${1:output} << endl;",
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: "Prints formatted text to standard output (std::cout)",
          range,
        },
        {
          label: "cin",
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: "cin >> ${1:variable};",
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: "Reads input from standard input (std::cin)",
          range,
        },
        {
          label: "vector",
          kind: monaco.languages.CompletionItemKind.Class,
          insertText: "vector<${1:int}> ${2:vec};",
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: "std::vector dynamic array container",
          range,
        },
        {
          label: "string",
          kind: monaco.languages.CompletionItemKind.Class,
          insertText: "string ${1:str} = \"${2:value}\";",
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: "std::string character sequence container",
          range,
        },
        {
          label: "include-iostream",
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: "#include <iostream>",
          documentation: "Includes input/output stream header",
          range,
        },
        {
          label: "include-vector",
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: "#include <vector>",
          documentation: "Includes dynamic vector container header",
          range,
        },
        {
          label: "include-algorithm",
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: "#include <algorithm>",
          documentation: "Includes standard algorithms (sort, reverse, find)",
          range,
        },
        {
          label: "for-range",
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: "for (const auto& ${1:item} : ${2:collection}) {\n\t${3}\n}",
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: "Range-based for loop",
          range,
        },
        {
          label: "push_back",
          kind: monaco.languages.CompletionItemKind.Method,
          insertText: "push_back(${1:value});",
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: "Appends element to vector container",
          range,
        },
      ];

      return { suggestions };
    },
  });

  // 2. Python Completion Provider
  monaco.languages.registerCompletionItemProvider("python", {
    provideCompletionItems: (model: any, position: any) => {
      const word = model.getWordUntilPosition(position);
      const range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn,
      };

      const suggestions = [
        {
          label: "print",
          kind: monaco.languages.CompletionItemKind.Function,
          insertText: "print(${1:object})",
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: "Prints values to the stream or to sys.stdout",
          range,
        },
        {
          label: "def",
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: "def ${1:func_name}(${2:args}):\n\t\"\"\"${3:Docstring}\"\"\"\n\t${4:pass}",
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: "Defines a new Python function",
          range,
        },
        {
          label: "class",
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: "class ${1:ClassName}:\n\tdef __init__(self${2:, args}):\n\t\t${3:pass}",
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: "Defines a new Python class",
          range,
        },
        {
          label: "len",
          kind: monaco.languages.CompletionItemKind.Function,
          insertText: "len(${1:sequence})",
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: "Returns the number of items in a container",
          range,
        },
        {
          label: "range",
          kind: monaco.languages.CompletionItemKind.Function,
          insertText: "range(${1:stop})",
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: "Generates an immutable sequence of numbers",
          range,
        },
        {
          label: "if-main",
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: "if __name__ == '__main__':\n\t${1:main()}",
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: "Boilerplate entrypoint guard",
          range,
        },
      ];

      return { suggestions };
    },
  });

  // 3. Java Completion Provider
  monaco.languages.registerCompletionItemProvider("java", {
    provideCompletionItems: (model: any, position: any) => {
      const word = model.getWordUntilPosition(position);
      const range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn,
      };

      const suggestions = [
        {
          label: "sout",
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: "System.out.println(${1:message});",
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: "Prints line to standard output",
          range,
        },
        {
          label: "psvm",
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: "public static void main(String[] args) {\n\t${1}\n}",
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: "Standard Java main entrypoint method",
          range,
        },
        {
          label: "ArrayList",
          kind: monaco.languages.CompletionItemKind.Class,
          insertText: "List<${1:String}> ${2:list} = new ArrayList<>();",
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: "Resizable-array implementation of the List interface",
          range,
        },
        {
          label: "HashMap",
          kind: monaco.languages.CompletionItemKind.Class,
          insertText: "Map<${1:String}, ${2:Integer}> ${3:map} = new HashMap<>();",
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: "Hash table based implementation of the Map interface",
          range,
        },
      ];

      return { suggestions };
    },
  });

  // 4. Kotlin Completion Provider
  monaco.languages.registerCompletionItemProvider("kotlin", {
    provideCompletionItems: (model: any, position: any) => {
      const word = model.getWordUntilPosition(position);
      const range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn,
      };

      const suggestions = [
        {
          label: "println",
          kind: monaco.languages.CompletionItemKind.Function,
          insertText: "println(${1:message})",
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: "Prints the given message and the line separator to stdout",
          range,
        },
        {
          label: "fun",
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: "fun ${1:functionName}(${2:params}): ${3:Unit} {\n\t${4}\n}",
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: "Kotlin function declaration",
          range,
        },
        {
          label: "data-class",
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: "data class ${1:Name}(\n\tval ${2:prop}: ${3:String}\n)",
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: "Kotlin Data Class",
          range,
        },
        {
          label: "listOf",
          kind: monaco.languages.CompletionItemKind.Function,
          insertText: "listOf(${1:elements})",
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: "Creates a read-only list",
          range,
        },
      ];

      return { suggestions };
    },
  });
}
