import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());

// Adicione suas rotas ou configurações do servidor aqui

app.listen(port, () => {
  console.log(`API rodando na porta ${port}`);
});
