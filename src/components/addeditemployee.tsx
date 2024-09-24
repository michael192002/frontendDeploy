import React from 'react'
import type { FormProps } from 'antd'
import {Form, Input, Select, Upload } from 'antd'
import { useState } from 'react'
import type { GetProp, UploadFile, UploadProps } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useNavigate } from '@tanstack/react-router'
import { getBase64 } from '../utility/fileutility'
import type { PopconfirmProps } from 'antd';
import { Button, message, Popconfirm } from 'antd';
import type { RadioChangeEvent } from 'antd';
import { Radio } from 'antd';
import { getCafes } from '../api/cafe';
import { useQuery } from '@tanstack/react-query';
type FieldType = {
    name?: string
    email_address?: string
    phone_number?: string
    gender? : string,
    cafeId? : string,
}
  
const { TextArea } = Input;
export function AddEdit({title, employee, route, mutation} : {title : string, employee : FieldType, route : any, mutation : any }) {
  const [form] = Form.useForm();
  const [changes, setChanges] = useState(false);
  const navigate = useNavigate({ from: route.fullPath })
  const { employeeId } = route.useParams();
  const [formData, setFormData] = useState({...employee});
  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    let newEmployee : any = {...values}
    if (employeeId) {
        newEmployee = {...newEmployee, id : employeeId};
    }
    await mutation(newEmployee);
    navigate({to : '/employees'})
  }
  
  const {data} = useQuery({ queryKey: ['cafe'], queryFn: () => getCafes("")})
  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }
  const onValuesChange = (changedValues : any) => {
    // Update state with changed values
    setChanges(true);
    setFormData((prevData) => ({
      ...prevData,
      ...changedValues,
    }));
  };
  const confirm: PopconfirmProps['onConfirm'] = (e) => {
    message.success('Success');
    navigate({to : "/employees"})
  };
  
  const cancel: PopconfirmProps['onCancel'] = (e) => {
  };
  return (
    <>
    <h1 className="text-center text-6xl m-8 tracking-tight">{title} Employee</h1>
    <Form
    form={form}
    name="basic"
    onValuesChange={onValuesChange} // Capture changes
    initialValues={formData}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
    className="mt-12 mx-auto max-w-4xl"
    layout="vertical"
  > 
    <Form.Item<FieldType>
      label="Name"
      name="name"
      rules={[{ required: true, message: 'Please input employee name!'}, { 
        min: 6, 
        message: `Minimum ${6} characters required!` 
      },
      { 
        max: 10, 
        message: `Maximum ${10} characters allowed!` 
      },]}
    >
      <Input/>
    </Form.Item>

    <Form.Item<FieldType>
      label="Email address"
      name="email_address"
      rules={[{ required: true, message: 'Please input employee email!'}, 
      {
        type: 'email',
        message: 'The input is not valid E-mail!',
      },]}
    >
      <Input/>
    </Form.Item>
    <Form.Item<FieldType>
      label="Phone number"
      name="phone_number"
      rules={[{ required: true, message: 'Please input employee phone number!' }, 
        {
            pattern: /^([89]\d{7})$/, // Regex to validate phone number
            message: 'Phone number must start with 8 or 9 and have 8 digits.',
          },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item<FieldType>
      label="Gender"
      name="gender"
      rules={[{ required: true, message: 'Please input gender!' }, 
      ]}
    >
        <Radio.Group value={formData.gender}>
        <Radio value="Male">Male</Radio>
        <Radio value="Female">Female</Radio>
        </Radio.Group>    
    </Form.Item>

    <Form.Item<FieldType>
      label="Cafe"
      name="cafeId"
    >
    <Select
      placeholder="Select Cafe"
      defaultValue={formData.cafeId}
      style={{ width: 120 }}
      options={data?.map((d : any) => ({value : d.id, label : d.name}))}
    />
    </Form.Item>

    <Form.Item >
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
      {changes && <Popconfirm
        title="Unsaved Changes"
        description="Are you sure you want to navigate away?"
        onConfirm={confirm}
        onCancel={cancel}
        okText="Yes"
        cancelText="No"
        className="mx-4"
      >
        <Button danger>Cancel</Button>
      </Popconfirm>}
      {!changes && <Button type="default" htmlType="button" onClick={confirm} className="mx-4">
        Cancel
      </Button>}
    </Form.Item>
  </Form>
  </>
  )
}