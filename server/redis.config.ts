import { createClient } from "redis";

const redisClient = createClient({
  url: "redis://redis:6379",
});

redisClient.on("error", (err) => {
  console.error("Erreur du client Redis :", err);
});
redisClient.on("connect", () => {
  console.info("Client Redis OK !");
});

export default redisClient;
