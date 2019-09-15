var express     = require('express');
var mongoose    = require('mongoose');
var Contact     = require('../models/Contact');
const auth      = require('../auth');

var router      = express.Router();

/**
 * @swagger
 * /contact:
 *   get:
 *     tags:
 *       - Contact
 *     description: Returns all contacts
 *     security:
 *       - bearerAuth: []
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of contacts
 */
// GET CONTACTS (Only active) WITH filter & pagination
router.get('/', auth, (req, resp) => {
    console.log('search params : ', req.params);
    Contact.where({ is_active: true }).exec().then(contacts => {
        return resp.status(200).json(contacts);
    }).catch(error => {
        console.log('error : ', error);
        // 500 : Internal Sever Error. The request was not completed. The server met an unexpected condition.
        return resp.status(500).json({
            error: error
        });
    });
});


/**
 * @swagger
 * /contact/{id}:
 *   get:
 *     tags:
 *       - Contact
 *     description: Returns a single contact
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Contact's id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: A single contact
 */

// GET SINGLE CONTACT BY ID
router.get('/:id', auth, (req, resp, next) => {
    Contact.findById(req.params.id).exec().then(contact => {
        return resp.status(200).json(contact);
    }).catch(error => {
        console.log('error : ', error);
        // 204 : No content. There is no content to send for this request, but the headers may be useful.
        return resp.status(204).json({
            error: error
        });
    });
});


/**
 * @swagger
 * /contact:
 *   post:
 *     tags:
 *       - Contact
 *     description: Creates a new contact
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: contact
 *         description: Contact object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Contact'
 *     responses:
 *       201:
 *         description: Contact created successfully
 */
// SAVE CONTACT
router.post('/', auth, (req, resp, next) => {
    // First check if the conact with firstname, lastname and mobile number already exists.
    Contact.findOne({ firstname: req.body.firstname, lastname: req.body.lastname, mobile: req.body.mobile, is_active: true })
        .exec()
        .then(contact => {
            // If the contact with firstname, lastname and mobile number already exists, then return error
            if (contact) {
                // 409 : Conflict. The request could not be completed because of a conflict.
                return resp.status(409).json({
                    message: "The contact with name " + req.body.firstname + " " + req.body.lastname + " and mobile number " + req.body.mobile + " already exist."
                });
            } else {
                // Since the user doesn't exist, then save the detail
                console.log(req.body);
                const contact = new Contact({
                    _id: new mongoose.Types.ObjectId(),
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    gender: req.body.gender,
                    email: req.body.email,
                    mobile: req.body.mobile,
                    created_by: req.body.created_by,
                    updated_by: req.body.updated_by,
                    created_date: Date.now(),
                    updated_date: Date.now()
                });

                contact.save()
                    .then(result => {
                        console.log(result);
                        return resp.status(201).json({
                            message: "Contact created successfully",
                            result: result
                        });
                    })
                    .catch(error => {
                        console.log('error : ', error);
                        // 500 : Internal Sever Error. The request was not completed. The server met an unexpected condition.
                        return resp.status(500).json({
                            error: error
                        });
                    });
            }
        }).catch(error => {
            console.log('error : ', error);
            // 500 : Internal Sever Error. The request was not completed. The server met an unexpected condition.
            return resp.status(500).json({
                error: error
            });
        });
});

/**
* @swagger
* /contact/{id}:
*   put:
*     tags:
*       - Contact
*     description: Updates a single contact
*     produces: application/json
*     parameters:
*       name: contact
*       in: body
*       description: Fields for the Contact resource
*       schema:
*         type: array
*         $ref: '#/definitions/Contact'
*     responses:
*       200:
*         description: Successfully updated
*/
// UPDATE CONTACT
router.put('/:id', auth, (req, resp, next) => {
    Contact.findByIdAndUpdate(req.params.id, req.body).exec().then(contact => {
        return resp.status(200).json(contact);
    }).catch(error => {
        // 500 : Internal Sever Error. The request was not completed. The server met an unexpected condition.
        return resp.status(500).json({
            error: error
        });
    });
});


/**
 * @swagger
 * /contact/{id}:
 *   delete:
 *     tags:
 *       - Contact
 *     description: Deletes a single contact
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Contact's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted
 */
// DELETE CONTACT (Hard delete. This will delete the entire contact detail. Only application admin should be allowed to perform this action )
router.delete('/:id', auth, (req, resp, next) => {
    Contact.findByIdAndRemove(req.params.id).exec().then(contact => {
        return resp.status(200).json(contact);
    }).catch(error => {
        console.log('error : ', error);
        // 500 : Internal Sever Error. The request was not completed. The server met an unexpected condition.
        return resp.status(500).json({
            error: error
        });
    });
});

module.exports = router;
