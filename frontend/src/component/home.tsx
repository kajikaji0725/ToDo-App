import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { httpPost, httpGet, httpDelete } from "../api/http";
import { Homework } from "../model/interface";
import Table from "./table";

const Home = () => {

  const [homework, setHomework] = useState<Homework[]>([]);
  const [id,setID] = useState<number>(-1);
  const [subject,setSubject] = useState<string>("");
  const [date,setDate] = useState<Date>(new Date);

  const addID = (event: React.ChangeEvent<HTMLInputElement>) => {
    setID(Number(event.target.value));
  }

  const addSubject = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSubject(event.target.value);
  }

  const addDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(new Date(event.target.value));
    console.log(date);
  }

  const deleteHomework = (rows: number[]) => {
    let newHomework = homework;
    for (let homeworkID of rows) {
      newHomework = newHomework.filter(v => v.id !== homeworkID);
      httpDeleteHomework(homeworkID);
    }
    setHomework([...newHomework]);
  }

  const httpGetHomework = async () => {
    try {
      const newHomework = await httpGet();
      console.log(newHomework);
      setHomework([...newHomework]);

      console.log(homework.length);

    } catch (e) {
      console.log(e);
    }
  }

  const httpPostHomework = async () => {

    let homework: Homework = {
      id: id,
      subject: subject,
      date: date
    };

    try {
      const resp = await httpPost(homework);
      console.log(resp);
    } catch (e) {
      console.error(e);
    }
  }

  const httpDeleteHomework = async (id: number) => {
    try {
      const resp = await httpDelete(id);
      console.log(resp);
    } catch (e) {
      console.error(e);
    }
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
        <TextField id="id" label="id" placeholder="idはユニークだよ" onChange={addID} />
      </div>
      <div>
        <TextField id="subject" label="Subject" placeholder="例 知能科学" onChange={addSubject} />
      </div>
      <div>
        <TextField id="date" placeholder="期限" type="datetime-local" onChange={addDate} />
      </div>
      <Button
        variant="contained"
        color="primary"
        onClick={httpPostHomework}
      >
        post
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={httpGetHomework}
      >
        get
      </Button>

      <Table todos={homework} deleteHomework={deleteHomework} />

    </Box>
  )
}

export default Home;