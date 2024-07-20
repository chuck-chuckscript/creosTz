import {useEffect, useState} from 'react';
import {Comment} from "../../types.ts";
import {CommentCard} from "./CommentCard.tsx";
import Api from "../../api/Api.ts";
import {useAppSelector} from "../../Store/hooks.ts";

export const CommentList = () => {

    const {lang} = useAppSelector(state => state.lang);
    const [data, setData] = useState<Comment[]>([]);
    useEffect(() => {
        (async () => {
            try {
                const resData : Comment[] = await Api.getComments();


                setData(resData);

            }
            catch (err){
                console.log(err)
            }
        })()
    }, []);
    if(data.length > 0){
        return <div className="commentList">
            <h1>{lang === 'en' ? 'Last Comments' : 'Последние комментарии'}</h1>
            {data.map(item =>
                <CommentCard
                    key={item.id}
                    username={item.designer.username}
                    avatar={item.designer.avatar}
                    message={item.message}
                    issue={item.issue} date={item.date_created}/>)
            }
        </div>
    }

    return null;
};