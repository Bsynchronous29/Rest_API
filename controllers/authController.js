const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const users = [];

router.post('/auth/login', async (req, res) =>  {
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        console.log(salt);
        console.log(hashedPassword);

        const user = { username: req.body.username, password: req.body.password };
        users.push(user);
        res.status(201).send()
        hash(password);
    }
    catch(err){

    }
});