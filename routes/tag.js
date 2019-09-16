var express     = require('express');
var mongoose    = require('mongoose');
var Tag     = require('../models/Tag');
const auth      = require('../auth');

var router      = express.Router();

/**
 * @swagger
 * /tag:
 *   get:
 *     tags:
 *       - Tag
 *     description: Returns all tags
 *     security:
 *       - bearerAuth: []
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of tags
 */
// GET TAGS (Only active)
router.get('/', auth, (req, resp) => {
    Tag.where({ is_active: true }).exec().then(tags => {
        return resp.status(200).json(tags);
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
 * /tag:
 *   post:
 *     tags:
 *       - Tag
 *     description: Creates a new tag
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: tag
 *         description: Tag object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Tag'
 *     responses:
 *       201:
 *         description: Tag created successfully
 */
// SAVE TAG
router.post('/', auth, (req, resp, next) => {
    // First check if the tag with name and purpose already exists.
    Tag.findOne({ name: req.body.name, purpose: req.body.purpose, is_active: true })
        .exec()
        .then(tag => {
            // If the tag with name and purpose already exists, then return error
            if (tag) {
                // 409 : Conflict. The request could not be completed because of a conflict.
                return resp.status(409).json({
                    message: "This tag with name " + req.body.name + " and purpose " + purpose + " already exist."
                });
            } else {
                // Since the tag doesn't exist, then save the detail
                console.log(req.body);
                const tag = new Tag({
                    _id: new mongoose.Types.ObjectId(),
                    name: req.body.name,
                    purpose: req.body.purpose,
                    created_by: req.body.created_by,
                    updated_by: req.body.updated_by,
                    created_date: Date.now(),
                    updated_date: Date.now()
                });

                tag.save()
                    .then(result => {
                        console.log(result);
                        return resp.status(201).json({
                            message: "Tag created successfully",
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
* /tag/{id}:
*   put:
*     tags:
*       - Tag
*     description: Updates a single tag
*     produces: application/json
*     parameters:
*       name: tag
*       in: body
*       description: Fields for the Tag resource
*       schema:
*         type: array
*         $ref: '#/definitions/Tag'
*     responses:
*       200:
*         description: Successfully updated
*/
// UPDATE TAG
router.put('/:id', auth, (req, resp, next) => {
    Tag.findByIdAndUpdate(req.params.id, req.body).exec().then(tag => {
        return resp.status(200).json(tag);
    }).catch(error => {
        // 500 : Internal Sever Error. The request was not completed. The server met an unexpected condition.
        return resp.status(500).json({
            error: error
        });
    });
});


/**
 * @swagger
 * /tag/{id}:
 *   delete:
 *     tags:
 *       - Tag
 *     description: Deletes a single tag
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Tag's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted
 */
// DELETE TAG (Hard delete. This will delete the entire tag detail. Only application admin should be allowed to perform this action )
router.delete('/:id', auth, (req, resp, next) => {
    Tag.findByIdAndRemove(req.params.id).exec().then(tag => {
        return resp.status(200).json(tag);
    }).catch(error => {
        console.log('error : ', error);
        // 500 : Internal Sever Error. The request was not completed. The server met an unexpected condition.
        return resp.status(500).json({
            error: error
        });
    });
});

module.exports = router;
