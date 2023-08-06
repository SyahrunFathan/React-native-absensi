import { format } from "date-fns";
import ModelMatkul from "../models/ModelMatkul.js";

export const createData = async(req, res) => {
    const {idDosen, matkul, jumlahSks, kodeMatkul} = req.body;
    if(idDosen === '') return res.status(400).json({message: 'Pilih dosen terlebih dahulu!'})
    if(matkul === '') return res.status(400).json({message: 'Isi mata kuliah terlebih dahulu!'})
    if(jumlahSks === '') return res.status(400).json({message: 'Jumlah SKS harus terisi!'})

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