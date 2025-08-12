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
      <div className="page-content p-4">
        {/* 用户信息和总资产 */}
        <div className="bg-card rounded-lg shadow-sm p-6 mb-6 border border-border">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                <span className="text-primary text-lg font-bold">
                  {user?.name?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-card-foreground">{user?.name}</h1>
                <p className="text-sm text-muted-foreground">
                  {user?.email || user?.phone}
                </p>
              </div>
            </div>
            <button
              onClick={logout}
              className="text-destructive hover:text-destructive/80 text-sm"
            >
              {t('common.logout')}
            </button>
          </div>
          
          <div className="border-t border-border pt-4">
            <h2 className="text-sm text-muted-foreground mb-1">总资产价值</h2>
            <p className="text-3xl font-bold text-card-foreground">
              ¥{totalValue.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}
            </p>
            <p className="text-sm text-green-500 mt-1">+¥67.46 (+0.65%)</p>
          </div>
        </div>

        {/* 快捷操作 */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <button className="bg-card rounded-lg shadow-sm p-4 text-center hover:bg-accent border border-border">
            <div className="w-8 h-8 bg-green-500/10 rounded-lg flex items-center justify-center mx-auto mb-2">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <span className="text-xs text-muted-foreground">充值</span>
          </button>
          
          <button className="bg-card rounded-lg shadow-sm p-4 text-center hover:bg-accent border border-border">
            <div className="w-8 h-8 bg-red-500/10 rounded-lg flex items-center justify-center mx-auto mb-2">
              <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </div>
            <span className="text-xs text-muted-foreground">提现</span>
          </button>
          
          <button className="bg-card rounded-lg shadow-sm p-4 text-center hover:bg-accent border border-border">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
              </svg>
            </div>
            <span className="text-xs text-muted-foreground">转账</span>
          </button>
          
          <button className="bg-card rounded-lg shadow-sm p-4 text-center hover:bg-accent border border-border">
            <div className="w-8 h-8 bg-purple-500/10 rounded-lg flex items-center justify-center mx-auto mb-2">
              <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <span className="text-xs text-muted-foreground">记录</span>
          </button>
        </div>

        {/* 资产列表 */}
        <div className="bg-card rounded-lg shadow-sm border border-border">
          <div className="px-4 py-3 border-b border-border">
            <h2 className="text-lg font-semibold text-card-foreground">我的资产</h2>
          </div>
          
          <div className="divide-y divide-border">
            {assets.map((asset, index) => (
              <div key={index} className="px-4 py-4 hover:bg-accent">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center mr-3">
                      <span className="text-muted-foreground font-bold text-sm">{asset.symbol}</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-card-foreground">{asset.name}</h3>
                      <p className="text-sm text-muted-foreground">{asset.amount} {asset.symbol}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-card-foreground">¥{asset.value}</p>
                    <p className={`text-sm ${
                      asset.changeType === 'positive' ? 'text-green-500' : 
                      asset.changeType === 'negative' ? 'text-red-500' : 'text-muted-foreground'
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
        <div className="mt-6 bg-card rounded-lg shadow-sm border border-border">
          <div className="px-4 py-3 border-b border-border">
            <h2 className="text-lg font-semibold text-card-foreground">最近交易</h2>
          </div>
          <div className="p-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-green-500/10 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-card-foreground">买入 BTC</p>
                    <p className="text-xs text-muted-foreground">2024-01-15 14:30</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-card-foreground">0.01234 BTC</p>
                  <p className="text-xs text-muted-foreground">¥520.00</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-red-500/10 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-card-foreground">卖出 ETH</p>
                    <p className="text-xs text-muted-foreground">2024-01-14 09:15</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-card-foreground">0.5 ETH</p>
                  <p className="text-xs text-muted-foreground">¥1,290.00</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 测试内容 - 用于验证滚动和遮罩效果 */}
        <div className="mt-6 space-y-4">
          {Array.from({ length: 10 }, (_, i) => (
            <div key={i} className="bg-card rounded-lg shadow-sm p-4 border border-border">
              <h3 className="font-medium text-card-foreground mb-2">测试内容项 {i + 1}</h3>
              <p className="text-sm text-muted-foreground">
                这是用于测试内容溢出时遮罩效果的测试内容。当内容超出一屏时，顶部和底部应该有遮罩效果来遮挡溢出的内容。
                这样可以确保用户体验的连贯性，同时保证内容不会与顶部banner重叠。
              </p>
            </div>
          ))}
        </div>
      </div>
    </AuthenticatedLayout>
  )
}
