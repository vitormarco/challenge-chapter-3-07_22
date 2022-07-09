import Image from 'next/image';
import { ReactElement } from 'react';
import Link from 'next/link';

import styles from './header.module.scss';

export default function Header(): ReactElement {
  return (
    <header className={styles.content}>
      <div>
        <Link href="/">
          <a>
            <Image
              src="/assets/img/logo-spacetraveling.svg"
              alt="logo"
              width={240}
              height={26}
            />
          </a>
        </Link>
      </div>
    </header>
  );
}
