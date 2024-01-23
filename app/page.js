import MainPage from "@/components/pages/MainPage/MainPage";

export function generateMetadata({searchParams}){
  return({
    title: `ЕАЭС | Реестр нотификаций о характеристиках шифровальных (криптографических) средств и товаров, их содержащих - Страница ${searchParams.page ?? 1}`,
    description: `Реестр нотификаций о характеристиках шифровальных (криптографических) средств и товаров, их содержащих - Страница ${searchParams.page ?? 1}`
  })
}
export default function Home() {
  return (
    <MainPage/>
  )
}
