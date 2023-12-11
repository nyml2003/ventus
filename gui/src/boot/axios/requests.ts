import axios from 'axios';
import {ArticleDetail, Folder, Friend, fromUnderscoreToCamelCase} from 'components/models';

export const devURL  = 'http://127.0.0.1:5000/';
export const baseURL : string = process.env.NODE_ENV === 'production' ? 'https://api.example.com' : devURL
export const api = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  }
});


export interface ArticleListParams {
  keyword?: string;
  category?: string;
  tag?: string;
  created_at?: string;
  folder?: string;
  ordering?: 'created_at' | '-created_at'
}


export async function getArticleById(id: number): Promise<ArticleDetail> {
  try {
    const { data } = await api.get(`/blog/articles/detail/${id}`);
    const article = fromUnderscoreToCamelCase<ArticleDetail>(data);
    article.createTime = new Date(article.createTime).toLocaleString();
    article.updateTime = new Date(article.updateTime).toLocaleString();
    return article;
  }
  catch (error) {
    console.log(error);
    return {} as ArticleDetail;
  }
}


export async function getFileList(id:number): Promise<Folder> {
  try {
    const { data } = await api.get(`/blog/files/list/${id}`);
    const folder = fromUnderscoreToCamelCase<Folder>(data);
    folder.createTime = new Date(folder.createTime).toLocaleString();
    folder.updateTime = new Date(folder.updateTime).toLocaleString();
    return folder;
  }
  catch (error) {
    console.log(error);
    return {} as Folder;
  }
}

export async function getFriendList(): Promise<Friend[]> {
  try {
    const { data } = await api.get('/blog/friends/list');
    const friend = fromUnderscoreToCamelCase<Friend[]>(data);
    return friend;
  }
  catch (error) {
    console.log(error);
    return [] as Friend[];
  }
}
