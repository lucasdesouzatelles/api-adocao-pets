const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authRoutes = require('./src/routes/authRoutes');
const userRoutes = require('./src/routes/userRoutes');
const petRoutes = require('./src/routes/petRoutes');
const adoptionRoutes = require('./src/routes/adoptionRoutes');
const errorMiddleware = require('./src/middlewares/errorMiddleware');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'API de adocao de pets em execucao.' });
});

app.use(authRoutes);
app.use('/users', userRoutes);
app.use('/pets', petRoutes);
app.use('/adoptions', adoptionRoutes);

app.use((req, res) => {
    res.status(404).json({ message: 'Rota nao encontrada.' });
});

app.use(errorMiddleware);

module.exports = app;
