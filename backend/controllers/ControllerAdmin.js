import ModelAdmin from "../models/ModelAdmin.js";
import bcrypt from 'bcrypt'

export const createDataAdmin = async(req, res) => {
    const {username, password} = req.body;
    try {
        const admin = await ModelAdmin.findAll({where: {username: username}})
        if(admin[0]) return res.status(404).json({message: 'Anda sudah terdaftar!'})
        const salt = await bcrypt.genSalt()
        const hashing = await bcrypt.hash(password, salt)
        await ModelAdmin.create({
            username: username,
            password: hashing,
            image: 'default.png',
            url: `${req.protocol}://${req.get("host")}/public/images/default.png`
        })

        res.status(201).json({message: 'Created successfully....'})
    } catch (error) {
        res.status(500).json({message: error})
    }
}