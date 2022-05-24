import { DataGrid, GridCellEditCommitParams, GridColDef, GridSelectionModel, GridValueFormatterParams } from "@mui/x-data-grid"
import { Button } from "@mui/material";
import { Homework } from "../model/interface"
import { useRef, useState } from "react";
import moment from "moment";

const Table = (props: {
  todos: Homework[];
  deleteHomework: (homeworkID: number[]) => void;
  putHomework: (subject: Map<number, string>, date: Map<number, Date>) => void;
}): JSX.Element => {

  const dateFormat = (v: GridValueFormatterParams) => {
    return moment(v.value).format('YYYY-MM-DD HH:mm');
  }

  const [homeworkID, setHomeworkID] = useState<number[]>([]);

  const [newSubject, setNewSubject] = useState<Map<number, string>>(
    new Map<number, string>()
  );
  const [newDate, setNewDate] = useState<Map<number, Date>>(
    new Map<number, Date>()
  );

  const colums: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'subject', headerName: 'Subject', width: 150, editable: true },
    { field: 'date', headerName: 'Date', width: 250, editable: true, valueFormatter: dateFormat },
  ];

  const delRows = () => {
    console.log(homeworkID);
    if (homeworkID.length == 0) return;
    props.deleteHomework(homeworkID);
  }

  const chengeCell = (v: GridCellEditCommitParams) => {
    const id = Number(v.id.toString());
    if (v.field === "subject") {
      const mapSubject = new Map<number, string>();
      mapSubject.set(id, v.value);
      setNewSubject(mapSubject);
    }
    if (v.field === "date") {
      const date = new Date(v.value);
      const mapDate = new Map<number, Date>();
      mapDate.set(id, date);
      setNewDate(mapDate);
    }
  }

  const updateHomework = () => {
    if (newSubject.size === 0 && newDate.size === 0) return;

    props.putHomework(newSubject, newDate);
  }


  return (
    <div style={{ height: 500, width: '100%' }}>
      <DataGrid rows={props.todos} columns={colums} checkboxSelection onCellEditCommit={chengeCell} onSelectionModelChange={(v) => setHomeworkID([...v.map((v) => Number(v.toString()))])} />
      <Button variant="contained" color='warning' onClick={delRows}>delete</Button>
      <Button variant="contained" color="warning" onClick={updateHomework}>update</Button>
    </div>
  )
}
export default Table