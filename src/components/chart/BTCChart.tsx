'use client'

import { useEffect, useRef } from 'react'
import { init, dispose } from 'klinecharts'

interface BTCChartProps {
  height?: number
  className?: string
}

// 模拟BTC K线数据
const generateMockBTCData = () => {
  const data = []
  let timestamp = Date.now() - 24 * 60 * 60 * 1000 // 从24小时前开始
  let price = 42000 // 起始价格
  
  for (let i = 0; i < 288; i++) { // 288个5分钟K线，覆盖24小时
    const open = price
    const randomChange = (Math.random() - 0.5) * 1000 // 随机变化-500到500
    const close = open + randomChange
    const high = Math.max(open, close) + Math.random() * 200
    const low = Math.min(open, close) - Math.random() * 200
    const volume = Math.random() * 1000 + 100
    
    data.push({
      timestamp,
      open: Number(open.toFixed(2)),
      high: Number(high.toFixed(2)),
      low: Number(low.toFixed(2)),
      close: Number(close.toFixed(2)),
      volume: Number(volume.toFixed(2))
    })
    
    timestamp += 5 * 60 * 1000 // 增加5分钟
    price = close
  }
  
  return data
}

export default function BTCChart({ height = 400, className = '' }: BTCChartProps) {
  const chartRef = useRef<HTMLDivElement>(null)
  const klineChartRef = useRef<any>(null)
  
  useEffect(() => {
    if (!chartRef.current) return
    
    // 初始化图表
    const chart = init(chartRef.current)
    klineChartRef.current = chart
    
    // 配置图表样式
    chart.setStyles({
      grid: {
        horizontal: {
          color: '#e5e7eb',
          size: 1,
          style: 'dashed'
        },
        vertical: {
          color: '#e5e7eb',
          size: 1,
          style: 'dashed'
        }
      },
      candle: {
        bar: {
          upColor: '#22c55e', // 绿色上涨
          downColor: '#ef4444', // 红色下跌
          noChangeColor: '#6b7280'
        },
        tooltip: {
          rect: {
            color: '#1f2937',
            borderColor: '#374151'
          },
          text: {
            color: '#f9fafb'
          }
        }
      },
      xAxis: {
        axisLine: {
          color: '#d1d5db'
        },
        tickText: {
          color: '#6b7280'
        }
      },
      yAxis: {
        axisLine: {
          color: '#d1d5db'
        },
        tickText: {
          color: '#6b7280'
        }
      }
    })
    
    // 生成并设置模拟数据
    const mockData = generateMockBTCData()
    chart.applyNewData(mockData)
    
    // 创建成交量技术指标
    chart.createIndicator('VOL', false, { id: 'candle_pane' })
    
    // 设置时间格式
    chart.setTimezone('Asia/Shanghai')
    
    return () => {
      if (klineChartRef.current) {
        dispose(chartRef.current!)
        klineChartRef.current = null
      }
    }
  }, [])
  
  return (
    <div className={`btc-chart ${className}`}>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">BTC/USDT</h3>
          <p className="text-sm text-muted-foreground">5分钟K线图</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-foreground">$42,350.00</p>
          <p className="text-sm text-green-500">+2.45% (+1,025.50)</p>
        </div>
      </div>
      
      {/* <div 
        ref={chartRef}
        style={{ height: `${height}px` }}
        className="w-full border border-border rounded-lg bg-card"
      /> */}
    </div>
  )
}
