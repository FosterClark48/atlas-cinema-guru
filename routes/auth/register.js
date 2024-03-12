const express = require('express')
const router = express.Router()
const User = require('../../models/User')
const { generateToken } = require('../../utils/tokens')

router.post('/', async (req, res) => {
    User.create({
        username: req.body.username,
        password: req.body.password,
    })
        .then(data => {
            generateToken(data.id, data.username)
                .then(token => res.send({
                    message: 'Registered successfully',
                    accessToken: token,
                }))
                .catch(err => res.status(500).send(err))
        })
        .catch((err) => {
            if (err.name === 'SequelizeUniqueConstraintError') {
                return res.status(400).send({ message: 'Username already exists' });
            }
            // Handle other specific errors as needed
            return res.status(400).send({ message: 'Registration failed', error: err.message });
        })
})

module.exports = router
