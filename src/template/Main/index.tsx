import { FC } from 'react';
import styles from '../../styles/common.module.scss';

export const Main: FC = ({ children }) => {
  return (
    <div className={styles.container}>
      <main>{children}</main>
    </div>
  );
};
