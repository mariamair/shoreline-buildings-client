/**
 * Defines the region component.
 * 
 * @author Maria Mair <mm225mz@student.lnu.se>
 */

'use client'

import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import { fetchData, fetchRegionName } from '../actions.js'
import SelectAreaType from '../components/SelectAreaType.js'
import SelectRegion from '../components/SelectRegion.js'
import SelectYear from '../components/SelectYear'
import RegionMap from '../components/maps/RegionMap.js'
import styles from '../page.module.css'

export default function RegionPage({ params }) {
  const router = useRouter()
  const { regionCode } = use(params)
  const [regionName, setRegionName] = useState('')

  const regionTypeMunicipality = 3
  const areaTypeTotal = 1
  const buildingTypeTotal = 1
  const shorelineTypeTotal = 1

  const [filterValues, setFilterValues] = useState({ 
    parentRegionCode: regionCode,
    regionTypeId: regionTypeMunicipality, 
    areaTypeId: areaTypeTotal, 
    buildingTypeId: buildingTypeTotal,
    shorelineTypeId: shorelineTypeTotal, 
    year: 2018,
    limit: 50,
    offset: 0 })

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const result = fetchRegionName(regionCode)
    setRegionName(result)
  }, [regionCode])

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        const result = await fetchData(filterValues)
        setData(result)
        router.refresh
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [filterValues, router.refresh])

  // Navigate to the selected region page
  const handleRegionChange = (event) => {
    const selectedRegionCode = event.target.value
    setFilterValues({ ...filterValues, parentRegionCode: selectedRegionCode })
    router.push(`/dashboard/${selectedRegionCode}`)
  }

  return (
    <main className={styles.main}>
      <h1>Dashboard</h1>
      <h3>Shoreline Buildings in {regionName}</h3>
      <div className={styles.filter}>
        <SelectRegion 
          value={filterValues.parentRegionCode} 
          onChange={handleRegionChange} />
        <SelectYear 
          value={filterValues.year} 
          onChange={(year) => setFilterValues({ ...filterValues, year })} />
        <SelectAreaType 
          value={filterValues.areaTypeId} 
          onChange={(areaTypeId) => setFilterValues({ ...filterValues, areaTypeId })} />
      </div>
      {loading && <p className={styles.loading}>Loading data...</p>}
      {data && (
        <RegionMap
          data={data.buildingCountEntities.items}
          regionCode={regionCode}
          regionName={regionName}
        />
      )}
      <p className={styles.mapInfo}>Map from <a href="https://github.com/okfse/sweden-geojson">https://github.com/okfse/sweden-geojson</a></p>
    </main>
  )
}
