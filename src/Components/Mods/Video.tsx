import _ from 'lodash';
import React, { ChangeEvent, useState } from 'react';
import { Row, Col, Input, Modal, message } from 'antd';
import { useEditor } from '../../Hooks/Editor.hook';
import { useValue, useVisibility } from '../../Hooks/Attribute.hook';

const ATTRIBUTE = 'href';

const Video = () => {
  const [visible, path] = useVisibility({ attribute: ATTRIBUTE });
  const { mjmlJson, setMjmlJson } = useEditor();
  const { getValue } = useValue({ path, visible, attribute: ATTRIBUTE });

  // State to store the video URL
  const [videoUrl, setVideoUrl] = useState(getValue() || '');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setVideoUrl(value);

    if (path && visible) {
      let json = {};
      let element = _.get(mjmlJson, path);
      
      console.log("attribute",element?.attributes);
             

      element.attributes[ATTRIBUTE] = value;
      json = _.set(mjmlJson, path, element);
      setMjmlJson({ ...json });
    }
  };

  return <></>
  // visible ? (
  //   <Row>
  //     <Col span={24}>
  //       <Input
  //         addonBefore="Video URL"
  //         onChange={handleChange}
  //         value={videoUrl}
  //         placeholder="Enter video URL"
  //       />
  //       <div style={{ marginTop: 16 }}>
  //         {videoUrl && (
  //           <video width="100%" controls>
  //             <source src={videoUrl} type="video/mp4" />
  //             Your browser does not support the video tag.
  //           </video>
  //         )}
  //       </div>
  //     </Col>
  //   </Row>
  // ) : null;
};

export { Video };



// import _ from 'lodash';
// import { ChangeEvent, useState } from 'react';
// import { useEditor } from '../../Hooks/Editor.hook';
// import { Col, Input,Modal, Row, Upload } from 'antd'; 
// import { useValue, useVisibility } from '../../Hooks/Attribute.hook';
// import { PlusOutlined } from '@ant-design/icons';

// const ATTRIBUTE = 'src';
 
// const Video = () => {
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

// export { Video };
