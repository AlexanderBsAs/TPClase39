module.exports=(sequelize,dataTypes)=>{
    let alias="actor_movie"
    let cols={
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull:false
        },
        actor_id:{
            type:dataTypes.INTEGER.UNSIGNED,
            allowNull:false
        }
    }
    let config={
        tableName:"actor_movie",
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }

    const actor_movie=sequelize.define(alias,cols,config)

    return actor_movie
}