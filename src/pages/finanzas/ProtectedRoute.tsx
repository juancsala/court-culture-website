import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem('finanzas_token')
  if (!token) return <Navigate to="/finanzas/login" replace />
  return <>{children}</>
}
