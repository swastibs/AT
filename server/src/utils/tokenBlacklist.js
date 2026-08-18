const redis = require("../config/redis");

const BLACKLIST_PREFIX = "bl:";

const blacklistToken = async (token, exp) => {
  const now = Math.floor(Date.now() / 1000);
  const ttl = exp - now;
  if (ttl <= 0) return;

  await redis.setex(`${BLACKLIST_PREFIX}${token}`, ttl, "1");
};

const isTokenBlacklisted = async (token) => {
  const result = await redis.get(`${BLACKLIST_PREFIX}${token}`);
  return result === "1";
};

module.exports = { blacklistToken, isTokenBlacklisted };
