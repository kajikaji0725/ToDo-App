import HttpGet from "./httpGet";
import HttpPost from "./httpPost";
import { FC } from "react";
import './../index.css'
import HttpDelete from "./httpDelete";
import HttpPut from "./httpPut";

const Home: FC = () => {
  return (
    <>
      <div className="box">
        <HttpPost />
      </div>

      <div>
        <HttpGet />
      </div>

      <div>
        <HttpDelete />
      </div>
      
      <div>
        <HttpPut />
      </div>
    </>
  )
};

export default Home;