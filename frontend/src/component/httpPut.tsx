import { ChangeEvent, useContext } from "react";
import { Context } from "./home";
import axis from 'axios'
import { HomeworkDetail } from "./interface";

const HttpPut = () => {
    const axios = axis.create({ baseURL: "http://localhost:8081" })
    const { array, setArray } = useContext(Context);
    var changeID: string
    var updateID: string
    var updateSubject: string
    var updateDate: string

    const headers = {
        'Content-Type': 'application/json'
    }

    const setChangeID = (event: ChangeEvent<HTMLInputElement>) => {
        changeID = event.target.value;
    }

    const judgChangeID = () => {
        if (array.findIndex((arr) => arr.id === changeID) === -1) {
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
            const index = array.findIndex((arr) => arr.id === changeID);
            array[index].id = updateID;
            array[index].subject = updateSubject;
            array[index].date = updateDate;
            setArray([...array]);
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