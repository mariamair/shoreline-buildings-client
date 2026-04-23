/**
 * Defines the dashboard actions.
 * 
 * @author Maria Mair <mm225mz@student.lnu.se>
 */

'use server'

import { revalidatePath } from 'next/cache'
import { getBuildingCountEntities, getRegionName } from '@/lib/data'

export async function fetchData(filter) {
  // Revalidate to refresh the dashboard
  revalidatePath('/dashboard')
    
  const data = await getBuildingCountEntities(filter)
  return data
}

export async function fetchRegionName(regionCode) {
  const { region: { name } }  = await getRegionName(regionCode)
  return name
}
