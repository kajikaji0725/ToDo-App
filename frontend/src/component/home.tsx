import HttpGet from "./httpGet";
import HttpPost from "./httpPost";
import { ContextType, createContext, FC, useState } from "react";
import './../index.css'
import HttpDelete from "./httpDelete";
import HttpPut from "./httpPut";
import { HomeworkDetail } from "./interface";

export const Context = createContext({} as {
  array: HomeworkDetail[],
  setArray: React.Dispatch<React.SetStateAction<HomeworkDetail[]>>
});

const Home: FC = () => {
  const [array, setArray] = useState<HomeworkDetail[]>([]);
  // const arrayList = {
  //   array,
  //   setArray,
  // };
  return (
    <>
      <Context.Provider value={{ array, setArray }}>
        <div className="box">
          <HttpPost />
        </div>

        <div>
          <HttpGet />
        </div>

        <div>
          <HttpDelete />
        </div>

        <div className="box">
          <HttpPut />
        </div>
      </Context.Provider>
    </>

  )
};

export default Home;