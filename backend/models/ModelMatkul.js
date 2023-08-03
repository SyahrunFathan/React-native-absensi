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
    nama_matkul: {
        type: DataTypes.STRING
    },
    dosen_id: {
        type: DataTypes.INTEGER
    }
},{
    freezeTableName: true
})

ModelMatkul.belongsTo(ModelDosen, {foreignKey: 'dosen_id'});

export default ModelMatkul;