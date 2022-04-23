import React, { createContext, useEffect, useMemo, useState } from 'react'
import {
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  User,
  onAuthStateChanged,
} from 'firebase/auth'
import { ContextType } from '../types/types'
import { auth } from '../firebaseConfig'
import { useRouter } from 'next/router'

export const AuthContext = createContext<ContextType>({
  user: null,
  signin: async (email: string, password: string) => Promise,
  signup: async (email: string, password: string) => Promise,
  logout: async () => Promise,
  error: null,
  loading: false,
})

const AuthContextProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const router = useRouter()

  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        setLoading(true)
        if (!user) {
          setUser(null)
          setLoading(false)
          return router.push('/login')
        } else {
          setUser(user)
          setLoading(false)
        }
      }),
    [auth]
  )

  useEffect(() => {
    if (error) alert(error)
    setTimeout(() => setError(null), 4000)
  }, [error])

  const signin = async (email: string, password: string) => {
    setLoading(true)
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )
      setUser(userCredential.user)
      router.push('/')
    } catch (error: any) {
      setError(error.message)
    }
    setLoading(false)
  }

  const signup = async (email: string, password: string) => {
    setLoading(true)
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      setUser(userCredential.user)
      router.push('/')
    } catch (error: any) {
      setError(error.message)
    }
    setLoading(false)
  }

  const logout = async () => {
    setLoading(true)
    try {
      await signOut(auth)
    } catch (error: any) {
      setError(error.message)
    }
    setLoading(false)
  }

  const memoizedValue = useMemo(
    () => ({
      user,
      signup,
      signin,
      logout,
      error,
      loading,
    }),
    [user, error, loading]
  )

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
