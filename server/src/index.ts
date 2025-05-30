import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config()

const app = express()
const port = 5000;

const allowedOrigins = (process.env.CLIENT_ORIGINS || '').split(',');
app.use(cors({
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin || '')) {
      callback(null, true);
    } else {
      console.warn(`Blocked by CORS: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

app.get("/", async (req, res) => {
  res.status(200).send("Hello World!");
});

app.get("/todos", async (_, res) => {
  const q = "SELECT * FROM todos ORDER BY id";
  const result = await pool.query(q);
  res.json(result.rows);
});

app.post("/todos", async (req, res) => {
  const { title } = req.body;
  const result = await pool.query(
    "INSERT INTO todos (title) VALUES ($1) RETURNING *",
    [title]
  );
  res.status(201).json(result.rows[0])
});

app.put("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  const result = await pool.query(
    "UPDATE todos SET completed = $1 WHERE id = $2 RETURNING *",
    [completed, id]
  );
  res.json(result.rows[0]);
});

app.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM todos WHERE id = $1", [id]);
  res.sendStatus(204);
});

app.listen(port, () => console.log(`Server running on port ${port}`));