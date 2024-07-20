import {useAppSelector} from "../Store/hooks.ts";
import {Header} from "../components/Header/Header.tsx";
import TopDesigners from "../components/TopDesigner/TopDesigners.tsx";
import {CommentList} from "../components/Comment/CommentList.tsx";


const HomePage = () => {
    const {mode} = useAppSelector(state => state.theme);
    return (
        <div className={['page', mode === 'light' ? 'light' : 'dark'].join(' ')}>
            <Header/>
            <main className={mode === 'dark' ? 'dark' : 'light'}>
                <TopDesigners/>
                <CommentList/>
            </main>
        </div>
    )
};

export default HomePage;