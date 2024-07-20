import {FC} from 'react';
import moment from "moment/moment";


interface CommentProps {
    username: string
    avatar: string
    message: string
    issue: string
    date: string
}
const format = (date: string) => {

    const formatter = moment(date);
    formatter.locale('ru');
    return formatter.fromNow();
}

export const CommentCard : FC<CommentProps> = ({username, avatar, issue, message, date}) => {
    return (
        <div className={'comment'}>
            <img className={'comment__avatar'} src={avatar} alt={username}/>
            <h5 className={'comment__username'}>{username}</h5>
            <span className={'comment__issue'}>#issue {issue}</span>
            <h6 className={'comment__date'}>{format(date)}</h6>
            <pre className={'comment__message'}>{message}</pre>

        </div>
    );
};

