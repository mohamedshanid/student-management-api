import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3000; // or any port you set

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});