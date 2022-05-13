import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState, VFC } from "react";
import { post } from "../api/http";
import { Homework, HomeworkDetail } from "../model/interface";

const Home = () => {
    const [homework, setHomework] = useState<HomeworkDetail[]>([]);

    let id: number;
    let subject: string;
    let date: Date;

    const addID = (event: React.ChangeEvent<HTMLInputElement>) => {
        id = Number(event.target.value);
    }

    const addSubject = (event: React.ChangeEvent<HTMLInputElement>) => {
        subject = event.target.value;
    }

    const addDate = (event: React.ChangeEvent<HTMLInputElement>) => {
      console.log(event.target.value)
    }

    const httpPost = () => {
      let homeworkDetail: HomeworkDetail={
        id: id,
        subject: subject,
        date: date
      };

      const resp = post(homeworkDetail);
      console.log(resp);
    }


    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' }
            }}
            noValidate
            autoComplete="off"
        >
            <div>
                <TextField id="ii" label="id" placeholder="idはユニークだよ" onChange={addID}/>
            </div>
            <div>
                <TextField id="hoge" label="Subject" placeholder="例 知能科学" onChange={addSubject}/>
            </div>
            <div>
                <TextField id="j" placeholder="期限" type="datetime-local" onChange={addDate}/>
            </div>
            <Button
                variant="contained"
                color="primary"
                type="submit"
                onClick={httpPost}
                >
              次へ
            </Button>

        </Box>
    )
}

export default Home;