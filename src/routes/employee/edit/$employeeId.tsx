import { createFileRoute } from '@tanstack/react-router'
import { getEmployee, putEmployee } from '../../../api/employees'
import { AddEdit } from '../../../components/addeditemployee'
import { useQuery } from '@tanstack/react-query'
import { CafeDTO } from '../../../api/cafe'
import { useEffect, useState } from 'react'
export const Route = createFileRoute('/employee/edit/$employeeId')({
  component: () => <Edit/>,
})

function Edit(){
    const { employeeId } = Route.useParams()
    const [data, setData] = useState<any>(null)
    useEffect(() => {
      const fetchData = async () => {
        return await getEmployee(employeeId);
      } 
      fetchData().then(res => {
        setData(res);
      });
    }, [])
    return <>
        {!data && <div className="text-3xl text-center">Loading...</div>}
        {data && <AddEdit title="Edit" employee={data} route={Route} mutation={putEmployee} />}
    </>
}
