import ModelKrs from "../models/ModelKrs.js";
import ModelMatkul from "../models/ModelMatkul.js";
import ModelMahasiswa from "../models/ModelMahasiswa.js";
import ModelJadwal from "../models/ModelJadwal.js";

export const createKrsMahasiswa = async(req, res) => {
    const {mhs_id, matkul_id} = req.body;
    if(matkul_id.length === 0) return res.status(400).json({message: 'Pilih mata kuliah terlebih dahulu!'})
    try {
        await Promise.all(matkul_id.map(async(id) => {
            await ModelKrs.create({mhs_id: mhs_id, matkul_id: id, status: 0})
        }))

        res.status(201).json({message: 'Krs berhasil di program!'})
    } catch (error) {
        res.status(500).json({message: error})
    }
}

export const getDataKrsJoin = async(req, res) => {
    try {
        const response = await ModelKrs.findAll({
            where: {
                mhs_id: req.params.id
            },
            include: [
                {
                    model: ModelMahasiswa,
                    foreignKey: 'mhs_id'
                },
                {
                    model: ModelMatkul,
                    foreignKey: 'matkul_id',
                    include: [
                        {
                            model: ModelJadwal,
                            as: 'jadwal',
                            foreignKey: 'matkul_id'
                        }
                    ]
                }
            ]
        })

        res.status(200).json({result: response})
    } catch (error) {
        res.status(500).json({message: error})
    }
}

export const deleteKrs = async(req, res) => {
    try {
        const response = await ModelKrs.findOne({where: {id_krs: req.params.id}, include: {model: ModelMatkul, foreignKey: 'matkul_id'}})
        await ModelKrs.destroy({where: {id_krs: req.params.id}})

        res.status(200).json({message: `Mk dengan Kode ${response.tb_matkul.kode_matkul} berhasil di hapus!`})
    } catch (error) {
        res.status(500).json({message: error})
    }
}