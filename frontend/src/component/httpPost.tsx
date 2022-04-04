import React from "react"
import axis from 'axios'
import { HomeworkDetail } from "./interface"

const HttpPost = () => {
    const axios = axis.create({ baseURL: "http://localhost:8081" })

    var id: string;
    var subject: string;
    var date: Date;

    const addID = (event: React.ChangeEvent<HTMLInputElement>) => {
        id = event.target.value;
    }
    const addSubject = (event: React.ChangeEvent<HTMLInputElement>) => {
        subject = event.target.value;
    }
    const addDate = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value);
        date = new Date(event.target.value);
    }
    const handlePostHomework = () => {
        const homework: HomeworkDetail = {
            id: id,
            subject: subject,
            date: date
        }
        console.log(homework.date?.toJSON());
        axios.post<HomeworkDetail>('/todo', homework).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <>
            <p>
                idを入力してください
                <input name="id" type="number" onChange={addID} />
            </p>
            <p>
                科目を入力してください
                <input name="subject" type="text" onChange={addSubject} />
            </p>
            <p>
                期限日を入力してください
                <input name="date" type="datetime-local" onChange={addDate} />
            </p>
            <button onClick={handlePostHomework}>送信！！！</button>
        </>
    )
}
export default HttpPost