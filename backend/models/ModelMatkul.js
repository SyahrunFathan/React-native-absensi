import { Sequelize } from "sequelize";
import db from '../config/Database.js';
import ModelDosen from "./ModelDosen.js";

const {DataTypes} = Sequelize;

const ModelMatkul = db.define('tb_matkul',{
    id_matkul: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    kode_matkul: {
        type: DataTypes.CHAR
    },
    nama_matkul: {
        type: DataTypes.STRING
    },
    sks_matkul: {
        type: DataTypes.INTEGER
    },
    dosen_id: {
        type: DataTypes.INTEGER
    }
},{
    freezeTableName: true
})

ModelMatkul.belongsTo(ModelDosen, {foreignKey: 'dosen_id'});

export default ModelMatkul;