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
    const id = req.params.id ; 
    const query = `DELETE FROM RESTAURANTS WHERE ID = ?` ;
    conn.query(query , [id] , (err , result)=>{
        if(err){
            //  status 500 
            console.err("error while deleting the restraunt" ,err.message) ;
            throw new Error("Error while deleting restraunt") ;
            return ; 
        }
        if(result.affectedRows === 0){
        //    status 404 
            throw new Error("Restraunt not found") ; 
        }
        else {
            res.status(200).json({
                message : "Restraunt deleted successfully",
                data : result
            })
        }
    })
})



module.exports = {addLead , getLeads , deleteLead} ;