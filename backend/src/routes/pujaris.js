const express = require('express');

const PujarisService = require('../services/pujaris');
const PujarisDBApi = require('../db/api/pujaris');
const wrapAsync = require('../helpers').wrapAsync;

const router = express.Router();

/**
 *  @swagger
 *  components:
 *    schemas:
 *      Pujaris:
 *        type: object
 *        properties:

 *          name:
 *            type: string
 *            default: name
 *          surname:
 *            type: string
 *            default: surname
 *          qualification:
 *            type: string
 *            default: qualification
 *          address:
 *            type: string
 *            default: address
 *          email_id:
 *            type: string
 *            default: email_id
 *          phone_number:
 *            type: string
 *            default: phone_number
 *          razorpay_id:
 *            type: string
 *            default: razorpay_id
 *          city:
 *            type: string
 *            default: city

 *          application_id:
 *            type: integer
 *            format: int64
 *          experience_yrs:
 *            type: integer
 *            format: int64

 *          
 *          
 */

/**
 *  @swagger
 * tags:
 *   name: Pujaris
 *   description: The Pujaris managing API
 */

/**
 *  @swagger
 *  /api/pujaris:
 *    post:
 *      security:
 *        - bearerAuth: []
 *      tags: [Pujaris]
 *      summary: Add new item
 *      description: Add new item
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                data:
 *                  description: Data of the updated item
 *                  type: object
 *                  $ref: "#/components/schemas/Pujaris"
 *      responses:
 *        200:
 *          description: The item was successfully added
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Pujaris"
 *        401:
 *          $ref: "#/components/responses/UnauthorizedError"
 *        405:
 *          description: Invalid input data
 *        500:
 *          description: Some server error
 */

router.post('/', async (req, res) => {
  await PujarisService.create(
    req.body.data,
    req.currentUser,
    true,
    req.headers.referer,
  );
  const payload = true;
  res.status(200).send(payload);
});

/**
 *  @swagger
 *  /api/pujaris/{id}:
 *    put:
 *      security:
 *        - bearerAuth: []
 *      tags: [Pujaris]
 *      summary: Update the data of the selected item
 *      description: Update the data of the selected item
 *      parameters:
 *        - in: path
 *          name: id
 *          description: Item ID to update
 *          required: true
 *          schema:
 *            type: string
 *      requestBody:
 *        description: Set new item data
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                id:
 *                  description: ID of the updated item
 *                  type: string
 *                data:
 *                  description: Data of the updated item
 *                  type: object
 *                  $ref: "#/components/schemas/Pujaris"
 *              required:
 *                - id
 *      responses:
 *        200:
 *          description: The item data was successfully updated
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Pujaris"
 *        400:
 *          description: Invalid ID supplied
 *        401:
 *          $ref: "#/components/responses/UnauthorizedError"
 *        404:
 *          description: Item not found
 *        500:
 *          description: Some server error
 */

router.put(
  '/:id',
  wrapAsync(async (req, res) => {
    await PujarisService.update(req.body.data, req.body.id, req.currentUser);
    const payload = true;
    res.status(200).send(payload);
  }),
);

/**
 * @swagger
 *  /api/pujaris/{id}:
 *    delete:
 *      security:
 *        - bearerAuth: []
 *      tags: [Pujaris]
 *      summary: Delete the selected item
 *      description: Delete the selected item
 *      parameters:
 *        - in: path
 *          name: id
 *          description: Item ID to delete
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: The item was successfully deleted
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Pujaris"
 *        400:
 *          description: Invalid ID supplied
 *        401:
 *          $ref: "#/components/responses/UnauthorizedError"
 *        404:
 *          description: Item not found
 *        500:
 *          description: Some server error
 */

router.delete(
  '/:id',
  wrapAsync(async (req, res) => {
    await PujarisService.remove(req.params.id, req.currentUser);
    const payload = true;
    res.status(200).send(payload);
  }),
);

/**
 *  @swagger
 *  /api/pujaris:
 *    get:
 *      security:
 *        - bearerAuth: []
 *      tags: [Pujaris]
 *      summary: Get all pujaris
 *      description: Get all pujaris
 *      responses:
 *        200:
 *          description: Pujaris list successfully received
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: "#/components/schemas/Pujaris"
 *        401:
 *          $ref: "#/components/responses/UnauthorizedError"
 *        404:
 *          description: Data not found
 *        500:
 *          description: Some server error
 */

router.get(
  '/',
  wrapAsync(async (req, res) => {
    const payload = await PujarisDBApi.findAll(req.query);

    res.status(200).send(payload);
  }),
);

router.get('/autocomplete', async (req, res) => {
  const payload = await PujarisDBApi.findAllAutocomplete(
    req.query.query,
    req.query.limit,
  );

  res.status(200).send(payload);
});

/**
 * @swagger
 *  /api/pujaris/{id}:
 *    get:
 *      security:
 *        - bearerAuth: []
 *      tags: [Pujaris]
 *      summary: Get selected item
 *      description: Get selected item
 *      parameters:
 *        - in: path
 *          name: id
 *          description: ID of item to get
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: Selected item successfully received
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Pujaris"
 *        400:
 *          description: Invalid ID supplied
 *        401:
 *          $ref: "#/components/responses/UnauthorizedError"
 *        404:
 *          description: Item not found
 *        500:
 *          description: Some server error
 */

router.get(
  '/:id',
  wrapAsync(async (req, res) => {
    const payload = await PujarisDBApi.findBy({ id: req.params.id });

    res.status(200).send(payload);
  }),
);

router.use('/', require('../helpers').commonErrorHandler);

module.exports = router;
