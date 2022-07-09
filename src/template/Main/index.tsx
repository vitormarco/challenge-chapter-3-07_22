import { ReactNode } from 'react';
import styles from 'src/styles/common.module.scss';

export const Main: ReactNode = ({ children }) => {
  return (
    <div className={styles.container}>
      <main>{children}</main>
    </div>
  );
};
