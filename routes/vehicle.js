var express     = require('express');
var mongoose    = require('mongoose');
var Vehicle     = require('../models/Vehicle');
const auth      = require('../auth');

var router      = express.Router();

/**
 * @swagger
 * /vehicle:
 *   get:
 *     tags:
 *       - Vehicle
 *     description: Returns all vehicles
 *     security:
 *       - bearerAuth: []
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of vehicles
 */
// GET VEHICLES (Only active) WITH filter & pagination
router.get('/', auth, (req, resp) => {
    Vehicle.where({ is_active: true }).exec().then(vehicles => {
        return resp.status(200).json(vehicles);
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
 * /vehicle/{id}:
 *   get:
 *     tags:
 *       - Vehicle
 *     description: Returns a single vehicle
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Vehicle's id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: A single vehicle
 */

// GET SINGLE VEHICLE BY ID
router.get('/:id', auth, (req, resp, next) => {
    Vehicle.findById(req.params.id).exec().then(vehicle => {
        return resp.status(200).json(vehicle);
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
 * /vehicle:
 *   post:
 *     tags:
 *       - Vehicle
 *     description: Creates a new vehicle
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: vehicle
 *         description: Vehicle object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Vehicle'
 *     responses:
 *       201:
 *         description: Vehicle created successfully
 */
// SAVE VEHICLE
router.post('/', auth, (req, resp, next) => {
    // First check if the vehicle with name, and number already exists
    Vehicle.findOne({ name: req.body.name, number: req.body.number, is_active: true })
        .exec()
        .then(vehicle => {
            // If the vehicle with name and number already exists, then return error
            if (vehicle) {
                // 409 : Conflict. The request could not be completed because of a conflict.
                return resp.status(409).json({
                    message: "The vehicle with name " + req.body.firstname + " " + req.body.lastname + " and mobile number " + req.body.mobile + " already exist."
                });
            } else {
                // Since the user doesn't exist, then save the detail
                console.log(req.body);
                const vehicle = new Vehicle({
                    _id: new mongoose.Types.ObjectId(),
                    name: req.body.name,
                    ownership: req.body.ownership,
                    type: req.body.type,
                    number: req.body.number,
                    created_by: req.body.created_by,
                    updated_by: req.body.updated_by,
                    created_date: Date.now(),
                    updated_date: Date.now()
                });

                vehicle.save()
                    .then(result => {
                        console.log(result);
                        return resp.status(201).json({
                            message: "Vehicle created successfully",
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
* /vehicle/{id}:
*   put:
*     tags:
*       - Vehicle
*     description: Updates a single vehicle
*     produces: application/json
*     parameters:
*       name: vehicle
*       in: body
*       description: Fields for the Vehicle resource
*       schema:
*         type: array
*         $ref: '#/definitions/Vehicle'
*     responses:
*       200:
*         description: Successfully updated
*/
// UPDATE VEHICLE
router.put('/:id', auth, (req, resp, next) => {
    Vehicle.findByIdAndUpdate(req.params.id, req.body).exec().then(vehicle => {
        return resp.status(200).json(vehicle);
    }).catch(error => {
        // 500 : Internal Sever Error. The request was not completed. The server met an unexpected condition.
        return resp.status(500).json({
            error: error
        });
    });
});


/**
 * @swagger
 * /vehicle/{id}:
 *   delete:
 *     tags:
 *       - Vehicle
 *     description: Deletes a single vehicle
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Vehicle's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted
 */
// DELETE VEHICLE (Hard delete. This will delete the entire vehicle detail. Only application admin should be allowed to perform this action )
router.delete('/:id', auth, (req, resp, next) => {
    Vehicle.findByIdAndRemove(req.params.id).exec().then(vehicle => {
        return resp.status(200).json(vehicle);
    }).catch(error => {
        console.log('error : ', error);
        // 500 : Internal Sever Error. The request was not completed. The server met an unexpected condition.
        return resp.status(500).json({
            error: error
        });
    });
});

module.exports = router;
