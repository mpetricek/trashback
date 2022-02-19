import Layout from '../components/Layout'
import { SessionProvider } from 'next-auth/react'
import 'tailwindcss/tailwind.css'
import '../styles.css'
//test
export default function MyApp({ Component, pageProps: { session, ...pageProps } }) {
    return (
        <SessionProvider session={session}>
            <Layout {...pageProps}>
                <Component {...pageProps} />
            </Layout>
        </SessionProvider>
    )
}
