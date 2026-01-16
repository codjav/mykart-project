import { Routes, Route } from 'react-router'
import { HomePage } from './pages/HomePage'
import { CheckoutPage } from './pages/CheckoutPage/CheckoutPage'
import { Orders } from './pages/Orders'
import { Tracking } from './pages/Tracking'
import { NotFoundPage } from './pages/NotFoundPage'
import './App.css'

function App() {
  return (
    <>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path='checkout' element={<CheckoutPage />} />
        <Route path='orders' element={<Orders />} />
        <Route path='tracking' element={<Tracking />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App
