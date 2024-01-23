"use client";
import Link from "next/link";
import Image from "next/image";
import s from './Header.module.scss';
import 'moment/locale/ru';
import moment from "moment";
moment().locale('ru');
export default function Header(){
    return(
        <div className={s.wrapper}>
            <div className={s.header}>
                <Link href="/">
                    <Image src="/logo.svg" width={340} height={52} alt="Логотип" className={s.logo} />
                </Link>
                <div className={s.datetime}>
                    <b>Сегодня</b> <br></br>
                    <span>{moment().format('DD MMMM YYYY г., dddd')}</span>
                </div>

            </div>
            <p className={s.mainHeader}>
                <Image width={8} height={16} src={'/arrow.png'} className={s.arrow} alt={''}/>
                Реестр нотификаций о характеристиках шифровальных (криптографических) средств и товаров, их содержащих
            </p>
        </div>
    )
}
