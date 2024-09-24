import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { getCafe } from '../../../api/cafe'
import { AddEdit } from '../../../components/addeditcafe'
import { putCafe } from '../../../api/cafe'
export const Route = createFileRoute('/cafe/edit/$cafeId')({
  component: () => <Edit/>,
})
function Edit(){
    const { cafeId } = Route.useParams()
    const {data} = useQuery({ queryKey: ['cafe'], queryFn: () => getCafe(cafeId)})
    return <>
        {!data && <div className="text-3xl text-center">Loading...</div>}
        {data && <AddEdit title="Edit" cafe={data} route={Route} mutation={putCafe} />}
    </>
}