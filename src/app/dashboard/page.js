/**
 * Defines the dashboard component.
 * 
 * @author Maria Mair <mm225mz@student.lnu.se>
 */

import styles from './page.module.css'
import RegionMap from './components/maps/RegionMap.js'

export default async function Dashboard() {
  return (
    <main className={styles.main}>
      <h1>Dashboard</h1>
      <RegionMap />
      <p>Map from <a href="https://github.com/okfse/sweden-geojson">https://github.com/okfse/sweden-geojson</a></p>
    </main>
  )
}
