import mongoose from 'mongoose'

export function dropData() {
  afterEach(() => {
    mongoose.connect(process.env.MONGO_URL, () => mongoose.connection.db.dropDatabase())
  });
}