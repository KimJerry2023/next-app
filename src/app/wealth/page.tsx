'use client'

import AuthenticatedLayout from '@/components/layout/AuthenticatedLayout'
import { useTranslation } from 'react-i18next'

export default function WealthPage() {
  const { t } = useTranslation('common')

  // 模拟理财产品数据
  const wealthProducts = [
    {
      id: 1,
      name: '稳健增长基金',
      type: '基金',
      rate: '6.8%',
      risk: '低风险',
      minAmount: '1,000',
      duration: '90天',
      description: '稳健投资，风险较低'
    },
    {
      id: 2,
      name: '高收益债券',
      type: '债券',
      rate: '8.5%',
      risk: '中风险',
      minAmount: '5,000',
      duration: '180天',
      description: '中等风险，收益可观'
    },
    {
      id: 3,
      name: '量化策略基金',
      type: '基金',
      rate: '12.3%',
      risk: '高风险',
      minAmount: '10,000',
      duration: '365天',
      description: '高风险高收益，适合风险承受能力强的投资者'
    }
  ]

  const myInvestments = [
    {
      id: 1,
      name: '稳健增长基金',
      amount: '50,000',
      currentValue: '52,340',
      profit: '+2,340',
      profitRate: '+4.68%'
    },
    {
      id: 2,
      name: '高收益债券',
      amount: '20,000',
      currentValue: '20,850',
      profit: '+850',
      profitRate: '+4.25%'
    }
  ]

  return (
    <AuthenticatedLayout>
      <div className="p-4">
        {/* 页面标题 */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {t('navigation.wealth')}
          </h1>
          <p className="text-gray-600">理财产品与投资管理</p>
        </div>

        {/* 资产概览 */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">投资概览</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-1">总投资</p>
              <p className="text-xl font-bold text-gray-900">¥70,000</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-1">当前价值</p>
              <p className="text-xl font-bold text-green-600">¥73,190</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-1">总收益</p>
              <p className="text-xl font-bold text-green-600">+¥3,190</p>
            </div>
          </div>
        </div>

        {/* 我的投资 */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="px-4 py-3 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">我的投资</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {myInvestments.map((investment) => (
              <div key={investment.id} className="px-4 py-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{investment.name}</h3>
                  <span className="text-sm text-green-600">{investment.profitRate}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>投资金额: ¥{investment.amount}</span>
                  <span>当前价值: ¥{investment.currentValue}</span>
                </div>
                <div className="mt-1 text-sm text-green-600">
                  收益: {investment.profit}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 推荐产品 */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-4 py-3 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">推荐产品</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {wealthProducts.map((product) => (
              <div key={product.id} className="px-4 py-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 mb-1">{product.name}</h3>
                    <p className="text-sm text-gray-500 mb-2">{product.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>类型: {product.type}</span>
                      <span>风险: {product.risk}</span>
                      <span>期限: {product.duration}</span>
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <div className="text-lg font-bold text-green-600 mb-1">
                      {product.rate}
                    </div>
                    <div className="text-xs text-gray-500">
                      年化收益率
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      起投: ¥{product.minAmount}
                    </div>
                  </div>
                </div>
                <button className="w-full mt-3 bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                  立即投资
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}
