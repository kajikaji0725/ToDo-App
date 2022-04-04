import HttpGet from "./httpGet";
import HttpPost from "./httpPost";
import { useState } from "react";
import './../index.css'
import HttpDelete from "./httpDelete";
import HttpPut from "./httpPut";
import { HomeworkDetail } from "./interface";



const Home: React.VFC = () => {
  const onRequested = (newArray: HomeworkDetail[]) => {
    setArray([...newArray]);  // newArray を渡すと state が更新されない(詳しい説明は忘れたけど、調べればすぐ出てくると思う)
  }
  const [array, setArray] = useState<HomeworkDetail[]>([]);
  return (
    <>
      <div className="box">
        <HttpPost />
      </div>

      <div>
        <HttpGet array={array} onRequested={onRequested} />
      </div>

      <div>
        <HttpDelete array={array} onRequested={onRequested} />
      </div>

      <div className="box">
        <HttpPut array={array} onRequested={onRequested} />
      </div>
    </>

  )
};

export default Home;