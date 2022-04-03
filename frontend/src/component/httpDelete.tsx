import axis from 'axios'
import { ChangeEvent, useContext } from 'react'
import { Context } from './home'

const HttpDelete = () => {
    const axios = axis.create({ baseURL: "http://localhost:8081" })

    var deleteId: string

    const { array, setArray } = useContext(Context);

    const setDeleteId = (event: ChangeEvent<HTMLInputElement>) => {
        deleteId = event.target.value;
    }

    const deleteHomework = () => {
        console.log(deleteId)
        axios.delete('/todo/' + deleteId).then((res) => {
            const index = array.findIndex((arr) => arr.id === deleteId);
            array.splice(index,1);
            setArray([...array])
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