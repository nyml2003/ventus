export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}


export type Tag = {
  name: string;
}

export type Category = {
  name: string;
}

export type ParentFolder = {
  name: string;
}

export type Author = {
  name: string;
  avatarUrl: string;
}

export type ArticleBase = {
  id: number;
  title: string;
}

export type FolderBase = {
  id: number;
  name: string;
  parent: FolderBase | null;
  folders: FolderBase[];
  articles: ArticleBase[];
}












export function fromUnderscoreToCamelCase<T>(obj: T): T {
  if (Array.isArray(obj)) return obj.map((v) => fromUnderscoreToCamelCase(v)) as any;
  const result = {} as any;
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const camelCaseKey = key.replace(/_([a-z])/g, (m) => m[1].toUpperCase());
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        result[camelCaseKey] = fromUnderscoreToCamelCase(obj[key]);
      } else {
        result[camelCaseKey] = obj[key];
      }
    }
  }
  return result;
}
