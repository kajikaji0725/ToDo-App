import { useContext, useState } from 'react';
import axis from 'axios';
import { Homework, HomeworkDetail } from './interface';
import { ReactDOM } from 'react';
import { Context } from './home';

const HttpGet = () => {
    //const [array, setArray] = useState<HomeworkDetail[]>([]);
    const {array,setArray} = useContext(Context);
    const axios = axis.create({ baseURL: "http://localhost:8081" })
    const getHomework = () => {
        axios
            .get<Homework[]>("/todo")// GETメソッドを呼び出す
            .then((res) => {  // レスポンスを受け取ったらthenを実行する

                for (var i = 0; i < res.data.length; i++) {
                    if (array.some((arr) => arr.id === res.data[i].Homework.id)) {
                        continue;
                    }
                    const id = res.data[i].Homework.id
                    const subject = res.data[i].Homework.subject
                    const date = res.data[i].Homework.date
                    const homework: HomeworkDetail = {
                        id: id,
                        subject: subject,
                        date: date
                    }
                    array.push(homework);
                }
                setArray([...array]);
                console.log(array);
            })

            .catch((error) => {  // エラーコードが返ってきた場合
                console.log(error);  // エラーコードを表示
            });
    };
    return (
        <>
            <button onClick={getHomework}>データを更新！</button>
            <p>
                {array.map((arr: HomeworkDetail) => (
                    <li>{arr.id} {arr.subject} {arr.date}</li>
                ))}
            </p>
        </>
    )
}
export default HttpGet