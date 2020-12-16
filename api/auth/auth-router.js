const bcryptjs = require('bcryptjs');
const Users = require('../users/user-modal');
const tokenMaker = require('./token-maker');
const router = require('express').Router();
const checkUserExists = require('./check-user-exists');
const checkUniqueUser = require('./checkUniqueUser');
const checkPayload = require('./check-payload');



router.post("/register", checkPayload, checkUniqueUser, async (req, res) => {
    const { username, password, department } = req.body;
    console.log('registering');
  
    try {
        const hash = bcryptjs.hashSync(password, 8);
        const newUser = await Users.add({username: username, password: hash, department: department })
        res.status(201).json(newUser)
    } catch (e) {
        res.status(500).json(e.message)
    }
  });

router.post("/login", checkPayload, checkUserExists, (req, res) => {
    const { username, password, department } = req.body;
      Users.findBy({ username: username })
        .then(([user]) => {
          const verifies = bcryptjs.compareSync(password, user.password)
          if (verifies) {
            const token = tokenMaker(user);
  
            res.status(200).json({
              message: "Welcome  " + user.username,
              token,
            });
          } else {
            res.status(401).json({ message: "Invalid credentials" });
          }
        })
        .catch(error => {
          res.status(500).json({ message: error.message });
        });
});
    
  
router.get('/logout', (req, res) => {
    const token = req.headers.authorization

  if (!token) {
    res.status(401).json('not logged in.')
  } else {
    req.headers.authorization = 0
      if (err) {
        res.status(401).json('Invalid Token: ' + err.message)
      } else {
       res.status(200).json({ message: 'You have logged out.'})
      }
    }
  });

module.exports = router;