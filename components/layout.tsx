import Head from 'next/head';
import Image from 'next/image';

import Link from 'next/link';

import utilStyles from '../styles/utils.module.css';

import styles from './layout.module.css';

const name = 'Sven Kernke';

export const siteTitle = 'Next.js Sample Website';

export default function Layout(
  {
    children,
    home
  }: {
    children: React.ReactNode
    home?: boolean
  }
) {
  return (
    <div className={styles.container}>
      <Head>
        <link href='/favicon.ico' rel='icon' />
        <meta content='Learn how to build a personal website using Next.js' name='description' />
        <meta content={`https://og-image.vercel.app/${encodeURI(siteTitle)}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`} property='og:image' />
        <meta content={siteTitle} name='og:title' />
        <meta content='summary_large_image' name='twitter:card' />
      </Head>
      <header className={styles.header}>
        {home && <>
          <Image priority src='/images/profile.jpg' className={utilStyles.borderCircle} height={144} width={144} alt={name} />
          <h1 className={utilStyles.heading2Xl}>{name}</h1>
        </>}
      </header>
      <main>{children}</main>
      {!home && <div className={styles.backToHome}>
        <Link href='/'>
          <a>← Back to home</a>
        </Link>
      </div>}
    </div>
  );
}

