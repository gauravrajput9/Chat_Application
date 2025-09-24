import aj from "../utils/arcjet.setup.js";
import { isSpoofedBot } from "@arcjet/inspect";

export const arcjetProtection = async (req, res, next) => {
  try {
    const decision = await aj.protect(req);

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return res.status(429).json({
          message: "Rate Limit Exceeded, Too many requests",
        });
      } else if (decision.reason.isBot()) {
        return res.status(403).json({
          message: "Bot Access denied",
        });
      } else {
        return res.status(403).json({
          message: "Access Denied By Security Policy",
        });
      }
    }

    if (decision.results.some(isSpoofedBot)) {
      return res.status(403).json({
        message: "Malicious Bot Activity Detected",
        error: "Spoofed Bot Detected",
      });
    }

    return next();

  } catch (error) {
    console.error("Arcjet Error: ", error);
    next();
  }
};
