'use strict'

module.exports = (sequelize, DataTypes)=>{
    const Order = sequelize.define("Order", {
            Quantity:{
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


    return Order;
}