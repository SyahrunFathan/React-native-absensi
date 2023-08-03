import {Sequelize} from 'sequelize'
import db from '../config/Database.js'

const {DataTypes} = Sequelize;

const ModelAdmin = db.define('tb_admin', {
    id_admin: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    username: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    image: {
        type: DataTypes.STRING
    },
    url: {
        type: DataTypes.TEXT
    },
    token: {
        type: DataTypes.TEXT
    }
},{
    freezeTableName: true
})

export default ModelAdmin;