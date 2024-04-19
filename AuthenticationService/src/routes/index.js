import express from "express"

const router = express.Router();

const configRoutes = async (app) => {
    app.get('/', (req, res) => {
        return res.status(200).json({ message: 'Welcome to the TRAMMAM university' });
    })
}

module.exports = configRoutes;