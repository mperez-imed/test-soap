const user = require('../models').user;

var service = {
    userService: {
        userPort: {
            validate: async function (args) {
                let res = {};

                const {
                    Op
                } = require("sequelize");

                await user.findAndCountAll({
                        where: {
                            [Op.or]: [{
                                    rut: args.validateRequest.rut.$value
                                },
                                {
                                    email: args.validateRequest.email.$value
                                },
                            ]
                        }
                    }).then(data => {
                        if (data.count <= 0) {
                            res.status = 200;
                            res.message = "Usuario no encontrado";
                        } else {
                            res.status = 403;
                            res.message = "El usuario ya se encuentrar registrado";
                        }
                    })
                    .catch(function (error) {
                        res.status = 500;
                        res.message = "No se pudo ejecutar esta accion";
                    });

                return res;
            },
            confirm: async function (args) {
                let res = {};

                await user.findAndCountAll({
                        where: {
                            email: args.confirmRequest.email.$value,
                            confirmed: 1
                        }
                    }).then(data => {
                        if (data.count <= 0) {
                            res.status = 403;
                            res.message = "En espera de confirmacion";
                        } else {
                            res.status = 200;
                            res.message = "Usuario confirmado";
                        }
                    })
                    .catch(function (error) {
                        res.status = 500;
                        res.message = "No se pudo ejecutar esta accion";
                    });

                return res;
            }
        }
    }
}
module.exports = service;