import {FC} from 'react';
import {useAppSelector} from "../../Store/hooks.ts";

interface TopDesignerCardProps{
    username: string
    avatar: string
    avgTimeDone: number
    maxCountIssues: number
}

export const TopDesignerCard : FC<TopDesignerCardProps> = ({username, avatar, avgTimeDone, maxCountIssues}) => {
    const {lang} = useAppSelector(state => state.lang)

    return (
        <div className={'topDesigner'}>
            <img className={'topDesigner__avatar'} alt={username} src={avatar}/>
            <h3 className={'topDesigner__name'}>{username}</h3>
            <h5>{lang === 'en' ? 'Average Time' : 'Среднее время выполнения задачи:'}<br/>{Math.round(avgTimeDone)} {lang === 'en' ? 'h': 'ч.'}</h5>
            <h5>{lang === 'en' ? 'Total Completed' : 'Всего выполнено:'}<br/>{maxCountIssues}</h5>
        </div>
    );
};

