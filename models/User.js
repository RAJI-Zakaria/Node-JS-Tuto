module.exports = (sequelize, DataTypes)=>{
    const User = sequelize.define("User", {
        firstName:{
                type:DataTypes.STRING,
            allowNull:false,
            validate:{
                notEmpty:true,
            }
        },
        age:{
            type:DataTypes.INTEGER,
            allowNull:false,
            validate:{
                // isIn:{
                //     args: [['20', '23']],
                //     msg: "Must be 20 or 23"
                // }
            }
        }
    })


    User.associate = function (models) {
        // associations can be defined here
        User.hasMany(models.Post, {
            as : 'posts',
            foreignKey: 'UserId'
        });


        User.belongsToMany(models.Product, {
            as: 'Product',
            foreignKey: 'ProductId',
            through: 'Orders'
        });

    }

    return User;
}