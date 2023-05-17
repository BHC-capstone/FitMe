import React from 'react';
import { Form, Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import '../../scss/myPage/trainerProfile.scss';

function TrainerProfile() {
  const fileList = [];
  const handleFileUpload = event => {
    event.preventDefault();
    const formData = new FormData();
    
  };

  return (
    <div className="trainer-profile">
      <h1>TrainerProfile</h1>
      <Form>
        <Form.Item label="트레이너 프로필 사진">
          <Upload.Dragger name="files" />
        </Form.Item>
      </Form>
      <br />
      <Form>
        <Upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture"
          defaultFileList={[...fileList]}
          className="upload-list-inline"
        >
          <Button icon={<UploadOutlined />}>자격증 파일 업로드</Button>
        </Upload>
      </Form>
    </div>
  );
}

export default TrainerProfile;
