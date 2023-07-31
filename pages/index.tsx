import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import Uploader from '../src/compnents/uploader/uploader'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Image uploader</title>
        <meta name="description" content="Image uploader" />
        <link rel="icon" href="/devchallenges.png" />
      </Head>

      <main className={styles.main}>
        <Uploader />        
      </main>
    </div>
  )
}
