import { DataGrid, GridCellEditCommitParams, GridColDef, GridSelectionModel, GridValueFormatterParams } from "@mui/x-data-grid"
import { Button } from "@mui/material";
import { Homework } from "../model/interface"
import { useRef, useState } from "react";
import moment from "moment";

const Table = (props: {
  todos: Homework[];
  deleteHomework: (homeworkID: number[]) => void;
  putHomework: (newHomework:Homework) => void;
}): JSX.Element => {

  const dateFormat = (v:GridValueFormatterParams) => {
    return moment(v.value).format('YYYY-MM-DD HH:mm');
  }

  const [homeworkID, setHomeworkID] = useState<number[]>([]);
  
  const[newSubject, setNewSubject] = useState<Map<number,string>>(
    new Map<number,string>()
  );
  const[newDate, setNewDate] = useState<Map<number,Date>>();

  const colums: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'subject', headerName: 'Subject', width: 150, editable: true },
    { field: 'date', headerName: 'Date', width: 250, editable: true , valueFormatter: dateFormat},
  ];

  const delRows = () => {
    console.log(homeworkID);
    if (homeworkID.length == 0) return;
    props.deleteHomework(homeworkID);
  }

  const chengeCell = (v:GridCellEditCommitParams) => {
    if(v.field === "subject"){
      console.log(v.value);
      console.log(Number(v.id));
      const map = new Map<number,string>();
      map.set(Number(v.id.toString()),v.value);
      setNewSubject(map);
      console.log(map);
      console.log(newSubject);
    }
    if(v.field === "date"){
      setNewDate(newDate?.set(Number(v.id.toString), new Date(v.value.toString)));
    }
  }

  const updateHomework = () => {
    if(newSubject?.size === undefined && newDate?.size === undefined) return;
    
    const homework = new Map<number,Homework>();
    
    if(newSubject?.size !== undefined){
      for(const key of Object.keys(newSubject)){
        console.log(key);
      }
    }
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