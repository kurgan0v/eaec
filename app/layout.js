
import './globals.css'
import Header from "@/components/shared/Header/Header";
import QueryProvider from "@/components/app/QueryProvider/QueryProvider";
import Footer from "@/components/shared/Footer/Footer";
import Script from "next/script";


export const metadata = {
  title: 'ЕАЭС | Реестр нотификаций о характеристиках шифровальных (криптографических) средств и товаров, их содержащих',
  description: 'Реестр нотификаций о характеристиках шифровальных (криптографических) средств и товаров, их содержащих',
  keywords: ''
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
          <link rel="icon" href="/favicon.ico" sizes="any" />
          <meta name="yandex-verification" content="2870fc56325767b9" />
          <meta name="google-site-verification" content="5ATvaaJw1Md1iCSgClcPpN12jgDJME3dil8czep3Agg" />

      </head>
      <body>

        <QueryProvider>
        <main>
          <Header/>
            {children}
          <Footer/>
        </main>
        </QueryProvider>
      </body>
    </html>
  )
}
