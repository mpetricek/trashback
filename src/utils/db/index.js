import admin from 'firebase-admin'

if (!admin.apps.length) {
    try {
        admin.initializeApp({
            credential: admin.credential.cert(require('./serviceAccountKey.json')),
            databaseURL: 'https://trashback-70b2a-default-rtdb.europe-west1.firebasedatabase.app',
        })
    } catch (error) {
        console.log('Firebase admin initialization error', error.stack)
    }
}
export default admin.firestore()
