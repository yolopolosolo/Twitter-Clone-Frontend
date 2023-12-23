import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { Toaster } from 'react-hot-toast'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query' 
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const inter = Inter({ subsets: ['latin'] })

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
  <div className={inter.className}>
    <QueryClientProvider client= {queryClient}>
    <GoogleOAuthProvider clientId='128913756608-t0n442h02q5d3vithpablj17aebr5ojs.apps.googleusercontent.com'>
    <Component {...pageProps} />
    <Toaster/>
    <ReactQueryDevtools/>
    </GoogleOAuthProvider>
    </QueryClientProvider>
  </div>);
}
