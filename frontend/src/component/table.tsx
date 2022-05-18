import { DataGrid, GridColDef, GridSelectionModel } from "@mui/x-data-grid"
import { Button } from "@mui/material";
import { Homework } from "../model/interface"
import { useRef, useState } from "react";

const Table = (props: {
  todos: Homework[];
  deleteHomework: (homeworkID: number[]) => void;
}): JSX.Element => {

  const [homeworkID, setHomeworkID] = useState<number[]>([]);

  const colums: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'subject', headerName: 'Subject', width: 150, editable: true },
    { field: 'date', headerName: 'Date', width: 250, editable: true },
  ];

  const delRows = () => {
    console.log(homeworkID);
    if (homeworkID.length == 0) return;
    props.deleteHomework(homeworkID);
  }

  return (
    <div style={{ height: 500, width: '100%' }}>
      <DataGrid rows={props.todos} columns={colums} checkboxSelection onSelectionModelChange={(v) => setHomeworkID([...v.map((v) => Number(v.toString()))])} />
      <Button variant="contained" color='warning' onClick={delRows}>delete</Button>
    </div>
  )
}
export default Table