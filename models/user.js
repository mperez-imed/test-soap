'use strict';
module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define('user', {
        id: {
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        rut: DataTypes.STRING,
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE,
    }, {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });
    user.associate = function (models) {
        // associations can be defined here
    };
    return user;
};