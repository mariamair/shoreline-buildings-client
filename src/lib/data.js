/**
 * Fetches the data from the API.
 *
 * @author Maria Mair <mm225mz@student.lnu.se>
 */

import { BUILDING_COUNT_QUERY } from './queries'

export async function getBuildingCountEntities(filter) {
  const queryUrl = process.env.QUERY_URL
  const variables = { 
    regionTypeId: filter.regionTypeId, 
    areaTypeId: filter.areaTypeId, 
    buildingTypeId: filter.buildingTypeId, 
    shorelineTypeId: filter.shorelineTypeId,
    year: filter.year,
    limit: filter.limit,
    offset: filter.offset
  }

  if (filter.parentRegionCode) {
    variables.parentRegionCode = filter.parentRegionCode
  }
  
  try {
    const response = await fetch(`${queryUrl}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query: BUILDING_COUNT_QUERY, variables })
    })

    const { data } = await response.json()

    if (!response.ok) {
      throw new Error(response)
    }

    return data

  } catch (error) {
    console.log(error)
  }
}
