import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './LoginPage.jsx'
import AdminPage from './AdminPage.jsx'
import ManagerPage from './ManagerPage.jsx'
import Unauthorized from './Unauthorized.jsx'
import RequireRole from './RequireRole.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={
          <RequireRole role="admin">
            <AdminPage />
          </RequireRole>
        } />
        <Route path="/gestionnaire" element={
          <RequireRole role="gestionnaire">
            <ManagerPage />
          </RequireRole>
        } />
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
