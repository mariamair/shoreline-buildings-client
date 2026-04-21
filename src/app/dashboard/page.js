/**
 * Defines the dashboard component.
 * 
 * @author Maria Mair <mm225mz@student.lnu.se>
 */

import styles from './page.module.css'
import { getBuildingCountEntities } from '@/lib/data'
import SwedenMap from './components/maps/SwedenMap.js'

export default async function Dashboard() {
  const areaTypeTotal = 1
  const buildingTypeTotal = 7
  const shorelineTypeTotal = 1

  const filter = { 
    regionTypeId: 2, 
    areaTypeId: areaTypeTotal, 
    buildingTypeId: buildingTypeTotal,
    shorelineTypeId: shorelineTypeTotal, 
    year: 2018,
    limit: 21,
    offset: 0 }

  const { buildingCountEntities } = await getBuildingCountEntities(filter)

  return (
    <main className={styles.main}>
      <h1>Dashboard</h1>
      <SwedenMap data={buildingCountEntities.items} />
      <p>Map from <a href="https://github.com/okfse/sweden-geojson">https://github.com/okfse/sweden-geojson</a></p>
    </main>
  )
}
