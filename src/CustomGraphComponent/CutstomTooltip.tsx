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


export const CustomTooltip : FC<TooltipProps> = ({ active, payload, label }) => {


    if (active && payload && payload.length) {
        return (
            <div className="custom_tooltip">
                <p className="label">Week {`${label}`}</p>
                <p>{`${payload[0].name} : ${payload[0].value}`}</p>
                <p>{`${payload[1].name} : ${payload[1].value}`}</p>
                <p>{`${payload[2].name} : ${payload[2].value}`}</p>
            </div>
        );
    }

    return null;
};