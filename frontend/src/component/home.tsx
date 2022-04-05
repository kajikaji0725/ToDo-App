import HttpGet from "./httpGet";
import HttpPost from "./httpPost";
import { ContextType, createContext, FC, useState } from "react";
import './../index.css'
import HttpDelete from "./httpDelete";
import HttpPut from "./httpPut";
import { HomeworkDetail } from "./interface";


const Home: FC = () => {
  const [array, setArray] = useState<HomeworkDetail[]>([]);

  const onRequested = (newArray:HomeworkDetail[]) => {
    setArray([...newArray]);
  }
 
  return (
    <>
        <div className="box">
          <HttpPost />
        </div>

        <div>
          <HttpGet array={array} onRequested={onRequested}/>
        </div>

        <div>
          <HttpDelete array={array} onRequested={onRequested}/>
        </div>

        <div className="box">
          <HttpPut array={array} onRequested={onRequested}/>
        </div>
    </>

  )
};

export default Home;