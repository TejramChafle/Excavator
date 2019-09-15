var express     = require('express');
var mongoose    = require('mongoose');
var User        = require("../models/User");
var bcrypt      = require('bcrypt');
const auth      = require('../auth');

var router      = express.Router();

/**
 * @swagger
 * /user/signup:
 *   post:
 *     tags:
 *       - User
 *     description: signup to the application with username, password, contact id and role
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: signup params
 *         description: params include username, password, contact id, role, created by, updated by
 *         in: body
 *         required: true
 *     responses:
 *       201:
 *         description: User account created successfully
 */
// USER REGISTRATION : The following request will first check if the entered email is already in use. If not, then create user account
router.post('/signup', (req, resp, next) => {
    User.findOne({ username: req.body.username })
        .exec()
        .then(user => {
            if (user) {
                // 409 : Conflict. The request could not be completed because of a conflict.
                return resp.status(409).json({
                    message: "Username is already in use."
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    console.log('err:', err, 'hash:', hash);
                    if (err) {
                        // 500 : Internal Sever Error. The request was not completed. The server met an unexpected condition.
                        return resp.status(500).json({
                            error: err
                        });
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            contact_id: req.body.contact_id,
                            username: req.body.username,
                            role: req.body.role,
                            password: hash, // Save encrypted password
                            created_by: req.body.created_by,
                            updated_by: req.body.updated_by,
                            created_date: Date.now(),
                            updated_date: Date.now()
                        });

                        user.save()
                            .then(result => {
                                console.log(result);
                                return resp.status(201).json({
                                    message: "User account created successfully",
                                    result: result
                                });
                            })
                            .catch(error => {
                                console.log(error);
                                // 500 : Internal Sever Error. The request was not completed. The server met an unexpected condition.
                                return resp.status(500).json({
                                    error: error
                                });
                            });
                    }
                });
            }
        });
});


/**
* @swagger
* /user/{id}:
*   put:
*     tags:
*       - User
*     description: Updates a single user
*     produces: application/json
*     parameters:
*       name: user info
*       in: body
*       description: Fields to update the user information include username, password and role (also updated by is required)
*       schema:
*         type: json
*         $ref: '#/definitions/User'
*     responses:
*       201:
*         description: User account updated successfully.
*/
// Update user in user document. Change username, password and deativate account.
router.put('/:id', auth, async (req, resp, next) => {

    // If the request if for change password, then encrypt the password
    if (req.body.password) {
        req.body.password = await encrypt(req.body.password);
    }

    User.findByIdAndUpdate(req.params.id, req.body, (error, result) => {
        // 500 : Internal Sever Error. The request was not completed. There could be an id mismatch or data validation error.
        if (error) return resp.status(500).json({
            error: error
        });

        resp.status(201).json({
            message: "User account updated successfully.",
            result: result
        });
    });
});



/**
 * @swagger
 * /user:
 *   get:
 *     tags:
 *       - User
 *     description: Returns all users
 *     security:
 *       - bearerAuth: []
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of users
 */
// Get users
router.get('/', auth, (req, resp, next) => {
    User.find((err, users) => {
        if (err) return resp.status(500).json({
            error: error
        });
        resp.json(users);
    });
});

module.exports = router;

// Perform the encryption of the password with the bcrypt
encrypt = async function (password) {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, (err, hash) => {
            resolve(hash);
        }, reject);
    });
}
