import axis from 'axios';
import { useState } from 'react';
import { arrayBuffer } from 'stream/consumers';
import { Homework, HomeworkDetail } from './interface';

const HttpGet = (props: {
    array: HomeworkDetail[];
    onRequested: (newArray: HomeworkDetail[]) => void
}) => {
    const axios = axis.create({ baseURL: "http://localhost:8081" })
    const handleGetHomework = () => {
        axios
            .get<Homework[]>("/todo")// GETメソッドを呼び出す
            .then((res) => {  // レスポンスを受け取ったらthenを実行する

                const datas: HomeworkDetail[] = props.array;

                for (const item of res.data) {
                    console.log(typeof (item.homework.date))
                    if (props.array.some((arr) => arr.id === item.homework.id)) {
                        continue;
                    }
                    const { id, subject, date } = item.homework
                    const homework: HomeworkDetail = {
                        id: id,
                        subject: subject,
                        date: date
                    }

                    datas.push(homework);
                }

                props.onRequested(datas);
                console.log(props.array);
            })
            .catch((error) => {  // エラーコードが返ってきた場合
                console.log(error);  // エラーコードを表示
            });
    };
    return (
        <>
            <button onClick={handleGetHomework}>データを取得！</button>
            <p>
                {props.array.map((arr: HomeworkDetail) => (
                    <li>{arr.id} {arr.subject} {arr.date}</li>
                ))}
            </p>
        </>
    )
}
export default HttpGet