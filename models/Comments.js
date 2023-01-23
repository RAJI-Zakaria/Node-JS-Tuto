'use strict'

module.exports = (sequelize, DataTypes)=>{
    const Comment = sequelize.define("Comment", {
            title:{
                type:DataTypes.STRING,
                allowNull:false,
                validate:{
                    notEmpty:true,
                }
            },
            rating:{
                type:DataTypes.INTEGER,
                allowNull:true,
                validate:{
                    notEmpty:true,
                }
            }
        },
        {
            timestamps: true
        });

    //
    // Comment.associate = function(models){
    //     //associations can be defined here
    //     Comment.belongsTo(models.User,{
    //         as : 'Users',
    //         foreignKey:'UserId'
    //     })
    // }
    Comment.associate = function (models) {
        // associations can be defined here

        Comment.belongsTo(models.User, {
            as: 'User',
            foreignKey: 'UserId'
            // targetKey: 'visitor_id'
        });



        Comment.belongsTo(models.Post, {
            as: 'Post',
            foreignKey: 'PostId'
            // targetKey: 'visitor_id'
        });
    }

    //
    // Comment.belongsTo(User, {
    //     foreignKey: 'UserId'
    // });

    return Comment;
}