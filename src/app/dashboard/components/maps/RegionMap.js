/**
 * Defines the map component.
 *
 * @author Maria Mair <mm225mz@student.lnu.se>
 */
'use client'

import { useEffect, useRef } from 'react'
import * as echarts from 'echarts'
import { useRouter } from 'next/navigation'

export default function RegionMap() {

  const data = { items: [
    { name: 'Stockholms län', code: '01', buildingCount: 5 },
    { name: 'Kronobergs län', code: '07', buildingCount: 4 },
    { name: 'Uppsala län', code: '03',  buildingCount: 3 },
    { name: 'Västerbottens län', code: '24',  buildingCount: 3 },
    { name: 'Norrbottens län', code: '25',  buildingCount: 1 },
    { name: 'Örebro län', code: '18',  buildingCount: 0 }
  ] }

  const mapData = data.items.map(item => ({ 
    name: item.name,
    code: item.code,
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
    fetch('/geodata/swedish_regions.geojson')
      .then(res => res.json())
      .then(geoJson => {
        echarts.registerMap('sweden', geoJson)

        chart.setOption({
          title: {
            text: 'Buildings per Region',
            left: 'center',
            textStyle: {
              color: getCssVar('--text-primary')
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: (params) =>
              `${params.name}: ${params.value ?? 0} buildings`
          },
          visualMap: {
            min: 0,
            max: Math.max(...mapData.map(d => d.value)),
            left: 'left',
            top: 'bottom',
            text: ['High', 'Low'],
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
            map: 'sweden',
            roam: true,          // Enable zoom and pan
            emphasis: {
              label: { show: true },
              itemStyle: { areaColor: getCssVar('--map-highlight') }  // Highlight region on hover
            },
            data: mapData
          }]
        })

        // Click region to drill down
        chart.on('click', (params) => {
          if (params.name) {
            router.push(`/dashboard/regions/${params.data.code}`)
          }
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
