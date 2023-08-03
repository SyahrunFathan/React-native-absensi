import {Sequelize} from 'sequelize';
import db from '../config/Database.js';
import ModelMatkul from './ModelMatkul.js';
import ModelMahasiswa from './ModelMahasiswa.js';

const {DataTypes} = Sequelize;

const ModelAbsen = db.define('tb_absen',{
    id_absen: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    matkul_id: {
        type: DataTypes.INTEGER
    },
    mhs_id:{
        type: DataTypes.INTEGER
    },
    tanggal_absen: {
        type: DataTypes.DATEONLY
    },
    status: {
        type: DataTypes.STRING
    }
},{
    freezeTableName: true
})

ModelAbsen.belongsTo(ModelMatkul, {foreignKey: 'matkul_id'})
ModelAbsen.belongsTo(ModelMahasiswa, {foreignKey: 'mhs_id'})

export default ModelAbsen;