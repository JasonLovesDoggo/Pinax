import { Redis } from "@upstash/redis";

const kv = Redis.fromEnv();

export default kv;
