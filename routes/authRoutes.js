// routes/authRoutes.js
const dbConn = require('../api');
const express = require('express');
const router = express.Router();
const userRoute = require('../routes/userRoutes');

// Define authentication routes

const userList = [];

router.post('/login', async (req, res) => {
  // Handle login/authentication logic
  try{
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    console.log(salt);
    console.log(hashedPassword);

    const user = { username: req.body.username, password: hashedPassword };
    users.push(user);
    res.status(201).send()
    hash(password);
    
    res.send('POST /login');
    
    }
    catch(err){
        
    }
});

router.post('/user/login', async (req, res) => {
    try {
        // Access users array from userRoutes
        console.log(userList);
        const user = userList.find(user => user.Username == req.body.Username);
        console.log(`User: ${user}`);
        if (!user) {
            return res.status(400).send('User not found.');
        } else {
           return res.send(res.statusCode);
        }
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/users', async (req, resp) => {
    try {
        const users = await getAllUsers();
        userList.push(users);
        return resp.send(users);
    } catch (err) {
        console.error('Error getting users:', err);
        resp.status(500).send('Internal Server Error');
    }
});

router.get('/login/username=:username&password=:password', async (req, resp) => {
    try {
        const username = req.params.username;
        const pass = req.params.password;
        console.log(username);
        console.log(pass);
        const user = await getUserByUsername(username);
        console.log(user);
        if(user!=null && user[0].Password == pass){
            return resp.send(user);
        }
        else{
            return resp.send('Invalid Password');
        }
    } catch (err) {
        console.error('Error getting users:', err);
        resp.status(500).send('Internal Server Error');
    }
});

async function getAllUsers(){
    return dbConn.retrieveData(`Select * from Users WHERE isDeleted != 1`);
}
async function getUserByUsername(username){
    return dbConn.retrieveData(`Select * from Users WHERE isDeleted != 1 and username = '${username}'`);
}

router.post('/register', async (req, res) => {
  // Handle user registration logic
  res.send('POST /register');
});

// Export the router
module.exports = router;