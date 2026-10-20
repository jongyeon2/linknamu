import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

const globalForMongo = globalThis as unknown as {
  mongoClientPromise?: Promise<MongoClient>;
};

// MONGODB_URI가 없으면 null을 반환해 클릭 집계만 건너뜁니다.
export function getMongoClient(): Promise<MongoClient> | null {
  if (!uri) return null;

  // 개발 모드의 HMR 재로딩 시에도 연결을 재사용합니다.
  if (!globalForMongo.mongoClientPromise) {
    globalForMongo.mongoClientPromise = new MongoClient(uri).connect();
  }
  return globalForMongo.mongoClientPromise;
}
