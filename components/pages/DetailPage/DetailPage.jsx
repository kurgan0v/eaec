"use client";
import {useQuery} from "react-query";
import {API_URL} from "@/components/app/const";
import {Button, Modal} from "antd";
import {useEffect, useState} from "react";
import {notFound, useSearchParams} from "next/navigation";
import moment from "moment";
import parse from 'html-react-parser';
import s from './DetailPage.module.scss';
import Image from 'next/image';
import RequestForm from "@/components/shared/RequestForm/RequestForm";
export default function DetailPage({params}){
    const number = params.id.split('_').pop();
    const searchParams = useSearchParams()
    const open = searchParams.get('open')
    const [modal, setModal] = useState(!!open);
    const {data: record, isSuccess} = useQuery(['detail', number], async ()=>{
        const response = await fetch(`${API_URL}${number}/`)
        return response.json()
    })
    const manufacturer = <p>{parse(record?.cryptographicmeans_manufacturer.replaceAll('_x000D_', '\n')
        .replace(/(\+[-0-9()\s]+)/gi, `<span class="blue">$1</span>`)
        .replace(/((https?:\/\/)?(www\.)?[@a-z0-9-]{3,256}\.[a-z0-9()]{2,6}\b([-a-z0-9./]*))/gi, `<span class="blue">$1</span>`) ?? ''
    )}</p>;
    const data = [
        {
            label: 'Номер нотификации',
            value: record?.notification_number,
        },
        {
            label: 'Наименование товара',
            value: record?.cryptographicmeans_name.replaceAll('_x000D_', '\n'),
        },
        {
            label: 'Изготовитель товара',
            value: manufacturer,
        },
        {
            label: 'Дата публикации нотификации',
            value: moment(record?.cryptographicmeans_publication_date).isValid() ? moment(record?.cryptographicmeans_publication_date).format('DD.MM.YYYY hh:mm') : '—',
        },

        {
            label: 'Номер нотификации',
            value: record?.notification_number,
        },
        {
            label: 'Наименование товара',
            value: record?.cryptographicmeans_name.replaceAll('_x000D_', '\n'),
        },
        {
            label: 'Наименование товара полное',
            value: record?.cryptographicmeans_name.replaceAll('_x000D_', '\n'),
        },
        {
            label: 'Изготовитель товара',
            value: manufacturer,
        },
        {
            label: 'Срок действия',
            value: moment(record?.validity_period).isValid() ? moment(record?.validity_period).format('DD.MM.YYYY') : '—',
        },
        {
            label: 'Статус',
            value: record?.status,
        },
        {
            label: 'Дата аннулирования',
            value: moment(record?.cancellation_date).isValid() ? moment(record?.cancellation_date).format('DD.MM.YYYY') : '—',
        },
        {
            label: 'Дата регистрации нотификации',
            value: moment(record?.registration_date).isValid() ? moment(record?.registration_date).format('DD.MM.YYYY') : '—',
        },
        {
            label: 'Идентификатор документа',
            value: <span className={'blue'}>{record?.cryptographicmeans_id}</span>,
        },
    ];
    return(
        <>
            {isSuccess && <div className={s.container}>
                <h1 className={s.title}>{record?.cryptographicmeans_name.replaceAll('_x000D_', '\n').split(',')[0]}</h1>
                {isSuccess && <>
                    <Image width={1300} height={1329} src={`/images/${record.url}.png`} className={s.notificationImage} alt={record.cryptographicmeans_name}/>
                    <div className={s.detailTitle}>
                        <p>Дата публикации: {record.full_date ? record.full_date : '—'}</p>
                        <div className={s.detailLinks}>
                            <a href={`/pdf/notifikatsija_${record.url}.pdf`} target={"_blank"} className={s.pdfLink}>Сохранить как PDF</a>
                            <Button onClick={()=>setModal(true)} type={'primary'} className={s.formBtn}>Заявить продукцию данного изготовителя</Button>
                        </div>
                    </div>
                    <div className={s.tableCustom}>
                        <div className={s.tableCustomRows}>
                            {data.map((el, i) => (
                                <div className={s.tableCustomRow} key={i}>
                                    <div className={s.tableCustomTd}>{el.label}</div>
                                    <div className={s.tableCustomTd}>{el.value}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <Button type="primary" onClick={()=>window.close()}>Закрыть вкладку</Button>

                    <Modal
                        open={modal}
                        onCancel={()=>setModal(false)}
                        title={'Внесение в Единый реестр нотификаций сведений о шифровальных (криптографических) средствах и товарах, их содержащих:'}
                        footer={null}
                        forceRender={true}
                    >
                        <RequestForm/>
                    </Modal>
                </>}

            </div>}

        </>
    )
}
