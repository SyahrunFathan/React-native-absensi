import {Sequelize} from 'sequelize'
import db from '../config/Database.js'
import ModelMatkul from './ModelMatkul.js';

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

ModelJadwal.belongsTo(ModelMatkul, {foreignKey: 'matkul_id'})

export default ModelJadwal;