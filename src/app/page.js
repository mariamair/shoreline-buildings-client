import Image from 'next/image'
import { SignInButton } from '@/components/authbuttons'
import styles from './page.module.css'

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.intro}>
          <h1>Shoreline Buildings</h1>
          <p className={styles.text}>Interactive visualization of data about shoreline buildings in Sweden.</p>
          <p className={styles.text}>Sign in to go to the dashboard.</p>
          <SignInButton></SignInButton>
        </div>
      </main>
    </div>
  )
}
