import {
  DataGrid,
  GridCellEditCommitParams,
  GridColDef,
  GridSelectionModel,
  GridValueFormatterParams,
} from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { Homework } from "../model/interface";
import { useRef, useState } from "react";
import moment from "moment";

const Table = (props: {
  todos: Homework[];
  deleteHomework: (homeworkID: number[]) => void;
  putHomework: (homework: Homework[], updateID: number[]) => void;
}): JSX.Element => {
  const dateFormat = (v: GridValueFormatterParams) => {
    return moment(v.value).format("YYYY-MM-DD HH:mm");
  };

  const [homeworkID, setHomeworkID] = useState<number[]>([]);

  const [newHomework, setNewHomework] = useState<Homework[]>([...props.todos]);
  const [updateID, setUpdateID] = useState<number[]>([]);

  const [newSubject, setNewSubject] = useState<Map<number, string>>(
    new Map<number, string>()
  );
  const [newDate, setNewDate] = useState<Map<number, Date>>(
    new Map<number, Date>()
  );

  const colums: GridColDef[] = [
    { field: "id", headerName: "ID", width: 150 },
    { field: "subject", headerName: "Subject", width: 150, editable: true },
    {
      field: "date",
      headerName: "Date",
      width: 250,
      editable: true,
      valueFormatter: dateFormat,
    },
  ];

  const delRows = () => {
    console.log(homeworkID);
    if (homeworkID.length == 0) return;
    props.deleteHomework(homeworkID);
  };

  const chengeCell = (v: GridCellEditCommitParams) => {
    console.log(props.todos);
    console.log(newHomework);
    let homework = newHomework;
    const id = Number(v.id.toString());
    const index = newHomework.findIndex((v) => v.id === id);
    if (v.field === "subject") {
      homework[index].subject = String(v.value);
      setNewHomework([...homework]);
    }
    if (v.field === "date") {
      homework[index]["date"] = new Date(String(v.value));
      setNewHomework([...homework]);
    }
    setUpdateID([id]);
  };

  const updateHomework = () => {
    if (updateID.length === 0) return;

    props.putHomework(newHomework, updateID);
  };

  return (
    <div style={{ height: 500, width: "100%" }}>
      <DataGrid
        rows={props.todos}
        columns={colums}
        checkboxSelection
        onCellEditCommit={chengeCell}
        onSelectionModelChange={(v) =>
          setHomeworkID([...v.map((v) => Number(v.toString()))])
        }
      />
      <Button variant="contained" color="warning" onClick={delRows}>
        delete
      </Button>
      <Button variant="contained" color="warning" onClick={updateHomework}>
        update
      </Button>
    </div>
  );
};
export default Table;
