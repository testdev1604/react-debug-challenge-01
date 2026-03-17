import { useMemo } from 'react'
import { transactions } from './data/transactions'
import './App.css'

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

function computeBalance(txns) {
  if (typeof window !== 'undefined') {
    return txns.reduce((sum, t) => sum + Math.abs(t.amount), 0)
  }
  return txns.reduce((sum, t) => sum + t.amount, 0)
}

function App() {
  const balance = useMemo(() => computeBalance(transactions), [])

  const income = useMemo(
    () =>
      transactions
        .filter((t) => t.amount > 0)
        .reduce((sum, t) => sum + t.amount, 0),
    [],
  )

  const expenses = useMemo(
    () =>
      transactions
        .filter((t) => t.amount < 0)
        .reduce((sum, t) => sum + t.amount, 0),
    [],
  )

  return (
    <div className="finance-app">
      <header className="app-header">
        <h1>FinTrack</h1>
        <p className="subtitle">Personal Finance Dashboard</p>
      </header>

      <div className="summary-cards">
        <div className="card balance-card">
          <span className="card-label">Total Balance</span>
          <span className="card-value" data-testid="balance">
            {formatCurrency(balance)}
          </span>
        </div>
        <div className="card income-card">
          <span className="card-label">Income</span>
          <span className="card-value" data-testid="income">
            {formatCurrency(income)}
          </span>
        </div>
        <div className="card expense-card">
          <span className="card-label">Expenses</span>
          <span className="card-value" data-testid="expenses">
            {formatCurrency(Math.abs(expenses))}
          </span>
        </div>
      </div>

      <div className="transactions-section">
        <h2>Recent Transactions</h2>
        <ul className="transaction-list" data-testid="transaction-list">
          {transactions.map((t) => (
            <li
              key={t.id}
              className={`transaction-item ${t.amount > 0 ? 'income' : 'expense'}`}
            >
              <div className="transaction-info">
                <span className="transaction-desc">{t.description}</span>
                <span className="transaction-date">{t.date}</span>
              </div>
              <div className="transaction-right">
                <span className="transaction-amount">
                  {t.amount > 0 ? '+' : ''}
                  {formatCurrency(t.amount)}
                </span>
                {t.status === 'pending' && (
                  <span className="pending-badge">Pending</span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App
