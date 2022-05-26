import dayjs from "dayjs";
import QueryString from "qs";
import axios from 'axios'

export const http = axios.create({
  baseURL: 'http://localhost:8081',
})

http.interceptors.request.use((config) => {
  config.paramsSerializer = (params) => QueryString.stringify(params, {
    serializeDate: (date: Date) => dayjs(date).format('YYYY-MM-DDTHH:mm:ssZ') });
  return config;
})


