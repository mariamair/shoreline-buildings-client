/**
 * Defines the region component.
 * 
 * @author Maria Mair <mm225mz@student.lnu.se>
 */

import styles from '../page.module.css'
import { getBuildingCountEntities } from '@/lib/data'
import RegionMap from '../components/maps/RegionMap.js'

export default async function RegionPage({ params }) {
  const { regionCode } = await params

  const regionTypeMunicipality = 3
  const areaTypeTotal = 1
  const buildingTypeTotal = 1
  const shorelineTypeTotal = 1

  const filter = { 
    parentRegionCode: regionCode,
    regionTypeId: regionTypeMunicipality, 
    areaTypeId: areaTypeTotal, 
    buildingTypeId: buildingTypeTotal,
    shorelineTypeId: shorelineTypeTotal, 
    year: 2018,
    limit: 50,
    offset: 0 }

  const { buildingCountEntities } = await getBuildingCountEntities(filter)

  const data = { 
    regionCode,
    items: buildingCountEntities.items
  }

  return (
    <main className={styles.main}>
      <h1>Dashboard</h1>
      <RegionMap data={data} />
      <p>Map from <a href="https://github.com/okfse/sweden-geojson">https://github.com/okfse/sweden-geojson</a></p>
    </main>
  )
}
