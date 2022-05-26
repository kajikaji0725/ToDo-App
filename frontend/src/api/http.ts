import { Homework } from "../model/interface";
import { http } from "./axios"

export const httpPostHomework = async (homework: Homework): Promise<Homework> => {
  const resp = await http.post<Homework>('/todo', homework);
  return resp.data;
}

export const httpGetHomework = async (): Promise<Homework[]> => {
  const resp = await http.get<Homework[]>('/todo');
  return resp.data;
}

export const httpDeleteHomework = async (id: number): Promise<Homework> => {
  const resp = await http.delete<Homework>('/todo/' + `${id}`);
  return resp.data;
}

export const httpPutHomework = async (homework: Homework): Promise<Homework> => {
  const resp = await http.put<Homework>('/todo/' + `${homework.id}`, homework);
  return resp.data;
}
