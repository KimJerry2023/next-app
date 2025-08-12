'use client'

import AuthenticatedLayout from '@/components/layout/AuthenticatedLayout'
import { useTranslation } from 'react-i18next'

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
      <div className="p-4">
        {/* 页面标题 */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {t('navigation.market')}
          </h1>
          <p className="text-gray-600">实时市场行情</p>
        </div>

        {/* 市场概览 */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h3 className="text-sm text-gray-500 mb-1">24h 总成交量</h3>
            <p className="text-xl font-bold text-gray-900">¥128.5B</p>
            <p className="text-sm text-green-600">+5.2%</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h3 className="text-sm text-gray-500 mb-1">活跃交易对</h3>
            <p className="text-xl font-bold text-gray-900">1,247</p>
            <p className="text-sm text-blue-600">+12</p>
          </div>
        </div>

        {/* 市场列表 */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">热门交易对</h2>
          </div>
          
          <div className="divide-y divide-gray-200">
            {marketData.map((item, index) => (
              <div key={index} className="px-4 py-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">{item.symbol}</h3>
                    <p className="text-sm text-gray-500">现货</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">¥{item.price}</p>
                    <p className={`text-sm ${
                      item.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {item.change}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 图表占位符 */}
        <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">价格走势图</h2>
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center text-gray-500">
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
