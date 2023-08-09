import ModelKrs from "../models/ModelKrs.js";
import ModelMatkul from "../models/ModelMatkul.js";

export const createKrsMahasiswa = async(req, res) => {
    const {mhs_id, matkul_id} = req.body;
    if(matkul_id.length === 0) return res.status(400).json({message: 'Pilih mata kuliah terlebih dahulu!'})
    try {
        await Promise.all(matkul_id.map(async(id) => {
            await ModelKrs.create({mhs_id: mhs_id, matkul_id: id})
        }))

        res.status(201).json({message: 'Krs berhasil di program!'})
    } catch (error) {
        res.status(500).json({message: error})
    }
}