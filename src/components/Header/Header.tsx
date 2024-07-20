import {Button} from "../UI/Button/Button.tsx";
import {useAppSelector} from "@/Store/hooks.ts";
import {PiMoonLight} from "react-icons/pi";
import {BiHome, BiSun} from "react-icons/bi";
import {changeTheme} from "@/Store/slices/themeControl.ts";
import {useDispatch} from "react-redux";
import {changeLang} from "@/Store/slices/langControl.ts";
import {useNavigate} from "react-router-dom";
import moment from "moment/moment";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import { BsXLg } from "react-icons/bs";

export const Header = () => {


    const {mode} = useAppSelector(state => state.theme);
    const {lang} = useAppSelector(state => state.lang);
    const [isOpen, setOpen] = useState<boolean>(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const replaceTheme = () => {
       dispatch( changeTheme(mode === 'dark' ? 'light' : 'dark'));
    }

    const replaceLang = () => {
        dispatch(changeLang(lang === 'en' ? 'ru' : 'en'));
    }
    return (
        <header className={'header'}>
            <h2 className="header__title">{lang === 'en' ? 'Work Week' : 'Рабочая Неделя'}: {moment().week()}</h2>
            <div className={['header__menu_btn', isOpen ? 'open' : ''].join(' ')}>
                <Button onClick={() => navigate('/designers')} variant={'default'}>{lang === 'en' ? 'Designers' : 'Дизайнеры'}</Button>
                <Button onClick={() => navigate('/issues')} variant={'default'}>{lang === 'en' ? 'Issues' : 'Задачи'}</Button>
                <Button onClick={() => navigate('/')} variant={'icon'}><BiHome/></Button>
                <Button className={'param'} variant={'icon'} onClick={replaceTheme}>{mode === 'light' ? <PiMoonLight/> : <BiSun/> }</Button>
                <Button className={'param'} onClick={replaceLang} variant={'icon'}>{lang === 'en' ? 'Ru' : 'En'}</Button>
            </div>

            <Button onClick={() => setOpen(!isOpen)} className={"burger"} variant="icon">{isOpen ? <BsXLg/> : <GiHamburgerMenu/>}</Button>
        </header>
    );
};

