import { createFileRoute } from '@tanstack/react-router'
import { getEmployee, putEmployee } from '../../../api/employees'
import { AddEdit } from '../../../components/addeditemployee'
import { useQuery } from '@tanstack/react-query'
export const Route = createFileRoute('/employee/edit/$employeeId')({
  component: () => <Edit/>,
})

function Edit(){
    const { employeeId } = Route.useParams()
    
    const {data} = useQuery({ queryKey: ['employee'], queryFn: () => getEmployee(employeeId)})
    return <>
        {data && <AddEdit title="Edit" employee={data} route={Route} mutation={putEmployee} />}
        {!data && <div className="text-3xl text-center">Loading...</div>}
    </>
}
