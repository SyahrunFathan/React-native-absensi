import {Sequelize} from 'sequelize'

const db = new Sequelize('db_absensi','root','',{
    host: 'localhost',
    dialect: 'mysql'
});


export default db;