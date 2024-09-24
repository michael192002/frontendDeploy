import type { GetProp, UploadFile, UploadProps } from 'antd';
import { message } from 'antd';
import {Upload} from 'antd';
export const prop = (setFileList : React.Dispatch<any>, fileList : any) : UploadProps => ({
    onRemove: (file : any) => {
      setFileList([]);
    },
    beforeUpload: (file : any) => {
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
  });