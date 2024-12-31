const asyncHandler = require("express-async-handler") ; 
const conn = require("../config/dbConnection") ;
const tableSchemas = require("../models/schema") ;
const errorHandler = require("../middlerware/errorHandler") ;



// @desc log a call 
// @route POST /api/v1/manage/call
// @access Public

const logCall = asyncHandler(async (req, res) => {
    const {contactId , restaurantId , callTime } = req.body ;
   const query = `INSERT INTO CALLS (CONTACT_ID , RESTAURANT_ID , CALL_TIME) VALUES (?,?,?)` ;
    conn.query(query , [contactId , restaurantId , callTime|| new Date()] , (err , result)=>{
        if(err){
            throw new Error("Error while logging call") ;
        }
        res.status(201).json({
            message : "Call logged successfully",
            data : result

        })
}) ;
}) 


// @desc get last call details of a restaurant
// @route GET /api/v1/manage/call/:restaurantId
// @access Public

const getLastCall = asyncHandler(async (req, res) => {
    const restaurantId = req.params.restaurantId;

    if (!restaurantId) {
        throw new Error("Restaurant id is required");
    }

    const query = `
        SELECT 
            SUBQUERY.CONTACT_ID,
            SUBQUERY.RESTAURANT_NAME,
            SUBQUERY.LAST_CALL_TIME
        FROM (
            SELECT 
                c.CONTACT_ID,
                r.NAME AS RESTAURANT_NAME,
                c.CALL_TIME AS LAST_CALL_TIME
            FROM CALLS c
            INNER JOIN RESTAURANTS r ON c.RESTAURANT_ID = r.ID
            WHERE c.RESTAURANT_ID = ?
            ORDER BY c.CALL_TIME DESC
            LIMIT 1
        ) AS SUBQUERY;
    `;

    conn.query(query, [restaurantId], (err, result) => {
        if (err) {
            console.error(err.message);
            throw new Error("Error while fetching last call");
        }

        res.status(200).json({
            message: "Last call fetched successfully",
            data: result,
        });
    });
});


// @desc get people who need to be called today
// @route GET /api/v1/manage/calldetails
// @access Public
const getCallsToday = asyncHandler(async (req, res) => {
    const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format

    const query = `SELECT 
        c.CONTACT_ID,
        ct.NAME AS CONTACT_NAME,
        r.NAME AS RESTAURANT_NAME,
        c.CALL_TIME
    FROM CALLS c
    INNER JOIN CONTACTS ct ON c.CONTACT_ID = ct.ID
    INNER JOIN RESTAURANTS r ON c.RESTAURANT_ID = r.ID
    WHERE DATE(c.CALL_TIME) = ?`;

    conn.query(query, [today], (err, result) => {
        if (err) {
            throw new Error("Error while fetching call details for today");
        }
        res.status(200).json({
            message: "Call details for today fetched successfully",
            data: result,
        });
    });
});


module.exports = {logCall , getLastCall , getCallsToday} ;