import axis from 'axios';
import { Homework, HomeworkDetail } from './interface';

const HttpGet = (props: {
  array: HomeworkDetail[];
  onRequested: (newArray: HomeworkDetail[]) => void;
}) => {

    const axios = axis.create({ baseURL: "http://localhost:8081" })
    const getHomework = () => {
        axios
            .get<Homework[]>("/todo")// GETメソッドを呼び出す
            .then((res) => {  // レスポンスを受け取ったらthenを実行する

              const datas : HomeworkDetail[] = [...props.array];

                for (const item of res.data) {
                    if (props.array.some((arr) => arr.id === item.Homework.id)) {
                        continue;
                    }
                    const {id, subject, date} = item.Homework;
                    const homework: HomeworkDetail = {
                        id: id,
                        subject: subject,
                        date: date
                    }
                    datas.push(homework);
                }
                props.onRequested(datas);
            })

            .catch((error) => {  // エラーコードが返ってきた場合
                console.log(error);  // エラーコードを表示
            });
    };
    return (
        <>
            <button onClick={getHomework}>データを更新！</button>
            <p>
                {props.array.map((arr: HomeworkDetail) => (
                    <li>{arr.id} {arr.subject} {arr.date}</li>
                ))}
            </p>
        </>
    )
}
export default HttpGet