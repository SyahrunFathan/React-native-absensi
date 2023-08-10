import {Sequelize} from 'sequelize'
import db from '../config/Database.js';
import ModelMatkul from './ModelMatkul.js';
import ModelMahasiswa from './ModelMahasiswa.js'

const {DataTypes} = Sequelize;

const ModelKrs = db.define('tb_krs',{
    id_krs:{
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    matkul_id: {
        type: DataTypes.INTEGER
    },
    mhs_id: {
        type: DataTypes.INTEGER
    },
    status: {
        type: DataTypes.INTEGER
    }
},{
    freezeTableName: true
})

ModelKrs.belongsTo(ModelMahasiswa,{foreignKey: 'mhs_id'})
ModelKrs.belongsTo(ModelMatkul,{foreignKey: 'matkul_id'})

export default ModelKrs;