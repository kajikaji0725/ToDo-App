import { Homework } from "../model/interface";
import { http } from "./axios"

export const post = async (homework:Homework): Promise<Homework> => {
  const resp = await http.post<Homework>('/todo',homework);
  return resp.data;
}

export const get = async ():Promise<Homework[]> => {
  const resp = await http.get<Homework[]>('/todo');
  return resp.data;
}
