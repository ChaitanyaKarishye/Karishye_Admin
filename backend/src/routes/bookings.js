const express = require('express');

const BookingsService = require('../services/bookings');
const BookingsDBApi = require('../db/api/bookings');
const wrapAsync = require('../helpers').wrapAsync;

const router = express.Router();

/**
 *  @swagger
 *  components:
 *    schemas:
 *      Bookings:
 *        type: object
 *        properties:

 *          notes:
 *            type: string
 *            default: notes
 *          address:
 *            type: string
 *            default: address

 *          user_id:
 *            type: integer
 *            format: int64
 *          pujari_id:
 *            type: integer
 *            format: int64
 *          puja_id:
 *            type: integer
 *            format: int64
 *          price:
 *            type: integer
 *            format: int64
 *          duration_hrs:
 *            type: integer
 *            format: int64
 *          base_price:
 *            type: integer
 *            format: int64
 *          final_price:
 *            type: integer
 *            format: int64

 *          
 *          
 */

/**
 *  @swagger
 * tags:
 *   name: Bookings
 *   description: The Bookings managing API
 */

/**
 *  @swagger
 *  /api/bookings:
 *    post:
 *      security:
 *        - bearerAuth: []
 *      tags: [Bookings]
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
 *                  $ref: "#/components/schemas/Bookings"
 *      responses:
 *        200:
 *          description: The item was successfully added
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Bookings"
 *        401:
 *          $ref: "#/components/responses/UnauthorizedError"
 *        405:
 *          description: Invalid input data
 *        500:
 *          description: Some server error
 */

router.post('/', async (req, res) => {
  await BookingsService.create(
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
 *  /api/bookings/{id}:
 *    put:
 *      security:
 *        - bearerAuth: []
 *      tags: [Bookings]
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
 *                  $ref: "#/components/schemas/Bookings"
 *              required:
 *                - id
 *      responses:
 *        200:
 *          description: The item data was successfully updated
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Bookings"
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
    await BookingsService.update(req.body.data, req.body.id, req.currentUser);
    const payload = true;
    res.status(200).send(payload);
  }),
);

/**
 * @swagger
 *  /api/bookings/{id}:
 *    delete:
 *      security:
 *        - bearerAuth: []
 *      tags: [Bookings]
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
 *                $ref: "#/components/schemas/Bookings"
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
    await BookingsService.remove(req.params.id, req.currentUser);
    const payload = true;
    res.status(200).send(payload);
  }),
);

/**
 *  @swagger
 *  /api/bookings:
 *    get:
 *      security:
 *        - bearerAuth: []
 *      tags: [Bookings]
 *      summary: Get all bookings
 *      description: Get all bookings
 *      responses:
 *        200:
 *          description: Bookings list successfully received
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: "#/components/schemas/Bookings"
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
    const payload = await BookingsDBApi.findAll(req.query);

    res.status(200).send(payload);
  }),
);

router.get('/autocomplete', async (req, res) => {
  const payload = await BookingsDBApi.findAllAutocomplete(
    req.query.query,
    req.query.limit,
  );

  res.status(200).send(payload);
});

/**
 * @swagger
 *  /api/bookings/{id}:
 *    get:
 *      security:
 *        - bearerAuth: []
 *      tags: [Bookings]
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
 *                $ref: "#/components/schemas/Bookings"
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
    const payload = await BookingsDBApi.findBy({ id: req.params.id });

    res.status(200).send(payload);
  }),
);

router.use('/', require('../helpers').commonErrorHandler);

module.exports = router;
