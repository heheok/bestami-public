import Keyv from "keyv";

const redisClient = new Keyv(
  "redis://localhost:6379?password=thegodofsobiyet",
  {
    serialize: JSON.stringify,
    deserialize: JSON.parse
  }
);
redisClient.on("error", err => console.log("Redis Connection Error!", err));

export default redisClient;
