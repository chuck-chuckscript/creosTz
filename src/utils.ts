import Api from "./api/Api.ts";
import {Designer, Issue, ShortInfoIssueDesigner, StatusStat, TopDesigner} from "./types.ts";
import moment from "moment/moment";





export const getTop = async  () : Promise<any[]> => {
    let top: any[] = [];
    for(let i = 1; i < 16; i++){


        const resData2  = await Api.getTopDesigners(i);
        top.push(...getChangedStatistic(resData2.results));
    }

    if(transformToTopDesigner(top)){
        let transformed = transformToTopDesigner(top);

        for (const key in transformed) {

            const issues = await Api.getMedianByName(transformed[key].username);
            transformed[key].avgTimeDone = takeAvgTimeDone(issues);

        }

        return transformed.sort((a,b) => {
            return a.avgTimeDone - b.avgTimeDone;
        });
    }



    return [];
}

 const getChangedStatistic = (array: Designer[]) => {

    let avg = array.reduce((acc, cur) => acc + cur.issues.length, 0) / array.length;
    let issues = array.filter(item => item.issues.length > avg);
    issues = issues.map(el => {
        el.issues = removeProcessIssues(el.issues)
        return el;
    });

    return issues;
}

const transformToTopDesigner = (array: Designer[]) : TopDesigner[] => {

    let sort =  array.map((el) => {
        const {avatar, username,issues} = el;
        return {avatar: avatar, username: username, avgTimeDone: 0, maxCountIssues: issues.length}
    });


    return sort.sort((a,b) => b.maxCountIssues - a.maxCountIssues).slice(0, 10);


}

const removeProcessIssues = (array: any[]) => {

    const doneIssues = [];
    for(const arrayElement of array) {
        if(arrayElement.status === 'Done'){
            doneIssues.push(arrayElement);
        }
    }
    return doneIssues;

}


export const takeAvgTimeDone = (array: ShortInfoIssueDesigner[]) => {
    let times = array.map(currentDesigner => {
        const {date_finished_by_designer, date_started_by_designer} = currentDesigner
        return {
            finished: new Date(date_finished_by_designer).getTime(),
            started: new Date(date_started_by_designer).getTime()
        };
    })
    let totalTimes : number[] = [];
    for(const time of times){
        totalTimes.push(moment(time.finished).diff(time.started, 'h'));
    }
    return mathMedian(totalTimes);

}


const mathMedian = (array: number[]) => {
    array = array.sort((a, b) => a - b);
    let avgIndex = Math.floor((array.length - 1) / 2);
    if(array.length % 2 == 1){
        return array[avgIndex];
    }
    return (array[avgIndex] + array[avgIndex + 1]) / 2
}

export interface Week{
    id: number
    count: number
    received: number
    profit: number
    consumption: number
    uv: number
}


export const watchStatisticStatusFromIssues = async () => {

    const response : string[] = await Api.getStatisticStatusFromIssues();

    const summaryCount = response.length;
    const doneCount = response.filter((item) => item === 'Done').length;
    const newCount = response.filter(item => item === 'New').length;
    const progressCount = response.filter(item => item === 'In Progress').length;

    const stat : StatusStat[] = [
        {
            name: 'Done',
            value: Math.floor((100 * doneCount) / summaryCount),
            color: 'green'
        },
        {
            name: 'New',
            value: Math.floor((100 * newCount) / summaryCount),
            color: '#36b0c0'
        },
        {
            name: 'In Progress',
            value: Math.floor((100 * progressCount) / summaryCount),
            color: '#c0a036'
        }
    ]

    return stat;
}

export const groupInWeek = (array: Issue[]) => {
    const weeks: Week[] = [];


    for (const issue of array) {
        const numberWeek = moment(issue.date_finished).week();

        const weekByNum = weeks.find(week => week.id === numberWeek);

        if(weekByNum){
            weekByNum.count += 1;
            weekByNum.received += issue.received_from_client;
            weekByNum.consumption += (issue.send_to_project_manager + issue.send_to_designer + issue.send_to_designer);
            weekByNum.profit = weekByNum.received - weekByNum.consumption;

            weekByNum.uv = weekByNum.profit
        }
        else{
            const consumption = issue.send_to_project_manager + issue.send_to_designer + issue.send_to_designer;
            const profit = issue.received_from_client - consumption;
            weeks.push({id: numberWeek, count: 1, received: issue.received_from_client, consumption: consumption, profit, uv: 0});
        }

    }
    return weeks.sort((a, b) => a.id - b.id);
}

