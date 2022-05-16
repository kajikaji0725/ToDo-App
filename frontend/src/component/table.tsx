import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { Homework } from "../model/interface"

const Table = (props: { todos: Homework[] }): JSX.Element => {

  type row = {
    id: number;
    subject: string;
    date: Date;
  }

  const colums: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'subject', headerName: 'Subject', width: 150, editable: true },
    { field: 'date', headerName: 'Date', width: 150, editable: true },
  ];

  return (
    <div style={{ height:500, width: '100%' }}>
      <DataGrid rows={props.todos} columns={colums}/>
    </div>
  )
}
export default Table