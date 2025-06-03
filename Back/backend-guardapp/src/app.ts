import express from 'express';
import cors from 'cors';
import userRoutes from "./routes/routes";


const app = express();

app.use(cors({
    origin: `http://localhost:${process.env.PORT}`,
    credentials: true
}));

app.use(express.json())

app.get("/", (req, res) => {
    res.send(`Hola, Express con TypeScript! ${process.env.PORT}`);
});

app.use('/api',userRoutes);

export default app;