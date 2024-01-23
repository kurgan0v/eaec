"use client";
import {useEffect, useState} from "react";
import {useQuery} from "react-query";
import Search from "@/components/shared/Search/Search";
import {API_URL} from "@/components/app/const";
import {Pagination, Select, Spin, Table} from "antd";
import s from './MainPage.module.scss';
import moment from "moment";
import Link from "next/link";
import {useSearchParams} from "next/navigation";

export default function MainPage(){
    const searchParams = useSearchParams()
    const currentPage = searchParams.get('page') ? +searchParams.get('page') : 1;
    const [showCount, setShowCount] = useState(50);
    const {data, isSuccess} = useQuery([currentPage, showCount], async ()=>{
        const response = await fetch(`${API_URL}?page=${currentPage}&count=${showCount}`)
        return response.json()
    })
    const {Option} = Select;
    const PaginationWrapper = ({count})=>{
        return(
            <div className={s.pagination}>
                <Pagination
                    total={count}
                    pageSize={showCount}
                    current={currentPage}
                    showSizeChanger={false}
                    itemRender={(i, type, originalElement) => {
                        if(type === 'page'){
                            return <Link href={`?page=${i}`}>{i}</Link>
                        } else {
                            return originalElement
                        }
                    }}
                />
                <div className={s.sizeChanger}>
                    <p>Показывать по</p>
                    <Select value={showCount} onChange={setShowCount}>
                        <Option value={20}>20</Option>
                        <Option value={50}>50</Option>
                        <Option value={100}>100</Option>
                    </Select>
                </div>
            </div>
        )
    }
    const columns = [
        {
            title: 'Номер нотификации',
            dataIndex: 'NOTIFICATION_NUMBER',
            key: 'NOTIFICATION_NUMBER',

        },
        {
            title: 'Идентификатор',
            dataIndex: 'CRYPTOGRAPHICMEANS_ID',
            key: 'CRYPTOGRAPHICMEANS_ID',
        },
        {
            title: 'Наименование товара',
            dataIndex: 'CRYPTOGRAPHICMEANS_NAME',
            key: 'CRYPTOGRAPHICMEANS_NAME',
            render: (text, el) => {
                return(
                    <div className={s.cell_wrapper}><Link href={`/${el.URL}`} target={'_blank'} onClick={(e)=>e.stopPropagation()}>{text.replaceAll('_x000D_', '\n')}</Link></div>
                )
            }
        },
        {
            title: 'Изготовитель товара',
            dataIndex: 'CRYPTOGRAPHICMEANS_MANUFACTURER',
            key: 'CRYPTOGRAPHICMEANS_MANUFACTURER',
            render: (text) => {
                return(
                    <div className={s.cell_wrapper}>{text.replaceAll('_x000D_', '\n')}</div>
                )
            }
        },
        {
            title: 'Срок действия',
            dataIndex: 'VALIDITY_PERIOD',
            key: 'VALIDITY_PERIOD',
            render: text => moment(text).isValid() ? moment(text).format('DD.MM.YYYY') : '—'
        },
        {
            title: 'Статус',
            dataIndex: 'STATUS',
            key: 'STATUS',
        },
        {
            title: 'Дата аннулирования',
            dataIndex: 'CANCELLATION_DATE',
            key: 'CANCELLATION_DATE',
            render: text => moment(text).isValid() ? moment(text).format('DD.MM.YYYY') : '—'
        },
        {
            title: 'Дата регистрации нотификации',
            dataIndex: 'REGISTRATION_DATE',
            key: 'REGISTRATION_DATE',
            render: text => moment(text).isValid() ? moment(text).format('DD.MM.YYYY') : '—'
        },
        {
            title: 'Дата публикации нотификации',
            dataIndex: 'CRYPTOGRAPHICMEANS_PUBLICATION_DATE',
            key: 'CRYPTOGRAPHICMEANS_PUBLICATION_DATE',
            render: text => moment(text).isValid() ? moment(text).format('DD.MM.YYYY hh:mm') : '—'
        },
    ];
    return(
        <>
            <Search total={data?.totalCount} result={data?.resultCount}/>

            {isSuccess ? <>
                <PaginationWrapper count={data?.resultCount}/>
                <div className={'table-container-main'}>
                <Table
                    dataSource={data.results.map(el => {
                        el.CRYPTOGRAPHICMEANS_PUBLICATION_DATE = moment(el.CRYPTOGRAPHICMEANS_PUBLICATION_DATE).format('DD.MM.YYYY HH:MM')
                        return el
                    })}
                    columns={columns}
                    rowKey="id"
                    pagination={false}
                    onRow={record => ({
                        onClick: () => window.open(`/${record.URL}`, '_blank'),
                    })}
                />
            </div>
                <PaginationWrapper count={data?.resultCount}/>
                </>: <div className={s.spinner}><Spin/></div>}

        </>
    )
}
