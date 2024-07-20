import {FC, MouseEventHandler, ReactNode} from 'react';
import style from './button.module.scss';
import {useAppSelector} from "../../../Store/hooks.ts";


type StyleVariant = 'default' | 'icon' | 'unstyled';


interface ButtonProps {
    className?: string;
    variant?: StyleVariant
    onClick?: MouseEventHandler<HTMLButtonElement>
    children?: ReactNode;
}

export const Button : FC<ButtonProps> = ({className ,onClick, variant = 'default', children}) => {
    const {mode} = useAppSelector(state => state.theme)

    if(variant === 'icon') {
        return (
            <button className={[style.icon, mode === 'light' ? style.light : style.dark, className].join(' ')} onClick={onClick}>
                {children}
            </button>
        );
    }
    if(variant === 'default') {
        return (
            <button className={[className, style.button, mode === 'light' ? style.light : style.dark].join(' ')} onClick={onClick}>
                {children}
            </button>
        );
    }
    return (
        <button className={className} onClick={onClick}>
            {children}
        </button>
    );
};

