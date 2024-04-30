import express from "express"

const router = express.Router();

const configRoutes = async (app) => {
    app.get('/', (req, res) => {
        return res.status(200).json({ message: 'Welcome to the chat app' });
    })
}

module.exports = configRoutes;