import db from '../../../utils/db'

export default async (req, res) => {
    const requestBody = JSON.parse(req.body)
    try {
        const { slug } = requestBody
        const entries = await db.collection('entries').get()
        const entriesData = entries.docs.map((entry) => entry.data())
        // if (entriesData.some((entry) => entry.slug === slug)) {
        //     res.status(400).end()
        // } else {
        //     const { id } = await db.collection('entries').add({
        //         ...requestBody,
        //         created: new Date().toISOString(),
        //     })
        //     res.status(200).json({ id })
        // }
        const { id } = await db.collection('entries').add({
            ...requestBody,
            created: new Date().toISOString(),
        })
        res.status(200).json({ id })
    } catch (e) {
        res.status(400).end()
    }
}
