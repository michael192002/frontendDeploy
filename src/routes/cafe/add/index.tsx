import { createFileRoute, Navigate } from '@tanstack/react-router'
import { AddEdit } from '../../../components/addeditcafe'
import { postCafe } from '../../../api/cafe'
export const Route = createFileRoute('/cafe/add/')({
  component: () => <Add/>,
})


function Add() {
  return <AddEdit title="Add" cafe={{}} route={Route} mutation={postCafe} />
}