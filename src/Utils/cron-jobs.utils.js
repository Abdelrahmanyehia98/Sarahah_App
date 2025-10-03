import cron from "node-cron";
import BlackListedTokens from "../DB/Models/black-listed-tokens.model.js";

cron.schedule("0 0 * * *", async () => {
  try {
    const result = await BlackListedTokens.deleteMany({
      expirationDate: { $lt: new Date() }
    });
    console.log(`Expired tokens deleted: ${result.deletedCount}`);
  } catch (error) {
    console.error("Error deleting expired tokens:", error);
  }
});