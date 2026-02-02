// Token model
export interface Token {
  type: "keyword" | "type" | "operator" | "string" | "comment" | "identifier";
  value: string;
  start: number;
  end: number;
}

// Custom language contract
export interface CustomLanguage {
  name: string;
  keywords: string[];
  types?: string[];
  operators?: string[];
  comments?: { start: string; end?: string };
  tokenizer?(line: string): Token[];
  autocomplete?(prefix: string): string[];
  lint?(code: string): string[];
}

// LanguageX definition
export const LanguageX: CustomLanguage = {
  name: "LanguageX",

  // Core syntax rules
  keywords: ["func", "var", "return"],
  types: ["int", "string", "bool"],
  operators: ["+", "-", "*", "/"],
  comments: { start: "//" },

  // Tokenizer: splits a line into tokens
  tokenizer(line: string): Token[] {
    const tokens: Token[] = [];
    const words = line.split(/\s+/);
    let pos = 0;

    for (const word of words) {
      if (this.keywords.includes(word)) {
        tokens.push({ type: "keyword", value: word, start: pos, end: pos + word.length });
      } else if (this.types?.includes(word)) {
        tokens.push({ type: "type", value: word, start: pos, end: pos + word.length });
      } else if (this.operators?.includes(word)) {
        tokens.push({ type: "operator", value: word, start: pos, end: pos + word.length });
      } else if (word.startsWith(this.comments?.start || "")) {
        tokens.push({ type: "comment", value: word, start: pos, end: pos + word.length });
      } else {
        tokens.push({ type: "identifier", value: word, start: pos, end: pos + word.length });
      }
      pos += word.length + 1;
    }
    return tokens;
  },

  // Autocomplete: suggests keywords based on prefix
  autocomplete(prefix: string) {
    return this.keywords.filter(k => k.startsWith(prefix));
  },

  // Linting: basic rule check
  lint(code: string) {
    const warnings: string[] = [];
    if (!code.includes("return")) {
      warnings.push("Function missing return statement");
    }
    return warnings;
  }
};
