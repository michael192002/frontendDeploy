import React from 'react'
import type { FormProps } from 'antd'
import {Form, Input, Upload } from 'antd'
import { useState } from 'react'
import type { GetProp, UploadFile, UploadProps } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useNavigate } from '@tanstack/react-router'
import { postCafe } from '../api/cafe'
import { getBase64 } from '../utility/fileutility'
import type { PopconfirmProps } from 'antd';
import { Button, message, Popconfirm } from 'antd';
type FieldType = {
    name?: string
    description?: string
    location?: string
    upload? : any 
}
  
const { TextArea } = Input;
export function AddEdit({title, cafe, route, mutation} : {title : string, cafe : FieldType, route : any, mutation : any }) {
  const [form] = Form.useForm();
  const [changes, setChanges] = useState(false);
  const navigate = useNavigate({ from: route.fullPath })
  const { cafeId } = route.useParams();
  const [formData, setFormData] = useState(cafe);
  const [fileList, setFileList] = useState<any>([])
  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    let base64;
    let newCafe : any = values;
    if (fileList?.length > 0) {
      base64 = await getBase64(fileList[0]);
      setFileList([]);
    }
    if (base64) {
       newCafe = {...values, logo : base64};
    } else {
       newCafe = {...values, logo : ""};
    }
    if (cafeId) {
      newCafe = {...newCafe, id : cafeId};
    }
    await mutation(newCafe);
    navigate({to : '/cafes'})
  }
  
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
  const props: UploadProps = {
    onRemove: (file) => {
      setFileList([]);
    },
    beforeUpload: (file) => {
      const MAX_SIZE = 2 * 1024 * 1024; // 2 MB
      if (file.size > MAX_SIZE) {
        message.error(`File must be smaller than ${MAX_SIZE / (1024 * 1024)} MB!`);
        return Upload.LIST_IGNORE; // Prevent the upload
      } else {
        console.log("FILE LIST SUCCESS")
        setFileList([file]);
      }
      return false;
    },
    fileList,
  };
  const confirm: PopconfirmProps['onConfirm'] = (e) => {
    message.success('Success');
    navigate({to : "/cafes"})
  };
  
  const cancel: PopconfirmProps['onCancel'] = (e) => {
  };
  return (
    <>
    <h1 className="text-center text-6xl m-8 tracking-tight">{title} Cafe</h1>
    <Form
    form={form}
    name="basic"
    initialValues={formData}
    onValuesChange={onValuesChange} // Capture changes
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
    className="mt-12 mx-auto max-w-4xl"
    layout="vertical"
  > 
    <Form.Item<FieldType>
      label="Name"
      name="name"
      rules={[{ required: true, message: 'Please input cafe name!'}, { 
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
      label="Description"
      name="description"
      rules={[{ required: true, message: 'Please input cafe description!' }, 
      { 
        max: 256, 
        message: `Maximum ${256} characters allowed!` 
      }, ]}
    >
        <TextArea rows={4} />
    </Form.Item>
    <Form.Item<FieldType>
      label="Location"
      name="location"
      rules={[{ required: true, message: 'Please input cafe location!' }]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      name="logo"
      label="Upload"
      // valuePropName="fileList"
      // getValueFromEvent={() => fileList}
      
      // https://stackblitz.com/edit/react-hw2mgn?file=index.js
    >
      <Upload {...props} maxCount={1}>
        <Button icon={<UploadOutlined />}>Select Logo</Button>
      </Upload>
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