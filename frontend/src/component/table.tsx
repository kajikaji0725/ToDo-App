import { HomeWorkTwoTone } from "@mui/icons-material";
import { DataGrid, GridColDef, GridRowProps, GridRowsProp } from "@mui/x-data-grid"
import { useState, VFC } from "react"
import { Homework } from "../model/interface"

const Table = (props: { todos: Homework[], flag: boolean }): JSX.Element => {

    type row = {
      id : number;
      subject: string;
      date: Date;
    }

    const createRow = (todo: Homework) => {
      return {id: todo.id, subject: todo.subject, date: todo.date};
    }

    const [rows, setRows] = useState<row[]>([]);

    const colums: GridColDef[] = [
      { field: 'id', headerName: 'ID',width: 90},
      {field: 'subject', headerName: 'Subject',width: 150, editable: true},
      {field: 'date', headerName: 'Date', width: 150, editable: true},
    ];
    
    const homeworkRows = (): GridRowsProp  => {
      if(Array.isArray(props.todos)){
      for (const homework of props.todos){
        if(rows.findIndex((arr) => arr.id === homework.id) !== -1){
        const row = createRow(homework);
        setRows([row]);
        }
      }
    }else{
      const row = createRow(props.todos);
      setRows([row]);
    }
      return rows
    }

    return  (
        <div style={{ height: 520, width:'100% '}}>
        <DataGrid rows={homeworkRows()} columns={colums} />
      </div>
    )
}
export default Table