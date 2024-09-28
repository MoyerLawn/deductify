import express from 'express';
import MainController from './src/controllers/MainController.js';

const app = express();
const mainController = new MainController();

app.use(express.json());

// Define a root route
app.get('/', (req, res) => {
    res.send('Welcome to the Deductify API!'); // Response for root URL
});

// Define your API routes
app.post('/api/pinata/:action', (req, res) => mainController.handlePinataRequests(req, res));

app.get('/api/health-check', (req, res) => mainController.healthCheck(req, res));
app.get('/api/info', (req, res) => mainController.apiInfo(req, res));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
