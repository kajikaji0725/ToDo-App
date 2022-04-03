import React from "react"
import axis from 'axios'
import { HomeworkDetail } from "./interface"

const HttpPost = () => {
    const axios = axis.create({ baseURL: "http://localhost:8081" })
    const headers = {
        'Content-Type': 'application/json'
    }

    var id: string;
    var subject: string;
    var date: string;

    const addID = (event: React.ChangeEvent<HTMLInputElement>) => {
        id = event.target.value;
    }
    const addSubject = (event: React.ChangeEvent<HTMLInputElement>) => {
        subject = event.target.value;
    }
    const addDate = (event: React.ChangeEvent<HTMLInputElement>) => {
        date = event.target.value + ":00+09:00"
    }
    const postHomework = () => {
        console.log(id)
        console.log(subject)
        console.log(date)
        const homework: HomeworkDetail = {
            id: id,
            subject: subject,
            date: date
        }
        //const homeworkJS = JSON.stringify(homework)
        axios.post<HomeworkDetail>('/todo', homework, { headers: headers }).then(res => {
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
            <button onClick={postHomework}>送信！！！</button>
        </>
    )
}
export default HttpPost