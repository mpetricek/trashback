import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { FirebaseAdapter } from '@next-auth/firebase-adapter'
import { getFirestore } from 'firebase/firestore/lite'
import { initializeApp } from 'firebase/app'

const firestore = initializeApp({
    apiKey: 'AIzaSyCuadwW0XB13_cffc2aCQ_wpykqbZNRokc',
    authDomain: 'trashback-70b2a.firebaseapp.com',
    databaseURL: 'https://trashback-70b2a-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'trashback-70b2a',
    storageBucket: 'trashback-70b2a.appspot.com',
    messagingSenderId: '208676231093',
    appId: '1:208676231093:web:a1f2d45a984153ed9c6bfc',
    measurementId: 'G-QTKW3ENV09',
})

const lala = getFirestore(firestore)
console.log(lala)
export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorizationUrl:
                'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code',
        }),
        // ...add more providers here
    ],
    adapter: FirebaseAdapter(lala),
})
