import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { getCafe } from '../../../api/cafe'
import { AddEdit } from '../../../components/addeditcafe'
import { putCafe } from '../../../api/cafe'
import { useEffect, useState } from 'react'
export const Route = createFileRoute('/cafe/edit/$cafeId')({
  component: () => <Edit/>,
})
function Edit(){
    const { cafeId } = Route.useParams();
    const [data, setData] = useState<any>(null)
    useEffect(() => {
      const fetchData = async () => {
        return await getCafe(cafeId);
      } 
      fetchData().then(res => {
        setData(res);
      });
    }, [])

    return <>
        {!data && <div className="text-3xl text-center">Loading...</div>}
        {data && <AddEdit title="Edit" cafe={data} route={Route} mutation={putCafe} />}
    </>
}