import { ILanguageAdapter } from "../types.js";
import { CppAdapter } from "./cppAdapter.js";
import { PythonAdapter } from "./pythonAdapter.js";
import { JavaAdapter } from "./javaAdapter.js";
import { KotlinAdapter } from "./kotlinAdapter.js";
import { JavaScriptAdapter } from "./javascriptAdapter.js";
import { NodeAdapter } from "./nodeAdapter.js";
import { HtmlAdapter } from "./htmlAdapter.js";
import { CssAdapter } from "./cssAdapter.js";
import { ReactAdapter } from "./reactAdapter.js";
import { NextAdapter } from "./nextAdapter.js";

export class LanguageAdapterRegistry {
  private static adapters = new Map<string, ILanguageAdapter>();

  static {
    this.register(new CppAdapter());
    this.register(new PythonAdapter());
    this.register(new JavaAdapter());
    this.register(new KotlinAdapter());
    this.register(new JavaScriptAdapter());
    this.register(new NodeAdapter());
    this.register(new HtmlAdapter());
    this.register(new CssAdapter());
    this.register(new ReactAdapter());
    this.register(new NextAdapter());
  }

  public static register(adapter: ILanguageAdapter): void {
    this.adapters.set(adapter.languageId.toLowerCase(), adapter);
  }

  public static get(languageId: string): ILanguageAdapter | undefined {
    return this.adapters.get(languageId.toLowerCase());
  }

  public static getAll(): ILanguageAdapter[] {
    return Array.from(this.adapters.values());
  }
}
