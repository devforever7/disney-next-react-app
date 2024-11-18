import Image from 'next/image';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <Image
          src="/disney-logo.svg"
          alt="Disney Logo"
          width={90}
          height={40}
          className={styles.logo}
        />
        <p className={styles.copyright}>
          For educational use only. All characters and content are the property
          of Disney. This test is for private use and development testing only
          and should not be distributed for public consumption.
        </p>
      </div>
    </footer>
  );
}
