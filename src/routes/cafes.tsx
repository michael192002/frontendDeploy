import * as React from 'react'
import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { AgGridReact } from 'ag-grid-react' // React Data Grid Component
import 'ag-grid-community/styles/ag-grid.css' // Mandatory CSS required by the Data Grid
import 'ag-grid-community/styles/ag-theme-quartz.css' // Optional Theme applied to the Data Grid
import { CoffeeOutlined } from '@ant-design/icons'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteCafe, getCafes } from '../api/cafe'
import { Button } from 'antd'
import { Input } from 'antd';
import { useNavigate } from '@tanstack/react-router'
import { useDebouncedCallback } from 'use-debounce'
import { LoadingOutlined } from '@ant-design/icons';
import { Flex, Spin } from 'antd';
import { message } from 'antd'
import { Link } from '@tanstack/react-router'
import { PopConfirmDelete } from '../components/popconfirm'
const { Search } = Input;
export const Route = createFileRoute('/cafes')({
  validateSearch: (search: Record<string, unknown>): any => {
    return {
      location: search.location,
    }
  },  
  component: Cafe,
})

function Cafe() {
  const queryClient = useQueryClient()
  const { location } = Route.useSearch()
  const { data, isFetching, isLoading, isError } = useQuery({
    queryKey: ['cafes'],
    queryFn: async () => {
      return await getCafes(location)
    },
  })
  const mutation = useMutation({
    mutationFn: deleteCafe,
    onSuccess: () => {
      // Invalidate and refetch
      message.success("Success")
      queryClient.invalidateQueries({ queryKey: ['cafes'] })
    },
    onError: () => {
      // Invalidate and refetch
      message.error("Failed")
    },
  })
  const navigate = useNavigate({ from: Route.fullPath })
  const action = (props : any)  => {
    return (
      <div className="flex gap-2 p-1" key={props.data.id}>
        <Button type="primary" onClick={() => navigate({from :'/cafes', to : `/cafe/edit/$cafeId`, params : {cafeId : props.data.id}})}>Edit</Button>
        {PopConfirmDelete(props.data.id, mutation)}
      </div>
    )
  }
  const Employees = (props : any) => {
    return (<>
        <Button type="primary" onClick={() => navigate({ from :'/cafes',  to: '/employees', search : {cafe : props.data.name}})}>{props.value}</Button>
   </>)
  }
  const handleSearch = useDebouncedCallback((term) => {  
    navigate({
      search: (prev : any) => ({ location: term.target.value }),
    }).then(() => {
      queryClient.invalidateQueries({ queryKey: ['cafes'] })
    })
  }, 300);

  const [colDefs, setColDefs] = useState([
    { field: 'logo', cellRenderer: (props : any) => <img className="w-20 h-20 object-cover" src={props.value}/> },
    { field: 'name' },
    { field: 'description', flex: 2 },
    { field: 'employees',  cellRenderer: Employees}, // Use your custom cell renderer},
    { field: 'location' },
    { field: 'action', cellRenderer: action },
  ])
  return (
    <div className="p-4">
      <div className="text-5xl mt-2 mb-4 flex justify-between items-center" >
        {' '}
        <h3 className="tracking-tight">
          <CoffeeOutlined className="pr-2" /> Cafes List      
        </h3>
         <Button type="primary" className="ml-auto" onClick={() => navigate({to : "/cafe/add"})}>Add New Cafe</Button>
      </div>
      <div>
        <Search placeholder="Filter Location" onChange={handleSearch} className="mb-4"   defaultValue={location} style={{ width: 200 }} />
      </div>
      <div
        className="ag-theme-quartz" // applying the Data Grid theme
        style={{ height: 500 }} // the Data Grid will fill the size of the parent container
      >
       {(!isLoading && !isFetching) && <AgGridReact
          rowData={data}
          columnDefs={colDefs}
          pagination={true}
          paginationPageSize={10}
          paginationPageSizeSelector={[10, 25, 50]}
        />
      }

      {(isLoading || isFetching) &&   <Flex align="center" gap="middle">
          <Spin indicator={<LoadingOutlined className="text-8xl" spin />} />
          </Flex>
      }   
      </div>
    </div>
  )
}
