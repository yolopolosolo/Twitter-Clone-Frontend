import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { Toaster } from 'react-hot-toast' 

const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
  return (
  <div className={inter.className}>
    <GoogleOAuthProvider clientId='128913756608-t0n442h02q5d3vithpablj17aebr5ojs.apps.googleusercontent.com'>
    <Component {...pageProps} />
    <Toaster/>
    </GoogleOAuthProvider>
  </div>);
}
