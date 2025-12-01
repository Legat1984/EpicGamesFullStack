const { MongoClient } = require('mongodb');

// URL подключения к вашей базе данных
const url = 'mongodb://127.0.0.1:27017/';
const dbName = 'HarryPotterHogwartsBattle';

async function createIndexes() {
    const client = new MongoClient(url);

    try {
        // Подключение к серверу MongoDB
        await client.connect();
        console.log('Connected successfully to server');

        const db = client.db(dbName);
        const collections = await db.listCollections().toArray();

        for (const collection of collections) {
            const collectionName = collection.name;
            console.log(`Creating index on collection: ${collectionName}`);
            await db.collection(collectionName).createIndex({ title: 1 });
        }

        console.log('Indexes created successfully');
    } catch (err) {
        console.error(err);
    } finally {
        // Закрыть подключение
        await client.close();
    }
}

createIndexes().catch(console.error);