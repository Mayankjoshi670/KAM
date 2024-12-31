const asyncHandler = require("express-async-handler");
const conn = require("../config/dbConnection");
const tableSchemas = require("../models/schema");
const errorHandler = require("../middlerware/errorHandler");



// @desc well performing leads  
// @route POST /api/v1/well_performing
// @access Public
const well_performing = asyncHandler(async (req, res) => {
    const query = `SELECT 
        r.ID AS RESTAURANT_ID,
        r.NAME AS RESTAURANT_NAME,
        COUNT(o.ID) AS TOTAL_ORDERS,
        COALESCE(SUM(o.AMOUNT), 0) AS TOTAL_REVENUE,
        COALESCE(AVG(o.AMOUNT), 0) AS AVERAGE_ORDER_VALUE,
        MAX(o.ORDER_TIME) AS LAST_ORDER_DATE,
        COUNT(c.CALL_TIME) AS TOTAL_CALLS
    FROM 
        RESTAURANTS r
    LEFT JOIN 
        ORDERS o ON r.ID = o.RESTAURANT_ID
    LEFT JOIN 
        CALLS c ON r.ID = c.RESTAURANT_ID
    GROUP BY 
        r.ID, r.NAME
    HAVING 
        COUNT(o.ID) >= 5 -- Minimum orders for well-performing
        AND SUM(o.AMOUNT) >= 400 -- Minimum revenue for well-performing
        AND COUNT(c.CALL_TIME) >= 5 -- Minimum calls for engagement
    ORDER BY 
        TOTAL_REVENUE DESC, TOTAL_ORDERS DESC;`;

    conn.query(query, (err, result) => {
        if (err) {
            throw new Error("Error while fetching well-performing leads");
        }
        res.status(200).json({
            message: "Well-performing leads fetched successfully",
            data: result
        });
    });
});


// @desc underperforming leads
// @route POST /api/v1/under_performing
// @access Public
const under_performing = asyncHandler(async (req, res) => {
    const query = `SELECT 
        r.ID AS RESTAURANT_ID,
        r.NAME AS RESTAURANT_NAME,
        COUNT(o.ID) AS TOTAL_ORDERS,
        COALESCE(SUM(o.AMOUNT), 0) AS TOTAL_REVENUE,
        MAX(o.ORDER_TIME) AS LAST_ORDER_DATE,
        COUNT(c.CALL_TIME) AS TOTAL_CALLS
    FROM 
        RESTAURANTS r
    LEFT JOIN 
        ORDERS o ON r.ID = o.RESTAURANT_ID
    LEFT JOIN 
        CALLS c ON r.ID = c.RESTAURANT_ID
    GROUP BY 
        r.ID, r.NAME
    HAVING 
        COUNT(o.ID) < 10 -- Define as underperforming if orders are below 10
        OR SUM(o.AMOUNT) < 5000 -- Revenue below 5000
        OR COUNT(c.CALL_TIME) < 3 -- Calls below 3
    ORDER BY 
        TOTAL_REVENUE ASC, TOTAL_ORDERS ASC;`;

    conn.query(query, (err, result) => {
        if (err) {
            throw new Error("Error while fetching underperforming leads");
        }
        res.status(200).json({
            message: "Underperforming leads fetched successfully",
            data: result
        });
    });
});

// @desc peak time analysis
// @route POST /api/v1/peak_time
// @access Public
const peak_time = asyncHandler(async (req, res) => {
    const query = `SELECT 
        HOUR(o.ORDER_TIME) AS PEAK_HOUR,
        COUNT(o.ID) AS TOTAL_ORDERS
    FROM 
        ORDERS o
    GROUP BY 
        HOUR(o.ORDER_TIME)
    ORDER BY 
        TOTAL_ORDERS DESC
    LIMIT 1;`; // Fetch the hour with the maximum number of orders

    conn.query(query, (err, result) => {
        if (err) {
            throw new Error("Error while analyzing peak time");
        }
        res.status(200).json({
            message: "Peak time analysis completed successfully",
            data: result
        });
    });
});

module.exports = { 
    well_performing, 
    under_performing, 
    peak_time 
};
