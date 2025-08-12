'use client'

import AuthenticatedLayout from '@/components/layout/AuthenticatedLayout'
import { useAuthStore } from '@/store/authStore'
import { useTranslation } from 'react-i18next'

export default function AssetsPage() {
  const { user, logout } = useAuthStore()
  const { t } = useTranslation('common')

  // 模拟资产数据
  const assets = [
    {
      symbol: 'BTC',
      name: '比特币',
      amount: '0.05234',
      value: '2,214.50',
      change: '+156.78',
      changePercent: '+7.62%',
      changeType: 'positive'
    },
    {
      symbol: 'ETH',
      name: '以太坊',
      amount: '1.2456',
      value: '3,214.72',
      change: '-89.32',
      changePercent: '-2.70%',
      changeType: 'negative'
    },
    {
      symbol: 'USDT',
      name: 'Tether',
      amount: '5,000.00',
      value: '5,000.00',
      change: '0.00',
      changePercent: '0.00%',
      changeType: 'neutral'
    }
  ]

  const totalValue = assets.reduce((sum, asset) => sum + parseFloat(asset.value.replace(',', '')), 0)

  return (
    <AuthenticatedLayout>
      <div className="p-4">
        {/* 用户信息和总资产 */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-blue-600 text-lg font-bold">
                  {user?.name?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{user?.name}</h1>
                <p className="text-sm text-gray-500">
                  {user?.email || user?.phone}
                </p>
              </div>
            </div>
            <button
              onClick={logout}
              className="text-red-600 hover:text-red-700 text-sm"
            >
              {t('common.logout')}
            </button>
          </div>
          
          <div className="border-t pt-4">
            <h2 className="text-sm text-gray-500 mb-1">总资产价值</h2>
            <p className="text-3xl font-bold text-gray-900">
              ¥{totalValue.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}
            </p>
            <p className="text-sm text-green-600 mt-1">+¥67.46 (+0.65%)</p>
          </div>
        </div>

        {/* 快捷操作 */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <button className="bg-white rounded-lg shadow-sm p-4 text-center hover:bg-gray-50">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <span className="text-xs text-gray-600">充值</span>
          </button>
          
          <button className="bg-white rounded-lg shadow-sm p-4 text-center hover:bg-gray-50">
            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </div>
            <span className="text-xs text-gray-600">提现</span>
          </button>
          
          <button className="bg-white rounded-lg shadow-sm p-4 text-center hover:bg-gray-50">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
              </svg>
            </div>
            <span className="text-xs text-gray-600">转账</span>
          </button>
          
          <button className="bg-white rounded-lg shadow-sm p-4 text-center hover:bg-gray-50">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <span className="text-xs text-gray-600">记录</span>
          </button>
        </div>

        {/* 资产列表 */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-4 py-3 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">我的资产</h2>
          </div>
          
          <div className="divide-y divide-gray-200">
            {assets.map((asset, index) => (
              <div key={index} className="px-4 py-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-gray-600 font-bold text-sm">{asset.symbol}</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{asset.name}</h3>
                      <p className="text-sm text-gray-500">{asset.amount} {asset.symbol}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">¥{asset.value}</p>
                    <p className={`text-sm ${
                      asset.changeType === 'positive' ? 'text-green-600' : 
                      asset.changeType === 'negative' ? 'text-red-600' : 'text-gray-500'
                    }`}>
                      {asset.change} ({asset.changePercent})
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 最近交易 */}
        <div className="mt-6 bg-white rounded-lg shadow-sm">
          <div className="px-4 py-3 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">最近交易</h2>
          </div>
          <div className="p-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">买入 BTC</p>
                    <p className="text-xs text-gray-500">2024-01-15 14:30</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">0.01234 BTC</p>
                  <p className="text-xs text-gray-500">¥520.00</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">卖出 ETH</p>
                    <p className="text-xs text-gray-500">2024-01-14 09:15</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">0.5 ETH</p>
                  <p className="text-xs text-gray-500">¥1,290.00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}
