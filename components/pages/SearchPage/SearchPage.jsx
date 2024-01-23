"use client";
import s from './SearchPage.module.scss';
import moment from "moment";
import {Spin, Table} from "antd";
import {useQuery} from "react-query";
import {API_URL} from "@/components/app/const";
import {useSearchParams} from "next/navigation";
import Link from "next/link";
export default function SearchPage(){
    const searchParams = useSearchParams()
    const search = searchParams.get('q')
    const {data, isSuccess} = useQuery(['search'], async ()=>{
        const response = await fetch(`${API_URL}search/?q=${search}`)
        return response.json()
    })
    const columns = [
        {
            title: 'Номер нотификации',
            dataIndex: 'notification_number',
            key: 'notification_number',
        },
        {
            title: 'Идентификатор',
            dataIndex: 'cryptographicmeans_id',
            key: 'cryptographicmeans_id',
        },
        {
            title: 'Наименование товара',
            dataIndex: 'cryptographicmeans_name',
            key: 'cryptographicmeans_name',
            render: (text, el) => {
                return(
                    <div className={s.cell_wrapper}><Link href={`/${el.url}`} target={'_blank'} onClick={(e)=>e.stopPropagation()}>{text.replaceAll('_x000D_', '\n')}</Link></div>
                )
            }
        },
        {
            title: 'Изготовитель товара',
            dataIndex: 'cryptographicmeans_manufacturer',
            key: 'cryptographicmeans_manufacturer',
            render: (text) => {
                return(
                    <div className={s.cell_wrapper}>{text.replaceAll('_x000D_', '\n')}</div>
                )
            }
        },
        {
            title: 'Срок действия',
            dataIndex: 'validity_period',
            key: 'validity_period',
            render: text => moment(text).isValid() ? moment(text).format('DD.MM.YYYY') : '—'
        },
        {
            title: 'Статус',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Дата аннулирования',
            dataIndex: 'cancellation_date',
            key: 'cancellation_date',
            render: text => moment(text).isValid() ? moment(text).format('DD.MM.YYYY') : '—'
        },
        {
            title: 'Дата регистрации',
            dataIndex: 'registration_date',
            key: 'registration_date',
            render: text => moment(text).isValid() ? moment(text).format('DD.MM.YYYY') : '—'
        },
        {
            title: 'Дата публикации нотификации',
            dataIndex: 'cryptographicmeans_publication_date',
            key: 'cryptographicmeans_publication_date',
            render: text => moment(text).isValid() ? moment(text).format('DD.MM.YYYY hh:mm') : '—'
        },
    ];
    return(
        <>
            <p className={s.mainHeader}>Результаты поиска по запросу "{search}"</p>
            <div className={s.search}>
                <div className={s.counters}>
                    <div className={s.counters_left}>
                        <p>Общее количество записей: <b>{data?.totalCount}</b></p>
                        <p>Найдено записей: <b>{data?.resultCount}</b></p>
                    </div>
                    <p>Дата последнего обновления: <b>{moment().format('DD.MM.YYYY')}</b></p>
                </div>
            </div>

                {isSuccess ? <div className="table-container-main"><Table
                    dataSource={data.results.map(el => {
                        el.cryptographicmeans_publication_date = moment( el.cryptographicmeans_publication_date ).format('DD.MM.YYYY HH:MM')
                        return el
                    })}
                    columns={columns}
                    rowKey="id"
                    pagination={false}
                    onRow={record => ({
                        onClick: () => window.open(`/${record.url}`, '_blank'),
                    })}
                /></div> : <div className={s.spinner}><Spin/></div>}

        </>
    )
}
