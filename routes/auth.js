
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
 * /auth/login:
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
router.post("/login", async (req, resp) => {

    console.log('User : ', User);
    console.log('req.body : ', req.body);

    // CHECK if the username & password matches with the password present in db
    User.findOne({ username: req.body.username, is_active: true }).populate('user').exec().then(async (user) => {

        console.log('user found : ', user);

        // Compare the password to match with the password saved in db
        if (!await user.comparePassword(req.body.password)) {
            // 401: Unauthorized. Authentication failed to due mismatch in credentials.
            resp.status(401).json({
            message: 'Authentication failed. Your username or password is incorrect!'
            });
        } else {
            // GENERATE jwt token with the expiry time
            const token = jwt.sign({ username: user.username, id: user._id }, process.env.JWT_ACCESS_KEY, { expiresIn: "24h" });

            // TODO: Store the token and other detail in Authentication table
            resp.status(201).json({
                auth: user,
                token: token
            });
        }
    }).catch(error => {
        console.log('Login error :', error);
        resp.status(401).json({
            message: 'Authentication failed. Your username or password is incorrect!'
        });
    });
});

module.exports = router;
