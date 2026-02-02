import { CustomLanguage, Token } from "./LanguageX";

export class Editor {
  private languages: Map<string, CustomLanguage> = new Map();
  private activeLanguage: CustomLanguage | null = null;

  registerLanguage(lang: CustomLanguage) {
    this.languages.set(lang.name, lang);
  }

  setLanguage(name: string) {
    this.activeLanguage = this.languages.get(name) || null;
  }

  tokenizeLine(line: string): Token[] {
    return this.activeLanguage?.tokenizer?.(line) ?? [];
  }

  getSuggestions(prefix: string): string[] {
    return this.activeLanguage?.autocomplete?.(prefix) ?? [];
  }

  lintCode(code: string): string[] {
    return this.activeLanguage?.lint?.(code) ?? [];
  }
}
