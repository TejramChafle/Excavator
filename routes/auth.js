
// Express
var express     = require('express');
var jwt         = require('jsonwebtoken');
// Models import
var User        = require('../models/User');
var Contact     = require('../models/Contact');
// Router
var router      = express.Router();


/**
 * @swagger
 * /auth:
 *   post:
 *     tags:
 *       - Auth
 *     description: login to application with username and password
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: credentials
 *         description: credentials include username & password
 *         in: body
 *         required: true
 *     responses:
 *       200:
 *         description: Successfully authenticated
 */
// USER LOGIN
router.post("/login", async (req, resp, next) => {
    // CHECK if the username & password matches with the password present in db
    User.findOne({ username: req.body.username, is_active: true }).exec().then(async (user) => {
        // Compare the password to match with the password saved in db
        if (!await user.comparePassword(req.body.password)) {
            // 401: Unauthorized. Authentication failed to due mismatch in credentials.
            resp.status(401).json({
                message: 'Authentication failed!'
            });
        } else {
            // GENERATE jwt token with the expiry time
            const token = jwt.sign({ username: user.username, id: user._id }, process.env.JWT_ACCESS_KEY, { expiresIn: "24h" });

            // TODO: Store the token and other detail in Authentication table

            // GET the contact detail
            Contact.findById(user.contact_id).exec().then(contact => {
                resp.status(201).json({
                    user: contact,
                    token: token
                });
            });
        }
    }).catch(error => {
        console.log('error: ', error);
        resp.status(500).json({
            error: error,
            message: 'Authentication failed!'
        });
    });
});

module.exports = router;
