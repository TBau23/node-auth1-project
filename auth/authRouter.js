const router = require('express').Router();
const bcryptjs = require("bcryptjs");

const Users = require("../users/usersModel.js");

router.post("/register", (req, res) => {
    const credentials = req.body;

    // validate the credentials, if they pass, proceed
    // hash the password before saving the user
    const rounds = Number(process.env.HASH_ROUNDS) || 6;

    const hash = bcryptjs.hashSync(credentials.password, rounds);

    credentials.password = hash;

    Users.add(credentials)
        .then(user => {
            res.status(201).json({message: `Successfully registered ${user.username}`});
        })
        .catch(err => {
            res.json({error: err})
        })
});
// current bug - seeded users aren't able to login successfully
// but newly created users work just fine
router.post("/login", (req, res) => {
    const credentials = req.body;

    Users.findBy({username: credentials.username})
        .then(users => {
            const user = users[0];

            if (user && bcryptjs.compareSync(credentials.password, user.password)) {
                req.session.username = user.username;
                res.status(200).json({
                    message: "Access permitted",
                    username: req.username
                });
            } else {
                res.status(401).json({message: "invalid credentials"});
            }
        })
        .catch(err => {
            res.json({message: err});
        })
});

router.get('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy(err => {
            if (err) {
                res.status(500).json({message : "Failed to logout please try again"})
            } else {
                res.status(204).end();
            }
        });
    } else {
        res.status(204).end()
    }
})



module.exports = router;
