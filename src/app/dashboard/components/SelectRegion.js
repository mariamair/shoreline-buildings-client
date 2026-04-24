/**
 * Defines the area type selection list component.
 *
 * @author Maria Mair <mm225mz@student.lnu.se>
 */

'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import styles from '../page.module.css'
import { fetchRegions } from '../actions'

export default function SelectRegion({ value }) {
  const router = useRouter()
  const [regions, setRegions] = useState([])
  const regionTypeId = 2

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await fetchRegions(regionTypeId)
        // Sort regions by name
        const sorted = result.sort((a, b) => a.name.localeCompare(b.name))
        setRegions(sorted)
        
        console.log(result)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    loadData()
  }, [regionTypeId])

  const handleChange = (event) => {
    const selectedRegionCode = event.target.value
    // Navigate to the selected region page
    router.push(`/dashboard/${selectedRegionCode}`)
  }

  return (
    <div className={styles.dropdown}>
      <label>Region</label>
      <select value={value} onChange={handleChange}>
        {regions.map((option) => (
          <option key={option.code} value={option.code}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  )
}
