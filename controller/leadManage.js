const asyncHandler = require("express-async-handler");
const conn = require("../config/dbConnection") ;
const tableSchemas = require("../models/schema") ; 
const errorHandler = require("../middlerware/errorHandler") ; 
// @desc add new Restraunt 
// @route POST /api/v1/Restraunts
// @access Public

const addLead = asyncHandler(async (req, res) => {
    const { name , address , frequency , status } = req.body ; 
    const query = `INSERT INTO RESTAURANTS (NAME , ADDRESS , FREQUENCY , STATUS) VALUES (?,?,?,?)` ;
    conn.query(query,[name , address , frequency , status],(err, result) => {
        if(err){
            throw new Error("Error while adding restraunt") ; 
        }
        res.status(201).json({
            message : "Restraunt added successfully",
            data : result
        })
    })
})  



// @desc get info of all  Restraunt 
// @route GET /api/v1/Restraunts
// @access Public

const getLeads = asyncHandler(async (req, res) => {
    const query = `SELECT * FROM RESTAURANTS` ;
    conn.query(query , (err , result)=>{
        if(err){
            throw new Error("Error while fetching restraunt") ; 
        }
        res.status(200).json({
            message : "Restraunt fetched successfully",
            data : result
        })
    })
})




// @desc delete a Restraunt 
// @route DELET /api/v1/Restraunts/?:id 
// @access Public
const deleteLead = asyncHandler(async (req, res) => {
    const id = req.params.id;

    const deleteCallsQuery = `DELETE FROM calls WHERE RESTAURANT_ID = ?`;
    const deleteContactsQuery = `DELETE FROM contacts WHERE RESTAURANT_ID = ?`;
    const deleteOrdersQuery = `DELETE FROM orders WHERE RESTAURANT_ID = ?`;
    const deleteRestaurantQuery = `DELETE FROM restaurants WHERE ID = ?`;

    // Step 1: Delete from 'calls'
    conn.query(deleteCallsQuery, [id], (err, result) => {
        if (err) {
            console.error("Error while deleting dependent calls:", err.message);
            throw new Error("Error while deleting dependent calls");
        }
        console.log("Dependent calls deleted:", result.affectedRows);

        // Step 2: Delete from 'contacts'
        conn.query(deleteContactsQuery, [id], (err, result) => {
            if (err) {
                console.error("Error while deleting dependent contacts:", err.message);
                throw new Error("Error while deleting dependent contacts");
            }
            console.log("Dependent contacts deleted:", result.affectedRows);

            // Step 3: Delete from 'orders'
            conn.query(deleteOrdersQuery, [id], (err, result) => {
                if (err) {
                    console.error("Error while deleting dependent orders:", err.message);
                    throw new Error("Error while deleting dependent orders");
                }
                console.log("Dependent orders deleted:", result.affectedRows);

                // Step 4: Delete from 'restaurants'
                conn.query(deleteRestaurantQuery, [id], (err, result) => {
                    if (err) {
                        console.error("Error while deleting restaurant:", err.message);
                        throw new Error("Error while deleting restaurant");
                    }
                    if (result.affectedRows === 0) {
                        throw new Error("Restaurant not found");
                    }
                    res.status(200).json({
                        message: "Restaurant and all dependencies deleted successfully",
                        data: result,
                    });
                });
            });
        });
    });
});

module.exports = {addLead , getLeads , deleteLead} ;