'use client'

import AuthenticatedLayout from '@/components/layout/AuthenticatedLayout'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'

export default function MarketPage() {
  const { t } = useTranslation('common')

  // 模拟市场数据
  const marketData = [
    { symbol: 'BTC/USDT', price: '42,350.00', change: '+2.45%', changeType: 'positive' },
    { symbol: 'ETH/USDT', price: '2,580.00', change: '+1.23%', changeType: 'positive' },
    { symbol: 'BNB/USDT', price: '315.50', change: '-0.67%', changeType: 'negative' },
    { symbol: 'ADA/USDT', price: '0.4520', change: '+3.21%', changeType: 'positive' },
    { symbol: 'SOL/USDT', price: '98.75', change: '-1.45%', changeType: 'negative' },
    { symbol: 'DOT/USDT', price: '6.78', change: '+0.89%', changeType: 'positive' },
  ]

  return (
    <AuthenticatedLayout>
      <div className="page-content p-4">
        {/* 页面标题 */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            {t('navigation.market')}
          </h1>
          <p className="text-muted-foreground">实时市场行情</p>
        </div>

        {/* 市场概览 */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-card rounded-lg shadow-sm p-4 border border-border">
            <h3 className="text-sm text-muted-foreground mb-1">24h 总成交量</h3>
            <p className="text-xl font-bold text-card-foreground">¥128.5B</p>
            <p className="text-sm text-green-500">+5.2%</p>
          </div>
          <div className="bg-card rounded-lg shadow-sm p-4 border border-border">
            <h3 className="text-sm text-muted-foreground mb-1">活跃交易对</h3>
            <p className="text-xl font-bold text-card-foreground">1,247</p>
            <p className="text-sm text-primary">+12</p>
          </div>
        </div>

        {/* 市场列表 */}
        <div className="bg-card rounded-lg shadow-sm overflow-hidden border border-border">
          <div className="px-4 py-3 border-b border-border">
            <h2 className="text-lg font-semibold text-card-foreground">热门交易对</h2>
          </div>
          
          <div className="divide-y divide-border">
            {marketData.map((item, index) => {
              const isBTC = item.symbol === 'BTC/USDT'
              
              const content = (
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-card-foreground">{item.symbol}</h3>
                    <p className="text-sm text-muted-foreground">
                      现货 {isBTC && <span className="text-primary">• 点击查看详情</span>}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-card-foreground">¥{item.price}</p>
                    <p className={`text-sm ${
                      item.changeType === 'positive' ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {item.change}
                    </p>
                  </div>
                </div>
              )
              
              if (isBTC) {
                return (
                  <Link key={index} href="/market/btc" className="block px-4 py-4 hover:bg-accent cursor-pointer">
                    {content}
                  </Link>
                )
              }
              
              return (
                <div key={index} className="px-4 py-4 hover:bg-accent">
                  {content}
                </div>
              )
            })}
          </div>
        </div>

        {/* 图表占位符 */}
        <div className="mt-6 bg-card rounded-lg shadow-sm p-6 border border-border">
          <h2 className="text-lg font-semibold text-card-foreground mb-4">价格走势图</h2>
          <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <p>图表功能敬请期待</p>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}
