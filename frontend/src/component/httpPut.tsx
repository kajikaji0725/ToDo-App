import { ChangeEvent } from "react";
import axis from 'axios'
import { HomeworkDetail } from "./interface";

const HttpPut = (props: {
    array: HomeworkDetail[];
    onRequested: (newArray: HomeworkDetail[]) => void
}) => {
    const axios = axis.create({ baseURL: "http://localhost:8081" })
    let changeID: string
    let updateID: string
    let updateSubject: string
    let updateDate: Date

    const setChangeID = (event: ChangeEvent<HTMLInputElement>) => {
        changeID = event.target.value;
    }

    const judgChangeID = () => {
        if (props.array.findIndex((arr) => arr.id === changeID) === -1) {
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
        updateDate = new Date(event.target.value);
    }

    const handleUpdateHomework = () => {
        const updateHomework: HomeworkDetail = {
            id: updateID,
            subject: updateSubject,
            date: updateDate
        }
        axios.put<HomeworkDetail>('/todo/' + changeID, updateHomework).then((res) => {
            //console.log(updateDate.toJSON());
            console.log(updateDate)
            const index = props.array.findIndex((arr) => arr.id === changeID);
            const datas: HomeworkDetail[] = props.array;
            console.log(typeof (datas[index].date))
            console.log(typeof (updateDate))
            datas[index].id = updateID;
            datas[index].subject = updateSubject;
            datas[index].date = updateDate;
            console.log(res.data.date)
            props.onRequested(datas);
            //console.log(props.array)
        }).catch((error) => {
            console.log(error);
        });
    }
    return (
        <>
            <ul>
                変更する要素のidを教えてください。
                <input name="id" type="number" onChange={setChangeID} />
                <button onClick={judgChangeID}>存在するか確かめる</button>
            </ul>

            <ul>
                更新内容を記入してください。<br></br>
                ID
                <input name="updateID" type="number" onChange={setUpdateID} /> <br></br>
                科目
                <input name="updateSubject" type="text" onChange={setUpdateSubject} /> <br></br>
                期限日
                <input name="updateDate" type="datetime-local" onChange={setUpdateDate} />
            </ul>
            <ul>
                <button onClick={handleUpdateHomework}>更新するよ！！！</button>
            </ul>
        </>
    )
}

export default HttpPut