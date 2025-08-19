'use client'

import AuthenticatedLayout from '@/components/layout/AuthenticatedLayout'
import BTCChart from '@/components/chart/BTCChart'
import { useTranslation } from 'react-i18next'

export default function BTCPage() {
  const { t } = useTranslation('common')

  // 模拟买卖盘数据
  const orderBookData = {
    asks: [
      { price: 42385.50, amount: 0.125, total: 0.125 },
      { price: 42380.20, amount: 0.234, total: 0.359 },
      { price: 42375.80, amount: 0.567, total: 0.926 },
      { price: 42370.40, amount: 0.892, total: 1.818 },
      { price: 42365.10, amount: 1.245, total: 3.063 },
    ],
    bids: [
      { price: 42350.00, amount: 0.156, total: 0.156 },
      { price: 42345.60, amount: 0.289, total: 0.445 },
      { price: 42340.30, amount: 0.678, total: 1.123 },
      { price: 42335.90, amount: 0.934, total: 2.057 },
      { price: 42330.50, amount: 1.456, total: 3.513 },
    ]
  }

  // 模拟最近交易数据
  const recentTrades = [
    { price: 42350.00, amount: 0.025, time: '14:32:15', type: 'buy' },
    { price: 42348.50, amount: 0.156, time: '14:32:08', type: 'sell' },
    { price: 42351.20, amount: 0.089, time: '14:31:55', type: 'buy' },
    { price: 42347.80, amount: 0.234, time: '14:31:42', type: 'sell' },
    { price: 42352.10, amount: 0.067, time: '14:31:28', type: 'buy' },
    { price: 42349.90, amount: 0.178, time: '14:31:15', type: 'sell' },
  ]

  return (
    <AuthenticatedLayout>
      <div className="page-content p-4 max-w-7xl mx-auto">
        {/* 页面标题 */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Bitcoin (BTC) 交易
          </h1>
          <p className="text-muted-foreground">实时BTC/USDT行情与交易</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* K线图区域 */}
          <div className="lg:col-span-3">
            <div className="bg-card rounded-lg shadow-sm p-6 border border-border">
              <BTCChart height={200} />
            </div>
          </div>

          {/* 交易面板 */}
          <div className="lg:col-span-1">
            {/* 买卖盘 */}
            <div className="bg-card rounded-lg shadow-sm p-4 border border-border mb-6">
              <h3 className="text-lg font-semibold text-card-foreground mb-4">买卖盘</h3>
              
              {/* 卖盘 */}
              <div className="mb-4">
                <div className="flex justify-between text-xs text-muted-foreground mb-2">
                  <span>价格(USDT)</span>
                  <span>数量(BTC)</span>
                  <span>累计</span>
                </div>
                {orderBookData.asks.reverse().map((ask, index) => (
                  <div key={index} className="flex justify-between text-xs py-1 text-red-500">
                    <span>{ask.price.toFixed(2)}</span>
                    <span>{ask.amount.toFixed(3)}</span>
                    <span>{ask.total.toFixed(3)}</span>
                  </div>
                ))}
              </div>

              {/* 当前价格 */}
              <div className="border-y border-border py-2 my-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-green-500">42,350.00</div>
                  <div className="text-xs text-muted-foreground">≈ ¥306,530.00</div>
                </div>
              </div>

              {/* 买盘 */}
              <div>
                {orderBookData.bids.map((bid, index) => (
                  <div key={index} className="flex justify-between text-xs py-1 text-green-500">
                    <span>{bid.price.toFixed(2)}</span>
                    <span>{bid.amount.toFixed(3)}</span>
                    <span>{bid.total.toFixed(3)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 最近交易 */}
            <div className="bg-card rounded-lg shadow-sm p-4 border border-border">
              <h3 className="text-lg font-semibold text-card-foreground mb-4">最近交易</h3>
              
              <div className="flex justify-between text-xs text-muted-foreground mb-2">
                <span>价格(USDT)</span>
                <span>数量(BTC)</span>
                <span>时间</span>
              </div>
              
              {recentTrades.map((trade, index) => (
                <div key={index} className="flex justify-between text-xs py-1">
                  <span className={trade.type === 'buy' ? 'text-green-500' : 'text-red-500'}>
                    {trade.price.toFixed(2)}
                  </span>
                  <span className="text-card-foreground">{trade.amount.toFixed(3)}</span>
                  <span className="text-muted-foreground">{trade.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 交易表单区域 */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 买入表单 */}
          <div className="bg-card rounded-lg shadow-sm p-6 border border-border">
            <h3 className="text-lg font-semibold text-card-foreground mb-4 text-green-500">买入 BTC</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-muted-foreground mb-1">价格 (USDT)</label>
                <input 
                  type="number" 
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                  placeholder="42,350.00"
                  defaultValue="42350.00"
                />
              </div>
              
              <div>
                <label className="block text-sm text-muted-foreground mb-1">数量 (BTC)</label>
                <input 
                  type="number" 
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                  placeholder="0.001"
                />
              </div>
              
              <div>
                <label className="block text-sm text-muted-foreground mb-1">总额 (USDT)</label>
                <input 
                  type="number" 
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                  placeholder="42.35"
                />
              </div>
              
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>可用余额:</span>
                <span>1,000.00 USDT</span>
              </div>
              
              <button className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md">
                买入 BTC
              </button>
            </div>
          </div>

          {/* 卖出表单 */}
          <div className="bg-card rounded-lg shadow-sm p-6 border border-border">
            <h3 className="text-lg font-semibold text-card-foreground mb-4 text-red-500">卖出 BTC</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-muted-foreground mb-1">价格 (USDT)</label>
                <input 
                  type="number" 
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                  placeholder="42,350.00"
                  defaultValue="42350.00"
                />
              </div>
              
              <div>
                <label className="block text-sm text-muted-foreground mb-1">数量 (BTC)</label>
                <input 
                  type="number" 
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                  placeholder="0.001"
                />
              </div>
              
              <div>
                <label className="block text-sm text-muted-foreground mb-1">总额 (USDT)</label>
                <input 
                  type="number" 
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                  placeholder="42.35"
                />
              </div>
              
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>可用余额:</span>
                <span>0.025 BTC</span>
              </div>
              
              <button className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-md">
                卖出 BTC
              </button>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}
