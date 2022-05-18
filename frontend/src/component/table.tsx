import { DataGrid, GridColDef, GridSelectionModel } from "@mui/x-data-grid"
import { Button } from "@mui/material";
import { Homework } from "../model/interface"
import { useRef } from "react";

const Table = (props: {
  todos: Homework[];
  deleteHomework: (homeworkID: number[]) => void;
}): JSX.Element => {

  let HomeworkID: number[] = [];

  const colums: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'subject', headerName: 'Subject', width: 150, editable: true },
    { field: 'date', headerName: 'Date', width: 150, editable: true },
  ];

  const delRows = () => {
    console.log(HomeworkID);
    if (HomeworkID.length == 0) return;
    props.deleteHomework(HomeworkID);
    HomeworkID.splice(0) //配列を初期化
  }

  return (
    <div style={{ height: 500, width: '100%' }}>
      <DataGrid rows={props.todos} columns={colums} checkboxSelection onSelectionModelChange={(v) => HomeworkID.push(Number(v))} />
      <Button variant="contained" color='warning' onClick={delRows}>delete</Button>
    </div>
  )
}
export default Table