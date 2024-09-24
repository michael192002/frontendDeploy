import * as React from 'react'
import { useState } from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteEmployee, getEmployees } from '../api/employees';
import { deleteCafe } from '../api/cafe';
import { PopConfirmDelete } from '../components/popconfirm';
import { Button, Flex, message, Spin } from 'antd';
import { LoadingOutlined, UsergroupAddOutlined } from '@ant-design/icons'
export const Route = createFileRoute('/employees')({
  validateSearch: (search: Record<string, unknown>): any => {
    return {
      cafe: search.cafe,
    }
  },  
  component: Employees,
})
function Employees() {
  const queryClient = useQueryClient()
  const { cafe } = Route.useSearch()
  const { data, isFetching, isLoading, isError } = useQuery({
    queryKey: ['employees'],
    queryFn: async () => {
      return await getEmployees(cafe)
    },
  })
  const mutation = useMutation({
    mutationFn: deleteEmployee,
    onSuccess: () => {
      // Invalidate and refetch
      message.success('Success!');
      queryClient.invalidateQueries({ queryKey: ['employees'] })
    },
    onError: () => {
      message.error('Failed to update employee.');
      queryClient.invalidateQueries({ queryKey: ['employees'] })
    },
  })
  const navigate = useNavigate({ from: Route.fullPath })
  const action = (props : any)  => {
    return (
      <div className="flex gap-2 p-1">
        <Button type="primary" onClick={() => navigate({to : `/employee/edit/${props.data.id}`})}>Edit</Button>
        {PopConfirmDelete(props.data.id, mutation)}
      </div>
    )
  }
  const [colDefs, setColDefs] = useState([
    { field: "id" },
    { field: "name" },
    { headerName: "Email address", field : "email_address"},
    { headerName: "Phone number", field: "phone_number"},
    { headerName: "Days worked", field: "days_worked"},
    { headerName: "Cafe name", field : "cafe"},
    { field: "action", cellRenderer: action },
  ]);
  return (
    <div className="p-4">
      <div className="text-5xl mt-2 mb-4 flex justify-between items-center" >
        {' '}
        <h3 className="tracking-tight">
        <UsergroupAddOutlined className="pr-2" /> Employee List      
        </h3>
         <Button type="primary" className="ml-auto" onClick={() => navigate({to : "/employee/add"})}>Add New Employee</Button>
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