const router = require('express').Router();

const Users = require("./usersModel.js");

router.get("/", (req, res) => {
    Users.find()
        .then(users => {
            if (users.length === 0 ) {
                res.json({messages: "There are no users currently"})
            } else {
                res.status(200).json(users)
            }
        })
        .catch(error => {
            res.status(500).json({error: "Error fetching users . . ."})
        });
});

module.exports = router;