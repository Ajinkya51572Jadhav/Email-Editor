import { Col, Collapse, Row } from 'antd';
import { Button } from '../../Components/Button';
import { Text } from '../../Components/Text';
import { CaretDownOutlined } from '@ant-design/icons';
import css from './Editor.module.scss';
import '../../Assets/Css/antoveride.scss';
import Scrollbars from 'react-custom-scrollbars-2';
import { Image } from '../../Components/Image';
import { Spacer } from '../../Components/Spacer';
import { Html } from '../../Components/Html';
import { Divider } from '../../Components/Divider';
import { Section } from '../../Components/Section';
import { Social } from '../../Components/Social';
import { SectionV2 } from '../../Components/SectionV2';
import { VideoPlayer } from '../../Components/VideoPlayer';
import { Subscribe } from '../../Components/Subscribe';
import { Menu } from '../../Components/Menu';

const { Panel } = Collapse;

const Header = ({ title }: { title: string }) => {
  return <p className={css.title}>{title}</p>;
};

export const ComponentBank = () => {
  return (
    <Scrollbars style={{ height: '100%' }} autoHide={true}>
      <div className={css.components}>
        <SectionV2 />
        {/* update component */}
        <Image />
        <Menu />
        <Social />
        <Subscribe />
        {/* update component */}

        <Button />
        <Text />
        <Spacer />
        <Divider />
        <Html />
      </div>
    </Scrollbars>
  );
};
