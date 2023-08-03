import {Sequelize} from 'sequelize';
import db from '../config/Database.js';

const {DataTypes} = Sequelize;

const ModelDosen = db.define('tb_dosen',{
    id_dosen:{
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    nip_dosen: {
        type: DataTypes.CHAR
    },
    nama_dosen: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    alamat_dosen:{
        type: DataTypes.TEXT
    },
    telp_dosen:{
        type: DataTypes.CHAR
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

export default ModelDosen;