import ModelJadwal from '../models/ModelJadwal.js'
import { Op } from 'sequelize';

export const createDataJadwal = async(req, res) => {
    const {idMatkul, hari, jamMulai, jamSelesai} = req.body;
    if(idMatkul === '') return res.status(400).json({message: 'Mata kuliah harus di pilih!'})
    if(hari === '') return res.status(400).json({message: 'Hari perkuliahan harus di pilih!'})
    if(jamMulai === '') return res.status(400).json({message: 'Jam mulai perkuliahan harus di pilih!'})
    if(jamSelesai === '') return res.status(400).json({message: 'Jam selesai perkuliahan harus di pilih!'})
    const convertJamMulai = new Date(jamMulai).toISOString().split('T')[1].split('.')[0]
    const convertJamMSelesai = new Date(jamSelesai).toISOString().split('T')[1].split('.')[0]
    try {
        const checkMk = await ModelJadwal.findAll({where: {matkul_id: idMatkul}})
        const checkWaktu = await ModelJadwal.findAll({
            where: {
                hari: hari,
                [Op.or]: [
                    {
                        jam_mulai: {
                            [Op.between]: [convertJamMulai, convertJamMSelesai]
                        },
                    },
                    {
                        jam_selesai:{
                            [Op.between]: [convertJamMulai, convertJamMSelesai]
                        },
                    }
                ]
            }
        })
        if(checkMk[0]) return res.status(400).json({message: 'Perkuliahan ini sudah terjadwal!'})
        if(checkWaktu[0]) return res.status(400).json({message: `Perkuliahan hari ${checkWaktu[0].hari} jam ${checkWaktu[0].jam_mulai} - ${checkWaktu[0].jam_selesai} sudah full!`})
        await ModelJadwal.create({
            matkul_id: idMatkul,
            hari: hari,
            jam_mulai: convertJamMulai,
            jam_selesai: convertJamMSelesai
        })

        res.status(201).json({message: 'Jadwal berhasil di simpan!'})
    } catch (error) {
        res.status(500).json({message: error})
    }
}