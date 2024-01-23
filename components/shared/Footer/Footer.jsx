"use client";
import s from './Footer.module.scss';
import {useEffect, useState} from "react";
import Link from "next/link";
import Image from "next/image";
import moment from "moment";

export default function Footer(){
    const [showEmail, setShowEmail] = useState(false);
    const firstEmail = "request";
    const secondEmail = "eaeregistry.org";
    useEffect(() => {
        setTimeout(()=>{
            setShowEmail(true)
        }, 1000)
    }, []);
    return (
        <div className={s.footer}>
            <Link href="/">Вернуться на главную</Link>
            <hr className={s.divider} />
            <div className={s.copyright}>
                <div>
                    <p>Евразийский Экономический Союз, {moment().format('YYYY')}</p>
                    <a href="https://eaeregistry.org">eaeregistry.org</a>
                    <Image width={144} height={37} src="/logo_bottom.svg" alt="Логотип" className={s.logo} />
                </div>
                {showEmail && <a href={"mailto:"+firstEmail+"@"+secondEmail}>{firstEmail+"@"+secondEmail}</a>}
            </div>
        </div>
    );
}
