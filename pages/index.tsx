import { useState } from 'react'
import styles from '../styles/Home.module.css'
import AudioAnalyzer from './AudioAnalyzer'
import DayChooser from './DayChooser'
import PrayerChooser from './PrayerChooser'

export default function Home() {
  const [day, setDay] = useState("")
  const [prayer, setPrayer] = useState("")
  const [started, setStarted] = useState(false)
  if (day == "")
    return <DayChooser setDay={setDay} />
  if (prayer == "")
    return <PrayerChooser setPrayer={setPrayer} />
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          <a href="https://praypal.codehospital.com/">PrayPal!</a>
        </h1>
        {started && <AudioAnalyzer started={started} />}
        <button
          className="btn  btn-secondary"
          onClick={() => { setStarted(!started) }}
        >
          {started ? 'Stop' : 'Start'}
        </button>


        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h3>Documentation &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

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
          href="https://praypal.codehospital.com/"
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
