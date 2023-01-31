import { Redis } from "ioredis";

const redis = new Redis(process.env.UPSTASH_REDIS_URL!);
redis.on('error', error => {
  console.dir(error)
})

export default redis;