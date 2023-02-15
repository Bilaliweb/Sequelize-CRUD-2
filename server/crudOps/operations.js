const { Op } = require('sequelize')
const userModel = require('../models/model')
let operations = {
    findAll: findAll,
    create: create,
    findById: findById,
    deleteById: deleteById,
    updateById: updateById,
}

function findAll() {
    return userModel.findAll()
}

function create(user) {
    let newUser = new userModel(user)
    return newUser.save()
}

function findById(id) {
    return userModel.findByPk(id)
}

// async function findName(req, res){
//     return await userModel.findAll()
// }

function updateById(user, id) {
    let userUpdate = {
        fullName: user.fullName,
        age: user.age,
        email: user.email
    }
    return userModel.update(userUpdate, {where: {id: id}
    })
}

function deleteById(id) {
    return userModel.destroy({where: {id: id}})
}

module.exports = operations