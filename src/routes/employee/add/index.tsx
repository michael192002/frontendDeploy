import { createFileRoute } from "@tanstack/react-router"
import { AddEdit } from "../../../components/addeditemployee"
import { postEmployee } from "../../../api/employees"
export const Route = createFileRoute('/employee/add/')({
    component: () => <Add/>,
  })

  
function Add() {
    return <AddEdit title="Add" employee={{}} route={Route} mutation={postEmployee} />
}