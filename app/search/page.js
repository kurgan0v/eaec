import SearchPage from "@/components/pages/SearchPage/SearchPage";
import { Metadata, ResolvingMetadata } from 'next'


export async function generateMetadata({ searchParams }, parent) {
    return {
        title: `ЕАЭС | Результаты поиска по запросу "${searchParams.q}"`,
    }
}
export default function Page(){
    return(
        <SearchPage/>
    )
}
