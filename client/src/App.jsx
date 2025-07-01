import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Register from './pages/Register'
import ProtectedRoute from './components/ProtectedRoute'
import ProductListPage from './pages/ProductListPage'
import ProductDetailPage from './pages/ProductDetailPage'
import Footer from './components/Footer'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div style={{ paddingTop: '80px' }}>
        <Routes>
          <Route path='/' element={
            <ProtectedRoute>
              <ProductListPage />
            </ProtectedRoute>
          } />
          <Route path='/product/:id' element={<ProtectedRoute><ProductDetailPage /></ProtectedRoute>} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter >
  )
}

export default App
