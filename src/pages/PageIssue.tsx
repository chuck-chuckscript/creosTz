
import {useAppSelector} from "../Store/hooks.ts";
import {Header} from "../components/Header/Header.tsx";
import {useEffect, useMemo, useState} from "react";
import Api from "../api/Api.ts";
import {
    Bar,
    BarChart, CartesianGrid, Cell, Legend, Pie, PieChart,
    ResponsiveContainer, Tooltip, XAxis, YAxis

} from "recharts";
import {Issue, StatusStat} from "../types.ts";

import {groupInWeek, watchStatisticStatusFromIssues, Week} from "../utils.ts";

import { SimpleTooltip } from "../CustomGraphComponent/SimpleTooltip.tsx";
import { CustomTooltip } from "../CustomGraphComponent/CutstomTooltip.tsx";

import { Loader } from "../components/UI/Loader/Loader.tsx";
const PageIssue = () => {
    const {mode} = useAppSelector(state => state.theme);
    const {lang} = useAppSelector(state => state.lang);
    
    const [data, setData] = useState<Week[]>([]);
    const [filter, setFilter] = useState<number>(8);

    const [staticStatus, setStaticStatus] = useState<StatusStat[]>([]);

    const [loading, setLoading] = useState<boolean>(false);
    useEffect(() => {
        (async () => {

           setLoading(true);
           let response : Issue[] = await Api.getIssuesFromMonth();


            setData([...groupInWeek([...response])]);

            let statusStat = await watchStatisticStatusFromIssues();

            setStaticStatus([...statusStat]);

            setLoading(false);
        })()
    }, []);


    const weeksWatch = useMemo(() => {

        if(filter){
            return data.slice(0, filter);
        }
        return data.slice(0, 8);
    }, [filter, data])


    return (
        <div className={['page', mode === 'light' ? 'light' : 'dark'].join(' ')}>
            <Header/>
            <main className={mode === 'dark' ? 'dark' : 'light'}>

                <div className={mode === 'dark' ? 'selectMenu dark' : 'selectMenu light'}>
                    <h3>{lang === 'ru' ? 'Кол-во недель: ' : 'Weeks count: '}</h3>
                    <select value={filter} onChange={(event) => setFilter(+event.target.value)}>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => <option key={item} value={item}>{item}</option>)}
                    </select>
                </div>
                <h2 style={{textAlign: 'center'}}>{lang === 'ru' ? 'Статистика выполненных задач' : 'Statistic done issues'}</h2>
                {loading && <Loader/>}
                 <ResponsiveContainer className={'weekStat'} width={'90%'} height={400}>
                   <BarChart dataKey={"week"} data={weeksWatch}
                              width={1000}
                              height={400}
                              title={'1'}
                    > 
                        <CartesianGrid strokeDasharray={'3 3'}/>
                        <XAxis dataKey={"id"}/>
                        <YAxis dataKey={"profit"}/>
                        <YAxis dataKey={"consumption"}/>
                        <Tooltip content={<CustomTooltip/>}/>

                         <Legend/>
                          <Bar dataKey={"profit"} fill="#82ca9d"/>
                          <Bar dataKey={"consumption"} fill="red"/>
                           <Bar dataKey={"received"} fill="#5a5ba4"/>

                   </BarChart>
                </ResponsiveContainer>

                <h2 style={{textAlign: 'center'}}>{lang === 'ru' ? 'Статистика статусов задач' : 'Statistic status issues'}</h2>
                <ResponsiveContainer  width={'100%'} height={250}>
                    
                    <PieChart width={220} height={220}>
                        <Pie
                            data={staticStatus}
                            cx={'50%'}
                            cy={'50%'}
                            label
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {staticStatus.map((entry, index) => {
                                console.log(entry)
                                return <Cell fill={entry.color} key={`cell-${index}`}/>
                            })}
                            
                        </Pie>
                        <Tooltip content={<SimpleTooltip/>}/>
                    </PieChart>
                </ResponsiveContainer>

            </main>
        </div>
    )
};

export default PageIssue;