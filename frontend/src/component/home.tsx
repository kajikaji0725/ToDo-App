import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import {
  httpPostHomework,
  httpGetHomework,
  httpDeleteHomework,
  httpPutHomework,
} from "../api/http";
import { Homework } from "../model/interface";
import Table from "./table";

const Home = () => {
  const [homework, setHomework] = useState<Homework[]>([]);
  const [id, setID] = useState<number>(-1);
  const [subject, setSubject] = useState<string>("");
  const [date, setDate] = useState<Date>(new Date());

  const addID = (event: React.ChangeEvent<HTMLInputElement>) => {
    setID(Number(event.target.value));
  };

  const addSubject = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSubject(event.target.value);
  };

  const addDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(new Date(event.target.value));
  };

  const getHomework = async () => {
    try {
      const newHomework = await httpGetHomework();
      console.log(newHomework);
      setHomework([...newHomework]);
    } catch (e) {
      console.log(e);
    }
  };

  const postHomework = async () => {
    let homework: Homework = {
      id: id,
      subject: subject,
      date: date,
    };

    try {
      const resp = await httpPostHomework(homework);
      console.log(resp);
    } catch (e) {
      console.error(e);
    }
  };

  const deleteHomework = async (rows: number[]) => {
    let newHomework = homework;
    for (let homeworkID of rows) {
      newHomework = newHomework.filter((v) => v.id !== homeworkID);
      try {
        const resp = await httpDeleteHomework(id);
        console.log(resp);
      } catch (e) {
        console.error(e);
      }
    }
    setHomework([...newHomework]);
  };

  const putHomework = async (newHomework: Homework[], updateID: number[]) => {
    for (const ID of updateID) {
      console.log(ID);
      try {
        const resp = await httpPutHomework(homework[Number(ID)]);
        console.log(resp);
      } catch (e) {
        console.error(e);
      }
    }
    setHomework([...newHomework]);
  };

  // const deleteHomework = async (id: number) => {
  //   try {
  //     const resp = await httpDelete(id);
  //     console.log(resp);
  //   } catch (e) {
  //     console.error(e);
  //   }
  // }

  // const putHomework = async (newHomework: Homework) => {
  //   try {
  //     const resp = await httpPut(newHomework);
  //     console.log(resp);
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id="id"
          label="id"
          placeholder="idはユニークだよ"
          onChange={addID}
        />
      </div>
      <div>
        <TextField
          id="subject"
          label="Subject"
          placeholder="例 知能科学"
          onChange={addSubject}
        />
      </div>
      <div>
        <TextField
          id="date"
          placeholder="期限"
          type="date"
          onChange={addDate}
        />
      </div>
      <Button variant="contained" color="primary" onClick={postHomework}>
        post
      </Button>
      <Button variant="contained" color="primary" onClick={getHomework}>
        get
      </Button>

      <Table
        todos={homework}
        deleteHomework={deleteHomework}
        putHomework={putHomework}
      />
    </Box>
  );
};

export default Home;
