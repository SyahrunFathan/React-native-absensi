import ModelAbsen from "../models/ModelAbsen.js";
import ModelMahasiswa from "../models/ModelMahasiswa.js";
import ModelMatkul from "../models/ModelMatkul.js";

export const getDataById = async(req, res) => {
    try {
        const response = await ModelAbsen.findAll({
            where: {
                mhs_id: req.params.id
            },
            include: [ModelMahasiswa, ModelMatkul]
        })
        res.status(200).json({result: response[0]})
    } catch (error) {
        res.status(500).json({message: error})
    }
}