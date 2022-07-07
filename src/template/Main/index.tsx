import Header from 'src/components/Header';
import styles from 'src/styles/common.module.scss';

export const Main = ({ children }) => {
  return (
    <div className={styles.container}>
      <Header />
      <main>{children}</main>
    </div>
  );
};
