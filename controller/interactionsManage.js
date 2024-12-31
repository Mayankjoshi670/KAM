const asyncHandler = require("express-async-handler");
const conn = require("../config/dbConnection");

// @desc Record a call interaction
// @route POST /api/v1/interactions/call
// @access Public
const recordCall = asyncHandler(async (req, res) => {
    const { contactId, restaurantId, callTime } = req.body;

    if (!contactId || !restaurantId) {
        throw new Error("Contact ID and Restaurant ID are required");
    }

    const query = `INSERT INTO CALLS (CONTACT_ID, RESTAURANT_ID, CALL_TIME) VALUES (?, ?, ?)`;
    conn.query(query, [contactId, restaurantId, callTime || new Date()], (err, result) => {
        if (err) {
            console.error(err.message);
            throw new Error("Error while recording call");
        }

        res.status(201).json({
            message: "Call recorded successfully",
            data: result,
        });
    });
});

// @desc Track an order interaction
// @route POST /api/v1/interactions/order
// @access Public
const trackOrder = asyncHandler(async (req, res) => {
    const { restaurantId, amount, orderTime } = req.body;

    if (!restaurantId || !amount) {
        throw new Error("Restaurant ID and Order Amount are required");
    }

    const query = `INSERT INTO ORDERS (RESTAURANT_ID, AMOUNT, ORDER_TIME) VALUES (?, ?, ?)`;
    conn.query(query, [restaurantId, amount, orderTime || new Date()], (err, result) => {
        if (err) {
            console.error(err.message);
            throw new Error("Error while tracking order");
        }

        res.status(201).json({
            message: "Order tracked successfully",
            data: result,
        });
    });
});

// @desc Get all interactions for a lead
// @route GET /api/v1/interactions/:restaurantId
// @access Public
const getInteractions = asyncHandler(async (req, res) => {
    const { restaurantId } = req.params;
    console.log("inside the fuxn ")
    if (!restaurantId) {
        throw new Error("Restaurant ID is required");
    }

    const query = `
        SELECT 
            c.CONTACT_ID,
            c.CALL_TIME,
            o.ORDER_TIME,
            o.AMOUNT,
            r.NAME AS RESTAURANT_NAME
        FROM CALLS c
        LEFT JOIN ORDERS o ON c.RESTAURANT_ID = o.RESTAURANT_ID
        INNER JOIN RESTAURANTS r ON c.RESTAURANT_ID = r.ID
        WHERE c.RESTAURANT_ID = ?
        ORDER BY c.CALL_TIME DESC;
    `;

    conn.query(query, [restaurantId], (err, result) => {
        if (err) {
            console.error(err.message);
            throw new Error("Error while fetching interactions");
        }

        res.status(200).json({
            message: "Interactions fetched successfully",
            data: result,
        });
    });
});

module.exports = { recordCall, trackOrder, getInteractions };
