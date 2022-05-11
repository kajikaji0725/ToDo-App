import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState, VFC } from "react";
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
                <TextField id="ii" label="id" placeholder="idはユニークだよ" />
            </div>
            <div>
                <TextField id="hoge" label="Subject" placeholder="例 知能科学" />
            </div>
            <div>
                <TextField id="j" placeholder="期限" type="datetime-local" />
            </div>


        </Box>
    )
}

export default Home;