import {useEffect, useState} from 'react';
import {Loader} from "../UI/Loader/Loader.tsx";
import {TopDesigner} from "../../types.ts";

import {getTop} from "../../utils.ts";
import {Swiper, SwiperSlide} from "swiper/react";
import 'swiper/css';
import 'swiper/css/pagination'
import {SwiperOptions} from "swiper/types";
import {useAppSelector} from "../../Store/hooks.ts";
import {TopDesignerCard} from "./TopDesignerCard.tsx";
import {Pagination} from "swiper/modules";

const breakPoints : SwiperOptions['breakpoints'] = {
    320: {
        slidesPerView: 1,
        spaceBetween: 0
    },
    568: {
        slidesPerView: 2,
        spaceBetween: 5
    },
    1000: {
        slidesPerView: 3,
        spaceBetween: 10
    },

}
const TopDesigners = () => {
    
    const {lang} = useAppSelector(state => state.lang);
    const [top, setTop] = useState<TopDesigner[]>([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const statistic : any[] = await getTop();
                setTop([...statistic]);
                setLoading(false);

            }
            catch (err){
                console.log(err)
            }
        })()
    }, []);
    return (
        <div className={'topDesignerWrapper'}>
            {loading && <Loader/>}

            {top.length > 0 &&
                <>
                    <h1>{lang === 'en' ? 'Top 10 Designers' : 'Топ 10 Дизайнеров'}</h1>
                    <Swiper
                        modules={[Pagination]}
                        pagination
                        breakpoints={breakPoints}
                    >
                        {
                            top.map((el, index) =>
                                <SwiperSlide key={index}>
                                    <TopDesignerCard  username={el.username} avatar={el.avatar} avgTimeDone={el.avgTimeDone} maxCountIssues={el.maxCountIssues}/>
                                </SwiperSlide>)
                        }
                    </Swiper>
                </>
            }



        </div>
    );
};

export default TopDesigners;