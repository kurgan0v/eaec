"use client";
import s from './Search.module.scss';
import {Button, Input} from "antd";
import moment from "moment";
import {useRouter} from "next/navigation";
import {useState} from "react";

export default function Search({total, result}){
    const [searchQuery, setSearchQuery] = useState('');
    const {push} = useRouter();
    return(
        <div className={s.search}>
            <div className={s.searchField}>
                <b>Найти во всех записях:</b>
                <Input
                    className={s.searchInput}
                    style={{ width: '100%' }}
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                />
                <Button type="primary" onClick={()=>push(`/search?q=${searchQuery}`)} className={s.searchButton}>
                    Найти
                </Button>
            </div>
            <div className={s.counters}>
                <div className={s.counters_left}>
                    <p>Общее количество записей: <b>{total}</b></p>
                    <p>Найдено записей: <b>{result}</b></p>
                </div>
                <p>Дата последнего обновления: <b>{moment().format('DD.MM.YYYY')}</b></p>
            </div>
        </div>
    )
}
