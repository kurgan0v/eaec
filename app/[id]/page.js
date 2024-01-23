import DetailPage from "@/components/pages/DetailPage/DetailPage";
import {API_URL} from "@/components/app/const";
import {notFound} from "next/navigation";

export async function generateMetadata({ params }) {
    const id = params.id.split('_').pop();
    try{
        const response = await fetch(`${API_URL}${id}/`)
        const data = await response.json()
        return {
            title: `${data?.cryptographicmeans_name.replaceAll('_x000D_', ' ').split(',')[0]}, карточка документа ${data?.notification_number} | ЕАЭС`,
            description: data?.cryptographicmeans_name.replaceAll('_x000D_', ' '),
            keywords: data?.cryptographicmeans_name.replaceAll('_x000D_', ' ').split(' ').join(', ') + ", " + data?.cryptographicmeans_manufacturer.replaceAll('_x000D_', ' ').split(' ').join(', ')
        }
    } catch(e){
        notFound()
        return {}
    }
}
export default function Page({params}){
    return(
        <DetailPage params={params}/>
    )
}
