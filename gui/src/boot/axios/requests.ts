import axios from 'axios';
import {ArticleBase, FolderBase, fromUnderscoreToCamelCase} from 'components/models';

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


// export async function getArticleList (
//   params?: ArticleListParams
// ): Promise<ArticleOutline[]>  {
//   try {
//     const {data}  = await api.get('/blog/articles/list/', { params });
//     return data.map((article: ArticleOutline) => fromUnderscoreToCamelCase(article));
//   }
//   catch (error) {
//     console.log(error);
//     return {} as ArticleOutline[];
//   }
// }

export async function getArticleById(id: number): Promise<ArticleBase> {
  try {
    const { data } = await api.get(`/blog/articles/detail/${id}`);
    return fromUnderscoreToCamelCase<ArticleBase>(data);
  }
  catch (error) {
    console.log(error);
    return {} as ArticleBase;
  }
}


export async function getFileList(id:number): Promise<FolderBase> {
  try {
    const { data } = await api.get(`/blog/files/list/${id}`);
    return fromUnderscoreToCamelCase<FolderBase>(data);
  }
  catch (error) {
    console.log(error);
    return {} as FolderBase;
  }
}
