/**
 * Defines the map component.
 *
 * @author Maria Mair <mm225mz@student.lnu.se>
 */
'use client'

import { useEffect, useRef } from 'react'
import * as echarts from 'echarts'
import { useRouter } from 'next/navigation'

export default function RegionMap({ data }) {

  const mapData = data.items.map(item => ({ 
    name: item.region.name,
    value: item.buildingCount
  }))

  // Get the resolved value of a CSS variable
  const getCssVar = (variable) =>
    getComputedStyle(document.documentElement)
      .getPropertyValue(variable)
      .trim()

  const chartRef = useRef(null)
  const router = useRouter()

  useEffect(() => {
    const chart = echarts.init(chartRef.current)

    // Load GeoJSON and register it with ECharts
    fetch('/geodata/swedish_municipalities.json')
      .then(res => res.json())
      .then(geoJson => {
        // Only display selected region
        const filteredGeoJson = {
          ...geoJson,
          features: geoJson.features.filter(
            f => f.properties.lan_code === data.regionCode
          )
        }
        echarts.registerMap('region', filteredGeoJson)

        chart.setOption({
          title: {
            text: 'Shoreline Buildings in Region',
            left: 'left',
            textStyle: {
              color: getCssVar('--text-primary')
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: (params) => `
              <div>
              <strong>${params.name}</strong><br/>
              ${(params.value ?? 0).toLocaleString()} buildings
              </div>
            `
          },
          visualMap: {
            min: 0,
            max: Math.max(...mapData.map(d => d.value)),
            left: 'left',
            top: 'bottom',
            text: ['High', 'Low'],
            textStyle: {
              color: getCssVar('--text-primary')  // ← add this
            },
            calculable: true,
            inRange: {
              color: [
                getCssVar('--map-range-low'), 
                getCssVar('--map-range-high')
              ]
            }
          },
          series: [{
            type: 'map',
            map: 'region',
            roam: true,          // Enable zoom and pan
            emphasis: {
              label: { 
                show: true,
                color: getCssVar('--text-primary')
              },
              itemStyle: { areaColor: getCssVar('--map-highlight') }  // Highlight region on hover
            },
            data: mapData
          }]
        })
      })

    const handleResize = () => chart.resize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      chart.dispose()
    }
  }, [mapData, router])

  return <div ref={chartRef} style={{ width: '100%', height: '600px' }} />
}
