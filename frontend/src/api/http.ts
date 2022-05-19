import { Homework } from "../model/interface";
import { http } from "./axios"

export const httpPost = async (homework: Homework): Promise<Homework> => {
  const resp = await http.post<Homework>('/todo', homework);
  return resp.data;
}

export const httpGet = async (): Promise<Homework[]> => {
  const resp = await http.get<Homework[]>('/todo');
  return resp.data;
}

export const httpDelete = async (id: number): Promise<Homework> => {
  const resp = await http.delete<Homework>('/todo/' + `${id}`);
  return resp.data;
}

export const httpPut = async (homework:Homework): Promise<Homework> => {
  const resp = await http.put<Homework>('/todo/' + `${homework.id}`);
  return resp.data;
}