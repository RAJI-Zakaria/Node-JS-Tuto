'use strict'

module.exports = (sequelize, DataTypes)=>{
    const Post = sequelize.define("Post", {
        title:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                notEmpty:true,
            }
        },
        description:{
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

    //
    // Post.associate = function(models){
    //     //associations can be defined here
    //     Post.belongsTo(models.User,{
    //         as : 'Users',
    //         foreignKey:'UserId'
    //     })
    // }
    Post.associate = function (models) {
        // associations can be defined here
        Post.belongsTo(models.User, {
            as: 'User',
            foreignKey: 'UserId'
            // targetKey: 'visitor_id'
        });
    }


    //
    // Post.belongsTo(User, {
    //     foreignKey: 'UserId'
    // });

    return Post;
}