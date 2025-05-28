const express = require('express');
const router = express.Router();
const Offer = require('../models/Offer');

// Get all offers
router.get('/', async (req, res) => {
    const offers = await Offer.find();
    res.json(offers);
});

// Add a new offer
router.post('/', async (req, res) => {
    const { title, description, type, owner } = req.body;
    const offer = new Offer({ title, description, type, owner });
    await offer.save();
    res.status(201).json(offer);
});

module.exports = router;
