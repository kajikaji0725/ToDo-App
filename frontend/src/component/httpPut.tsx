import { ChangeEvent, useContext } from "react";
import axis from 'axios'
import { HomeworkDetail } from "./interface";

const HttpPut = (props:{
  array: HomeworkDetail[];
  onRequested: (newArray: HomeworkDetail[]) => void;
}) => {
    const axios = axis.create({ baseURL: "http://localhost:8081" })
    var changeID: string
    var updateID: string
    var updateSubject: string
    var updateDate: string

    const datas:HomeworkDetail[] = [...props.array];

    const headers = {
        'Content-Type': 'application/json'
    }

    const setChangeID = (event: ChangeEvent<HTMLInputElement>) => {
        changeID = event.target.value;
    }

    const judgChangeID = () => {
        if (datas.findIndex((arr) => arr.id === changeID) === -1) {
            alert("そのidは存在しないよ!!");
        } else {
            alert("id見つけた!!");
        }
    }

    const setUpdateID = (event: ChangeEvent<HTMLInputElement>) => {
        updateID = event.target.value;
    }

    const setUpdateSubject = (event: ChangeEvent<HTMLInputElement>) => {
        updateSubject = event.target.value;
    }

    const setUpdateDate = (event: ChangeEvent<HTMLInputElement>) => {
        updateDate = event.target.value + ":00+09:00";
    }

    const updateHomework = () => {
        const updateHomework: HomeworkDetail = {
            id: updateID,
            subject: updateSubject,
            date: updateDate
        }
        axios.put<HomeworkDetail>('/todo/' + changeID, updateHomework, { headers: headers }).then((res) => {
            console.log(res);
            const index = datas.findIndex((arr) => arr.id === changeID);
            datas[index].id = updateID;
            datas[index].subject = updateSubject;
            datas[index].date = updateDate;
            props.onRequested(datas);
        }).catch((error) => {
            console.log(error);
        });
    }
    return (
        <>
            <p>
                変更する要素のidを教えてください。
                <input name="id" type="number" onChange={setChangeID} />
                <button onClick={judgChangeID}>存在するか確かめる</button>
            </p>

            <p>
                更新内容を記入してください。<br></br>
                ID
                <input name="updateID" type="number" onChange={setUpdateID} /> <br></br>
                科目
                <input name="updateSubject" type="text" onChange={setUpdateSubject} /> <br></br>
                期限日
                <input name="updateDate" type="datetime-local" onChange={setUpdateDate} />
            </p>
            <p>
                <button onClick={updateHomework}>更新するよ！！！</button>
            </p>
        </>
    )
}

export default HttpPut