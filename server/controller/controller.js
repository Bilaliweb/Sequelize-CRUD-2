const { Pool } = require('pg')
const db = require('../config/config')
const operate = require('../crudOps/operations')
const userModel = require('../models/model')

const pool = new Pool()
const userCRUD = {
    findAllUsers: findAllUsers,
    createNewUser: createNewUser,
    findUserById: findUserById,
    findUsersByName: findUsersByName,
    findOneUserByName: findOneUserByName,
    updateUserById: updateUserById,
    deleteUserById: deleteUserById
}

async function createNewUser(req, res, id) {
    // let user = req.body
    // // console.log('Hello')
    // operate.create(user)
    // .then((data) => {
    //     res.status(200).send(data)
    // })
    // .catch((err) => {
    //     res.status(400).send('Invalid Credentials... ' + err)
    //     console.log("Error is -> " + err)
    // })

    try{
        let user = await req.body
        // console.log('Hello')
        let result = await operate.create(user)
        // .then((data) => {
        //     res.status(200).send(data)
        // })
        if(result){
            res.status(200).send(result)
            console.log(`User is created with new id: ${result.id}`)
        }
        else {
            res.status(400).send('Bad Request -> Invalid Credentials...')
            console.log("User can't be created.")
        }
    }
    catch(err) {
        res.status(500).send('Invalid Credentials... ' + err)
        console.log("Error is -> " + err)
    }
}

function findAllUsers(req, res) {
    operate.findAll()
    .then((data) => {
        res.status(200).send(data)
        console.log("All users fetched.")
    })
    .catch((err) => {
        res.status(500).send('No users found.' + err)
        console.log('Error is -> ' + err)
    })
}

async function findUserById(req, res, id) {
    try {
    const user = await operate.findById(req.params.id)
    // if(user){
    //     let HTML = "";
    //     ["talha", "bilal", "darab", "talat"].map((el, ix) => {
    //         HTML += `<h1> User ${ix} -> ${el} </h1>`
    //     })

    //     res.status(200).send(HTML)
    //     console.log(`User fetched with id: ${id}`)
    // }
    if(user){

        res.status(200).send(user)
        console.log(`User fetched with id: ${req.params.id}`)
    }
    else {
        res.status(404).send('Record not found.')
        console.log("Invalid id.")
    }
    }
    catch(e) {
        console.log("This is error now " + e)
        return res.status(500).send('Server error -> ' + e)

    }
    // await operate.findById(req.params.id)
    // .then((data) => {
    //     res.status(200).send(data)
    // })
    // .catch((err) => {
    // })
}

async function findUsersByName(req, res,){

    try{

        console.log('Its working tree', req.query.fullName)
        let user = await userModel.findAll({ where: { fullName: req.query.fullName } });

        if(user){
            return res.status(200).json({user})
        }
        return res.status(404).send('User not available...')
    }
    catch (e) {
        return res.status(500).send("This is aaaaho " + e)
    }
}

async function findOneUserByName(req, res){
    try {
        console.log('Fetching one specific user', req.query.fullName)
        let oneUser = await userModel.findOne({where: {fullName: req.query.fullName}})

        if(oneUser){
            return res.status(200).json({oneUser})
        }
        return res.status(404).send('User not available ')
    }
    catch (e) {
        return res.status(500).send("This is fazool err..." + e)
    }
}

async function updateUserById(req, res, id) {
    const data = await operate.updateById(req.body, req.params.id)
    const result = await operate.findById(req.params.id)

    if(result){

        res.status(200).send(result)
        console.log(`User is updated for id: ${req.params.id}`)
    }
    else {
        res.status(404).send('Given id not found.')
        console.log("Invalid id.")
    }

    // operate.findById(req.params.id)
    // .then((data) => {
    //     res.status(200).send(data)
    // })
    // .catch((err) => {
    //     res.status(400).send('Given id not found.' + err)
    //     // console.log('Error is -> ' + err)
    // })
}

async function deleteUserById(req, res, id) {
    try{

        const del = await operate.deleteById(req.params.id)
        if(del){
            res.status(200).send('Successfully deleted given ID.')
            console.log(`User Delete with id: ${req.params.id}`)
        }
        else {
            res.status(404).send('Given id not found.')
            console.log("Invalid id.")
        }
    }
    catch (e) {
        res.status(500).send('Server Error... ' + e) 
    }
    // .then((data) => {
    //     res.status(200).send('Successfully deleted given ID.')
    // })
    // .catch((err) => {
    //     res.status(404).send('Given id not found.' + err)
    // })
}

module.exports = userCRUD