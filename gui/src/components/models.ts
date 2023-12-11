import { QCard } from 'quasar';
export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

export type Tag = {
  name: string;
};

export type Category = {
  name: string;
};

export type ParentFolder = {
  id: number;
  name: string;
};

export type Author = {
  name: string;
  avatarUrl: string;
};

export type Article = {
  id: number;
  title: string;
  brief: string;
  author: Author;
  createTime: string;
  updateTime: string;
  tags: Tag[];
  category: Category;
  isTop: boolean;
  length: number;
  folder: ParentFolder;
};

export type Folder = {
  id: number;
  name: string;
  parent: Folder | null;
  folders: Folder[];
  articles: Article[];
  createTime: string;
  updateTime: string;
  articleCount: number | null;
  folderCount: number | null;
};

export type ArticleDetail = Article & {
  content: string;
};

export type Friend = {
  id: number;
  nickname: string;
  avatar: string;
  url: string;
  brief: string;
  isURLShow?: boolean;
}


export function fromUnderscoreToCamelCase<T>(obj: T): T {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (Array.isArray(obj))
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return obj.map((v) => fromUnderscoreToCamelCase(v)) as any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

export type Term = {
  value: number;
  evaluation: number;
  level: number;
};

export type Equipment = {
  id: number;
  level: number;
  name: string;
  attack: Term;
  attack_percent: Term;
  defense: Term;
  defense_percent: Term;
  health: Term;
  health_percent: Term;
  critical_rate: Term;
  critical_damage: Term;
};

export type Character = {
  id: number;
  name: string;
  level: number;
  birth: Date;
  attack: number;
  defense: number;
  health: number;
  critical_rate: number;
  critical_damage: number;
  card: QCard | null;
  equipments: Equipment[];
};

export type CharacterDetail = Character & {
  extra_attack: number;
  base_attack_color: string;
  attack_color: string;
  extra_attack_color: string;
  extra_defense: number;
  base_defense_color: string;
  defense_color: string;
  extra_defense_color: string;
  extra_health: number;
  base_health_color: string;
  health_color: string;
  extra_health_color: string;
};


export type ExpectedDamageResult = {
  expectedDamageRate: string;
  description: string;
};
