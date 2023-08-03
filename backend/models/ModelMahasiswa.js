import {Sequelize} from 'sequelize'
import db from '../config/Database.js'

const {DataTypes} = Sequelize;

const ModelMahasiswa = db.define('tb_mhs',{
    id_mhs: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    nim_mhs:{
        type: DataTypes.CHAR
    },
    nama_mhs:{
        type: DataTypes.STRING
    },
    password:{
        type: DataTypes.STRING
    },
    tempat_lahir:{
        type: DataTypes.STRING
    },
    tanggal_lahir:{
        type: DataTypes.DATEONLY
    },
    alamat_mhs:{
        type: DataTypes.TEXT
    },
    telp_mhs:{
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

export default ModelMahasiswa;