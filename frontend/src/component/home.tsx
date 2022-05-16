import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState, VFC } from "react";
import { http } from "../api/axios";
import { get, post } from "../api/http";
import { Homework} from "../model/interface";
import Table from "./table";

const Home = () => {
    const [homework, setHomework] = useState<Homework[]>([]);

    let id: number;
    let subject: string;
    let date: Date;
    let flag: boolean = false;

    useEffect(() => {
      flag = false;
    },[homework])

    const addID = (event: React.ChangeEvent<HTMLInputElement>) => {
        id = Number(event.target.value);
    }

    const addSubject = (event: React.ChangeEvent<HTMLInputElement>) => {
        subject = event.target.value;
    }

    const addDate = (event: React.ChangeEvent<HTMLInputElement>) => {
      date = new Date(event.target.value);
      console.log(date);
    }

    const httpPost = () => {
      let homework: Homework={
        id: id,
        subject: subject,
        date: date
      };

      const resp = post(homework);
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
                onClick={httpPost}
                >
              post
            </Button>
            <Button
                variant="contained"
                color="primary"
                onClick={async () => {
                  try{
                    const newHomework = await get();
                    if(Array.isArray(newHomework)){
                      setHomework([...newHomework]);                     
                    }else{
                      setHomework(newHomework);
                  }
                  console.log(homework);
                  flag=true;
                }catch(e){
                    console.log(e);
                  }
                }}
                >
              get
            </Button>

            <Table todos={homework} flag={flag} />

        </Box>
    )
}

export default Home;