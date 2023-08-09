import { format } from "date-fns";
import ModelMatkul from "../models/ModelMatkul.js";
import ModelJadwal from "../models/ModelJadwal.js";
import ModelKrs from "../models/ModelKrs.js";
import { Op, Sequelize } from "sequelize";

export const createData = async(req, res) => {
    const {idDosen, matkul, jumlahSks, kodeMatkul} = req.body;
    if(matkul === '') return res.status(400).json({message: 'Isi mata kuliah terlebih dahulu!'})
    if(jumlahSks === '') return res.status(400).json({message: 'Jumlah SKS harus terisi!'})
    if(idDosen === '') return res.status(400).json({message: 'Pilih dosen terlebih dahulu!'})

    try {
        const checkData = await ModelMatkul.findAll({where: {nama_matkul: matkul}})
        if(checkData[0]) return res.status(400).json({message: 'Mata kuliah ini sudah ada!'})
        await ModelMatkul.create({
            kode_matkul: kodeMatkul,
            nama_matkul: matkul,
            sks_matkul: jumlahSks,
            dosen_id: idDosen
        })

        res.status(201).json({message: `Mata kuliah ${matkul} dengan bobot SKS ${jumlahSks} berhasil di simpan!`})
    } catch (error) {
        res.status(500).json({message: error})
    }
}

export const generatorCode = async(req, res) => {
    try {
        const currentDate = new Date();
        const formatDate = format(currentDate, 'yyyyMMddmmss')
        const code = `F${formatDate}`

        res.status(200).json({code: code})
    } catch (error) {
        res.status(500).json({message: error})
    }
}

export const getDataMatkul = async(req, res) => {
    try {
        const response = await ModelMatkul.findAll()

        res.status(200).json({result: response})
    } catch (error) {
        res.status(500).json({message: error})
    }
}

export const getDataMatkulJoinToJadwal = async(req, res) => {
    try {
        const response = await ModelMatkul.findAll({
            include:{
                model: ModelJadwal,
                as: 'jadwal',
                foreignKey: 'matkul_id',
            },
            where:{
                id_matkul: {[Op.notIn]: Sequelize.literal(`(SELECT matkul_id FROM ${ModelKrs.getTableName()})`)}
            }
        })
        res.status(200).json({result: response})
    } catch (error) {
        res.status(500).json({message: error})
    }
}

// export const getDataByUser = async(req, res) => {
//     try {
//         const response = await ModelKrs.findAll({
//             include: {
//                 model: ModelJadwal,
//                 as: 'jadwal',
//                 foreignKey: 'matkul_id',
//             },
//             where: {
//                 mhs_id: {
//                     [Op.in]: Sequelize.literal(`(SELECT )`)
//                 }
//             }
//         })
//         res.status(200).json({result: response})
//     } catch (error) {
//         res.status(500).json({message: error})
//     }
// }