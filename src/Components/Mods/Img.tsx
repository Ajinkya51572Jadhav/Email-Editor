import { ChangeEvent, useState, useEffect } from 'react';
import { useEditor } from '../../Hooks/Editor.hook';
import { Col, Input, Modal, Row, Upload } from 'antd';
import { useValue, useVisibility } from '../../Hooks/Attribute.hook';
import { PlusOutlined } from '@ant-design/icons';
import _ from 'lodash';

const ATTRIBUTE = 'src';

const Img = () => {
  const [visible, path] = useVisibility({ attribute: ATTRIBUTE });
  const { mjmlJson, setMjmlJson } = useEditor();
  const { getValue } = useValue({ path, visible, attribute: ATTRIBUTE });

  const [preview, setPreview] = useState({ visible: false, image: '' });
  const [fileList, setFileList] = useState([]);
   
   console.log("preview.image",preview.image)

  useEffect(() => {
    if (preview.image) {
      handleChange({ image: preview.image });
    };
  }, [preview]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>| any | { image?: string }) => {

    if (path && visible) {
      const newMjmlJson = _.set(
        { ...mjmlJson },
        path,
        {
          ..._.get(mjmlJson, path),
          attributes: { ..._.get(mjmlJson, path).attributes, [ATTRIBUTE]: e?.image ? e?.image : e?.currentTarget?.value },
        }
      );
      setMjmlJson(newMjmlJson);
    }
  };

  const handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreview({ visible: true, image: file.url || file.preview });
  };

  const handleChangeUpload = ({ fileList }: any) => {
    setFileList(fileList);
    const lastUploadedFile = fileList[fileList.length - 1];
    if (lastUploadedFile && lastUploadedFile.response && path && visible) {
      const uploadedUrl = lastUploadedFile.response.url; // Ensure your API returns the URL of the uploaded image
      handleChange({ image: uploadedUrl });
    }
  };

  const getBase64 = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });

  return visible ? (
    <Row>
      <Col span={24}>
        <Input addonBefore="src" onChange={handleChange} value={getValue()} />

        <Upload
          action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChangeUpload}
          multiple
        >
          {fileList.length < 1 && (
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          )}
        </Upload>

        <Modal
          visible={preview.visible}
          footer={null}
          onCancel={() => setPreview({ visible: false, image: '' })}
        >
          <img alt="Preview" style={{ width: '100%' }} src={preview.image} />
        </Modal>
      </Col>
    </Row>
  ) : null;
};

export { Img };



// import _ from 'lodash';
// import { ChangeEvent, useState } from 'react';
// import { useEditor } from '../../Hooks/Editor.hook';
// import { Col, Input,Modal, Row, Upload } from 'antd'; 
// import { useValue, useVisibility } from '../../Hooks/Attribute.hook';
// import { PlusOutlined } from '@ant-design/icons';

// const ATTRIBUTE = 'src';
 
// const Img = () => {
//   const [visible, path] = useVisibility({ attribute: ATTRIBUTE });
//   const { mjmlJson, setMjmlJson } = useEditor();
  

//   const { getValue } = useValue({ path, visible, attribute: ATTRIBUTE });
//   //todo: check if changing directly to mjmlJson causes perfomance impact
//   //   if so, then maintain a local state, then on change change the value first,
//   //   then by using useeffect listen for the in localvalue, then update the mjmlJson.

//   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//     let value = e.currentTarget.value;
//     if (path && visible) {
//       let json = {};
//       let element = _.get(mjmlJson, path);
//       element.attributes[ATTRIBUTE] = value;
//       json = _.set(mjmlJson, path, element);
//       setMjmlJson({ ...json });
//     }
//   };


//   return visible ? (
//     <Row>
//       <Col span={24}>
//         <Input addonBefore="src" onChange={(e) => handleChange(e)} value={getValue()} />
//       </Col>
//     </Row>
//   ) : null;
// };

// export { Img };
