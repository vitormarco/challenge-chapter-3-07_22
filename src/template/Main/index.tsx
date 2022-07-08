import styles from 'src/styles/common.module.scss';

export const Main = ({ children }) => {
  return (
    <div className={styles.container}>
      <main>{children}</main>
    </div>
  );
};
