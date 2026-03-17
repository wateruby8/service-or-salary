// 2-1. 外包服務列表
import { useState,useEffect } from "react";
import { useLocation } from 'react-router-dom';
import axios from "axios";

import ServiceCardLg from "../components/ServiceCardLg";
import WorkerCardSkeleton from "../components/WorkerCardSkeleton";

export default function SellList(){
    const apiUrl =import.meta.env.VITE_API_URL;
    const [ taskData,setTaskData ] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    // 取得網址上的搜尋參數
    const location = useLocation();
    console.log('location',location);
    
    useEffect(()=>{
        (
            async()=>{
                setIsLoading(true);
                setIsError(false);
                try {
                    // -- 取得 URL 的 query string
                    const searchParams = location.search;
                    const res=await axios.get(`${apiUrl}/tasks${searchParams}`);
                    console.log('Task',res.data);
                    setTaskData(res.data);
                } catch (error) {
                    setIsError(true);
                } finally {
                    setIsLoading(false);
                }
            }
        )()
    },[location.search])
    return(
        <>
            <section>

            </section>
            <section className="container py-12 ">
                {
                    // 設定四種搜尋結果 
                    // 1.請求等待的骨架卡 2.請求失敗 3.查無結果 4.正常渲染
                    isLoading ? <WorkerCardSkeleton/> 
                     : (
                        isError ? (
                            <div className="bg-primary-100 py-14 rounded-3">
                                <p className="text-center">
                                    系統繁忙中，請稍後再搜尋
                                </p>
                            </div>
                        ) : (
                            taskData.length === 0 ? (
                                <div className="bg-primary-100 py-14 rounded-3">
                                    <p className="text-center">
                                        找不到符合條件的項目
                                    </p>
                                </div>
                                
                            ) :(
                                 <div className="row gy-3">
                                    <p className="text-secondary-500">
                                        找到了{taskData.length} 項案件
                                    </p>
                                    {
                                        taskData?.map(item =>(
                                            <div className="col-12" key={item.id}>
                                                <ServiceCardLg data={item} cardClass="h-100"/>
                                            </div>
                                        ))
                                    }
                                </div>
                            )
                        )
                     )  
                }
            </section>
        </>
    )
}