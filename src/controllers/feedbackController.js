const express = require('express')

const Feedback = require('../models/Feedback')

const router = express.Router();

router.post('/',  async (req, res) => {
    try {
        const { title, description, order } = req.body;

        const feedback = await Feedback.create({ title, description, order, author: req.userId });

        return res.send({ 
            feedback,
            message: 'Feedback sent successfuly'
        })
    } catch (err) {
        return res.status(400).send({error: 'failed to send feedback'})
    }
});

router.get('/', async (req, res) => {
    try {
        const feedback = await Feedback.find().populate(['author', 'order']);
        
        return res.send({ feedback })

    } catch (err) {
        return res.status(400).send({error: 'Failed to list a feedback'})
    }
});


module.exports = app => app.use('/feedback', router);