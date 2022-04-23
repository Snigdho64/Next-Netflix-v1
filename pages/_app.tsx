import '../styles/globals.css'
import type { AppProps } from 'next/app'
import AuthContextProvider from '../context/AuthContext'
import ModalContextProvider from '../context/ModalContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <ModalContextProvider>
        <Component {...pageProps} />
      </ModalContextProvider>
    </AuthContextProvider>
  )
}

export default MyApp
