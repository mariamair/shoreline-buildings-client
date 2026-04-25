/**
 * Defines the bar chart component.
 * 
 * @author Maria Mair <mm225mz@student.lnu.se>
 */

'use client'

import { useContext, useEffect, useState } from 'react'
import { FilterContext } from '../context/FilterContext'
import { fetchData } from '../actions.js'
import SelectYear from '../components/SelectYear'
import BarChart from '../components/BarChart'
import styles from '../page.module.css'

export default function Numbers() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  // Get filter values from context
  const { filterValues, setFilterValues } = useContext(FilterContext)

  const areaTypeProtected = 3
  filterValues.areaTypeId = areaTypeProtected

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        const result = await fetchData(filterValues)
        setData(result)
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [filterValues])


  return (
    <main className={styles.main}>
      <h1>Dashboard</h1>
      <h3>Buildings in a protected area</h3>
      <div className={styles.filter}>
        <SelectYear 
          value={filterValues.year} 
          onChange={(year) => setFilterValues({ ...filterValues, year })} />
      </div>
      {loading && <p>Loading...</p>}
      {data && <BarChart data={data.buildingCountEntities.items} filterValues={filterValues} />}
    </main>
  )
}
