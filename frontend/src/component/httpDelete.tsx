import axis from 'axios'
import { ChangeEvent } from 'react'
import { HomeworkDetail } from './interface';

const HttpDelete = (props: {
  array: HomeworkDetail[];
  onRequested: (newArray: HomeworkDetail[]) => void;
}) =>  {
    const axios = axis.create({ baseURL: "http://localhost:8081" })

    var deleteId: string

    const setDeleteId = (event: ChangeEvent<HTMLInputElement>) => {
        deleteId = event.target.value;
    }

    const deleteHomework = () => {
        const datas:HomeworkDetail[] = [...props.array];
        console.log(deleteId)
        axios.delete('/todo/' + deleteId).then((res) => {
            const index = datas.findIndex((arr) => arr.id === deleteId);
            datas.splice(index,1);
            props.onRequested(datas)
            console.log(res)
        }).catch((error) => {
            console.log(error)
        })
    }
    return (
        <>
            <p>
                削除したいidを入力してください<br></br>
                <input name='deleteHomework' type="number" onChange={setDeleteId} />
                <button onClick={deleteHomework}>削除するよ！</button>
            </p>
        </>
    )
}
export default HttpDelete