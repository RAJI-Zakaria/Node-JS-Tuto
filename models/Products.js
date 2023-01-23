'use strict'

module.exports = (sequelize, DataTypes)=>{
    const Product = sequelize.define("Product", {
        title:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                notEmpty:true,
            }
        }
    },
        {
            timestamps: false
        });

    Product.associate = function (models) {
        // associations can be defined here
        Product.belongsToMany(models.User, {
            as: 'User',
            foreignKey: 'UserId',//by default
            through: 'Orders'
        });
    }
    return Product;
}