module.exports = (sequelize, DataTypes)=>{
    const User = sequelize.define("User", {
        firstName:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                notEmpty:true,
            }
        },
        email:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                isEmail: true,
            }
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                notEmpty:true,
                len: {
                    args: [4,64],
                    msg: "Must be 5 chars at least."
                }
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
        },
        refreshToken:{
            type:DataTypes.TEXT,
            allowNull:true
        },
    })


    User.associate = function (models) {
        // associations can be defined here
        User.hasMany(models.Post, {
            as : 'posts',
        });


        User.hasMany(models.Order, {
            as : 'Order',
        });

        // User.belongsToMany(models.Product, {
        //     as: 'Product',
        //     foreignKey: 'ProductId',
        //     through: 'Orders'
        // });

    }

    return User;
}