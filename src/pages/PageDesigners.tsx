import { useAppSelector } from "@/Store/hooks"
import Api from "@/api/Api"
import { Header } from "@/components/Header/Header"
import { Button } from "@/components/UI/Button/Button"
import { Loader } from "@/components/UI/Loader/Loader"
import { Designer } from "@/types"

import {useEffect, useState, useMemo} from 'react'

export const PageDesigners = () => {
    const {mode} = useAppSelector(state => state.theme)
    const [page, setPages] = useState<number>(1);
    const [sort, setSort] = useState<string>('');
    const [data, setData] = useState<Designer[]>([])
    const [loading, setLoading] = useState<boolean>(false);
   
    const {lang} = useAppSelector(state => state.lang)
    useEffect(() => {
        (async() => {
            setLoading(true)
            let response = await Api.getTopDesigners(page);
            console.log(response.results)
            setData([...response.results])
            setLoading(false)
        })()
    }, [page])

    const designersList = useMemo(() => {
        if(sort === 'username'){
            return data.sort((a,b) => a.username.localeCompare(b.username)).map(designer => <tr>
                <td className="designersTab_name"><img src={designer.avatar}/>{designer.username}</td>
                <td>{designer.email}</td>
                <td>{designer.issues.filter(issue => issue.date_finished_by_designer).length}</td>
                <td>{designer.issues.filter(issue => !issue.date_finished_by_designer).length}</td>
            </tr>)
        }

        if(sort === 'email'){
            return data.sort((a,b) => a.email.localeCompare(b.email)).map(designer => <tr>
                <td className="designersTab_name"><img src={designer.avatar}/>{designer.username}</td>
                <td>{designer.email}</td>
                <td>{designer.issues.filter(issue => issue.date_finished_by_designer).length}</td>
                <td>{designer.issues.filter(issue => !issue.date_finished_by_designer).length}</td>
            </tr>)
        }

        return data.map(designer => <tr>
            <td className="designersTab_name"><img src={designer.avatar}/>{designer.username}</td>
            <td>{designer.email}</td>
            <td>{designer.issues.filter(issue => issue.date_finished_by_designer).length}</td>
            <td>{designer.issues.filter(issue => !issue.date_finished_by_designer).length}</td>
        </tr>)

    }, [sort, data])

    return (
        <div className={['page', mode === 'light' ? 'light' : 'dark'].join(' ')}>
            <Header/>
            <main className={mode === 'dark' ? 'dark' : 'light'}>
                
                <div className="selectMenu">
                    <select  value={sort} onChange={(e) => setSort(e.target.value)}>
                        <option disabled value={''}>{lang === 'ru' ? 'Сортировка по' : 'Sort by'}</option>

                        <option value={'email'}>{lang === 'ru' ? 'По почте' : 'By email'}</option>
                        <option value={'username'}>{lang === 'ru' ? 'По имени' : 'By name'}</option>
                    </select>


                    <div className="pagination">
                   
                   
                        {page > 2 && <Button onClick={() => setPages(page - 2)} variant="icon">{page - 2}</Button>}
                        {page > 1 && <Button onClick={() => setPages(page - 1)} variant="icon">{page - 1}</Button>}

                        <Button className={'select'} onClick={() => setPages(page)} variant="icon">{page}</Button>
                        <Button onClick={() => setPages(page + 1)} variant="icon">{page + 1}</Button>
                        <Button onClick={() => setPages(page + 2)} variant="icon">{page + 2}</Button>
                    </div>
                </div>
                
                {
                    loading 
                        ? <Loader/> 
                        :
<table className="designersTab">
                    <thead>
                        <tr>
                            <th>{lang === 'ru' ? 'Имя' : 'Name'}</th>
                            <th>{lang === 'ru' ? 'Почта' : 'Email'}</th>
                            <th>{lang === 'ru' ? 'Решенные задачи' : 'Done Issues'}</th>
                            <th>{lang === 'ru' ? 'Задачи в процессе' : 'Issues In Process'}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {designersList}
                    </tbody>
                </table>

                }
                

                
            </main>
        </div>
    )
}