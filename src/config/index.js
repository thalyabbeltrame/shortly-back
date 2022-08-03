import { config as dotenvConfig } from "dotenv";

const path = process.env.NODE_ENV === "prod" ? ".env.prod" : ".env.dev";

dotenvConfig({ path });
