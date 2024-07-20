import {FC} from "react";


interface PayloadData{
    value: string;
    name: string
}

interface TooltipProps {
    active?: boolean,
    payload?: PayloadData[]
    label?: string;
}


export const SimpleTooltip : FC<TooltipProps> = ({ active, payload }) => {


    if (active && payload && payload.length) {
        return (
            <div className="custom_tooltip">
                <p className="label">{`${payload[0].name}`}</p>
            </div>
        );
    }

    return null;
};