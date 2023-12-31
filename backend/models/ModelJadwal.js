import {Sequelize} from 'sequelize'
import db from '../config/Database.js'

const {DataTypes} = Sequelize;

const ModelJadwal = db.define('tb_jadwal',{
    id_jadwal: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    matkul_id: {
        type: DataTypes.INTEGER
    },
    hari: {
        type: DataTypes.STRING
    },
    jam_mulai: {
        type: DataTypes.TIME
    },
    jam_selesai: {
        type: DataTypes.TIME
    }
},{
    freezeTableName: true
})


export default ModelJadwal;