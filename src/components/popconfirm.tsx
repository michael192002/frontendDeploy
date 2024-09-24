import React from 'react';
import type { PopconfirmProps } from 'antd';
import { Button, message, Popconfirm } from 'antd';
import { deleteCafe } from '../api/cafe';
import { QueryClient, UseMutationResult } from '@tanstack/react-query';
  
  const cancel: PopconfirmProps['onCancel'] = (e) => {
    message.error('Cancelled');
  };
  
export const PopConfirmDelete = (id : string, mutation : UseMutationResult<void, Error, string, unknown>) => {
    console.log(id)
    return (<Popconfirm
      title="Delete"
      description="Are you sure you want to delete?"
      onConfirm={() => {
        mutation.mutate(id);
      }}
      onCancel={cancel}
      okText="Yes"
      cancelText="No"
    >
      <Button danger>Delete</Button>
    </Popconfirm>)
};