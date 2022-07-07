import Image from 'next/image';

import styles from './header.module.scss';

export default function Header() {
  return (
    <header className={styles.content}>
      <div>
        <Image
          src="/assets/img/logo-spacetraveling.svg"
          alt="Logo Spacetraveling"
          width={240}
          height={26}
        />
      </div>
    </header>
  );
}
