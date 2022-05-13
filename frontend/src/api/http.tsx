import { VFC } from "react";
import { HomeworkDetail } from "../model/interface";
import axis from 'axios'

const http = axis.create({
  baseURL: 'http://localhost:8081',
})

export const post = async (homeworkDetial:HomeworkDetail): Promise<HomeworkDetail> => {
  const resp = await http.post<HomeworkDetail>('/todo',homeworkDetial);
  return resp.data;
}
