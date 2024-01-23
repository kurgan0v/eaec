"use client";
import {QueryClient, QueryClientProvider} from "react-query";
import {ConfigProvider} from 'antd';
import ruRu from "antd/locale/ru_RU";
import Script from "next/script";

export default function QueryProvider({children}) {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
            },
        },
    })

    return (
        <ConfigProvider locale={ruRu}>
            <Script id="metrika-counter" strategy={'afterInteractive'} on={()=>{
                if(window && document){
                    (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                        m[i].l=1*new Date();
                        for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
                    (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

                    ym(96197378, "init", {
                        clickmap:true,
                        trackLinks:true,
                        accurateTrackBounce:true,
                        webvisor:true
                    });
                }
            }}>
            </Script>
            <img src="https://mc.yandex.ru/watch/96197378" style={{position: 'absolute', left: -9999}} alt="" />
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </ConfigProvider>
    )
}
