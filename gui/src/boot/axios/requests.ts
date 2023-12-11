import axios from 'axios';
import {ArticleDetail, Character, CharacterDetail, Equipment, Folder, Friend, fromUnderscoreToCamelCase} from 'components/models';

export const devURL  = 'http://127.0.0.1:5000/';
export const baseURL: string =
  process.env.NODE_ENV === 'production' ? 'http://39.101.164.12:8080/api' : devURL;
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

export async function refreshAttribute(id:number,attribute: string): Promise<Equipment> {
  try {
    const { data } = await api.get(`/game/equipment/${id}/refresh/${attribute}`);
    return data;
  }
  catch (error) {
    console.log(error);
    return {} as Equipment;
  }
}

export async function removeAttribute(id:number,attribute: string): Promise<Equipment> {
  try {
    const { data } = await api.get(`/game/equipment/${id}/remove/${attribute}`);
    return data;
  }
  catch (error) {
    console.log(error);
    return {} as Equipment;
  }
}

export async function upgradeAttribute(id:number,attribute: string): Promise<Equipment> {
  try {
    const { data } = await api.get(`/game/equipment/${id}/upgrade/${attribute}`);
    return data;
  }
  catch (error) {
    console.log(error);
    return {} as Equipment;
  }
}

export async function upgradeEquipment(id:number): Promise<Equipment> {
  try {
    const { data } = await api.get(`/game/equipment/${id}/upgrade`);
    return data;
  }
  catch (error) {
    console.log(error);
    return {} as Equipment;
  }
}

export async function refreshEquipment(id:number): Promise<Equipment> {
  try {
    const { data } = await api.get(`/game/equipment/${id}/refresh`);
    return data;
  }
  catch (error) {
    console.log(error);
    return {} as Equipment;
  }
}


export async function getCharacterList(): Promise<Character[]> {
  try {
    const { data } = await api.get('/game/character/list');
    return data;
  }
  catch (error) {
    console.log(error);
    return [] as Character[];
  }
}

export async function getCharacterById(id: number): Promise<CharacterDetail> {
  try {
    const { data } = await api.get(`/game/character/${id}`);
    return data;
  } catch (error) {
    console.log(error);
    return {} as CharacterDetail;
  }
}
