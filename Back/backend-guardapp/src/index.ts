import 'reflect-metadata';
import app from "./app";
import dotenv from "dotenv";
import { AppDataSource } from "./db";

dotenv.config();
const PORT = process.env.PORT || 3000;

(async () => {
    try {
        await AppDataSource.initialize();
        app.listen(PORT);
        // console.log(`Server running on port http://localhost:${PORT}`);
        console.warn(`Server running on port http://localhost:${PORT}`);
    } catch (error) {
        console.error(error);
    }
})();