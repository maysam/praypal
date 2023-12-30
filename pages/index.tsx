import { useState } from 'react'
import styles from '../styles/Home.module.css'
import AudioAnalyzer from './AudioAnalyzer'

export default function Home() {
  const [started, setStarted] = useState(false)
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
        <AudioAnalyzer started={started} />
        {/* <Button
        className={styles.btn}
        onClick={() => { setStarted(!started) }}
        children={<span>{started ? 'Started' : 'Paused'}</span>}
        />


    <div className="flex w-max gap-4">
      <ButtonGroup title="s">
      <Button variant="filled">filled</Button>
      <Button variant="gradient">gradient</Button>
      <Button variant="outlined">outlined</Button>
      <Button variant="text">text</Button>
      </ButtonGroup>
    </div> */}
        <button className="btn  btn-primary" onClick={() => { setStarted(!started) }}>started: {started ? 'yes' : 'no'}</button>
        <button className={`${styles.btn} ${styles.btn_blue}`} onClick={() => { setStarted(!started) }}>started: {started ? 'yes' : 'no'}</button>
        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h3>Documentation &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>
          <audio id="audio-player" className="audio"></audio>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h3 className='text-3xl font-bold underline'>Learn &rarr;</h3>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.card}
          >
            <h3>Deploy &rarr;</h3>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
