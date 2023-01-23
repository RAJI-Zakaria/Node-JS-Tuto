'use strict'

module.exports = (sequelize, DataTypes)=>{
    const Order = sequelize.define("Order", {
            Quantity:{
                type:DataTypes.INTEGER,
                allowNull:false,
                validate:{
                    notEmpty:true,
                }
            }
        },
        {
            timestamps: true
        });

    Order.associate = function (models) {
        // associations can be defined here

        //!!!! Attention !!!!
        //The A.hasOne(B) association means that a One-To-One relationship exists between A and B, with the foreign key being defined in the target model (B).
        //The A.belongsTo(B) association means that a One-To-One relationship exists between A and B, with the foreign key being defined in the source model (A).
        Order.belongsTo(models.User, {
            as: 'User', //this will be used in the include : ['User']
            through: 'Orders'
        });


        Order.belongsTo(models.Product, {
            as: 'Product',
            through: 'Orders'
        });
    }
    return Order;
}