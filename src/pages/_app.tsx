import Layout from '../components/Layout'
import 'tailwindcss/tailwind.css'
import '../styles.css'
//test
export default function MyApp({ Component, pageProps }) {
    return (
        <Layout {...pageProps}>
            <Component {...pageProps} />
        </Layout>
    )
}
