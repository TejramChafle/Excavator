var express     = require('express');
var mongoose    = require('mongoose');
var Work        = require('../models/Work');
const auth      = require('../auth');

var router      = express.Router();

/**
 * @swagger
 * /work:
 *   get:
 *     tags:
 *       - Work
 *     description: Returns all works
 *     security:
 *       - bearerAuth: []
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of works
 */
// GET WORKS (Only active) WITH filter & pagination
router.get('/', auth, (req, resp) => {
    Work.where({ is_active: true }).exec().then(works => {
        return resp.status(200).json(works);
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
 * /work/{id}:
 *   get:
 *     tags:
 *       - Work
 *     description: Returns a single work
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Work's id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: A single work
 */

// GET SINGLE WORK BY ID
router.get('/:id', auth, (req, resp, next) => {
    Work.findById(req.params.id).exec().then(work => {
        return resp.status(200).json(work);
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
 * /work:
 *   post:
 *     tags:
 *       - Work
 *     description: Creates a new work
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: work
 *         description: Work object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Work'
 *     responses:
 *       201:
 *         description: Work created successfully
 */
// SAVE WORK
router.post('/', auth, (req, resp, next) => {
    const work = new Work({
        _id: new mongoose.Types.ObjectId(),
        service_id: req.body.service_id,
        date: req.body.date,
        start_time: req.body.start_time,
        end_time: req.body.end_time,
        client_id: req.body.client_id,
        site: req.body.site,
        rate: req.body.rate,
        quantity: req.body.quantity,
        description: req.body.description,
        created_by: req.body.created_by,
        updated_by: req.body.updated_by,
        created_date: Date.now(),
        updated_date: Date.now()
    });

    work.save().then(result => {
        console.log(result);
        return resp.status(201).json({
            message: "Work submitted successfully.",
            result: result
        });
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
* /work/{id}:
*   put:
*     tags:
*       - Work
*     description: Updates a single work
*     produces: application/json
*     parameters:
*       name: work
*       in: body
*       description: Fields for the Work resource
*       schema:
*         type: array
*         $ref: '#/definitions/Work'
*     responses:
*       200:
*         description: Successfully updated
*/
// UPDATE WORK
router.put('/:id', auth, (req, resp, next) => {
    Work.findByIdAndUpdate(req.params.id, req.body).exec().then(work => {
        return resp.status(200).json(work);
    }).catch(error => {
        // 500 : Internal Sever Error. The request was not completed. The server met an unexpected condition.
        return resp.status(500).json({
            error: error
        });
    });
});


/**
 * @swagger
 * /work/{id}:
 *   delete:
 *     tags:
 *       - Work
 *     description: Deletes a single work
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Work's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted
 */
// DELETE WORK (Hard delete. This will delete the entire work detail. Only application admin should be allowed to perform this action )
router.delete('/:id', auth, (req, resp, next) => {
    Work.findByIdAndRemove(req.params.id).exec().then(work => {
        return resp.status(200).json(work);
    }).catch(error => {
        console.log('error : ', error);
        // 500 : Internal Sever Error. The request was not completed. The server met an unexpected condition.
        return resp.status(500).json({
            error: error
        });
    });
});

module.exports = router;
