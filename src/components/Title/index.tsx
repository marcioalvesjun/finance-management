import { Typography } from 'antd';
import { TitleProps } from './types';
import styles from './styles.module.scss';

const { Title: AntdTitle } = Typography;

export function Title({ children }: TitleProps) {
  return <AntdTitle className={styles.title}>{children}</AntdTitle>;
}
