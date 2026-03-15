// 2-1. 外包服務列表
import { useState,useEffect } from "react";
import WorkerCard from "../components/WorkerCard";
import axios from "axios";
export default function SellList(){
    const apiUrl =import.meta.env.VITE_API_URL;
    const [ workerData,setWorkerData ] = useState([]);
    useEffect(()=>{
        (
            async()=>{
                try {
                    const res=await axios.get(`${apiUrl}/users`);
                    console.log('worker',res.data);
                    setWorkerData(res.data);
                } catch (error) {
                    
                }
            }
        )()
    },[])
    return(
        <div>
            <div className="container">
                <div className="row">
                    {
                        workerData.map(item =>(
                            <div className="col-3" key={item.id}>
                                <WorkerCard data={item} cardClass="h-100"/>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}