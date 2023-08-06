import multer from 'multer'
import ModelAdmin from "../models/ModelAdmin.js";
import bcrypt from 'bcrypt'
import path, {dirname} from 'path'
import { fileURLToPath } from "url";
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const deleteFilePath = (filePath) => {
    const absolutePath = path.join(__dirname, '..' ,filePath);
    fs.unlink(absolutePath, (err) => {
        if(err) return console.log('Error deleting : ', err);
    })
}

export const upload = multer({storage: storage})

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

export const updateDataAdmin = async(req,res) => {
    const {username, password, confirmPassword} = req.body;
    if(username === '') return res.status(400).json({message: 'Username tidak boleh kosong!', error: 'username'})
    if(req.file){
        if(req.file.size > 3000000) {
            deleteFilePath(req.file.path)
            return res.status(400).json({message: 'Ukuran gambar minimal 3 mb!'})
        }
        if(req.file.mimetype !== 'image/jpg' && req.file.mimetype !== 'image/png' && req.file.mimetype !== 'image/jpeg'){
            deleteFilePath(req.file.path)
            return res.status(400).json({message: 'Harap anda mengupload gambar!'})
        }
        const url = `${req.protocol}://${req.get("host")}/public/images/${req.file.filename}`;
        const oldData = await ModelAdmin.findAll({where: {id_admin: req.params.id}})
        if(password !== ''){
            const validationPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
            if(!validationPassword.test(password)){
                deleteFilePath(req.file.path)
                return res.status(400).json({message: 'Password min terdapat 1 karakter, 1 angka, 1 huruf besar, dan 1 huruf kecil!', error: 'password'})
            }

            if(password !== confirmPassword){
                deleteFilePath(req.file.path)
                return res.status(400).json({message: 'Password tidak cocok!', error: 'confirmPassword'})
            }

            if(password.length <= 8){
                deleteFilePath(req.file.path)
                return res.status(400).json({message: 'Password minimal 8!', error: 'password'})
            }
            try {
                const salt = await bcrypt.genSalt()
                const hashingPassword = await bcrypt.hash(password, salt)

                await ModelAdmin.update({
                    username: username,
                    password: hashingPassword,
                    image: req.file.filename,
                    url: url,
                },{
                    where: {
                        id_admin: req.params.id
                    }
                })

                const response = await ModelAdmin.findAll({where: {id_admin: req.params.id}})

                const data = {
                    id: response[0].id_admin,
                    name: response[0].username,
                    url: response[0].url,
                    role: 3,
                }

                const token = response[0].token

                res.status(200).json({message: 'Anda berhasil mengubah profile!', result: data, token})
            } catch (error) {
                res.status(500).json({message: error})
            }
        }else{
           try {
                await ModelAdmin.update({
                    username: username,
                    image: req.file.image,
                    url: url,
                    role: 3,
                }, {
                    where: {
                        id_admin: req.params.id
                    }
                })

                const response = await ModelAdmin.findAll({where: {id_admin: req.params.id}})

                const data = {
                    id: response[0].id_admin,
                    name: response[0].username,
                    url: response[0].url,
                    role: 3,
                }

                const token = response[0].token
                res.status(200).json({message: 'Anda berhasil mengubah profile!', result: data, token})
           } catch (error) {
                res.status(500).json({message: error})
           }
        }

        if(oldData[0].image !== 'default.png'){
            const pathImage = path.join(__dirname, '..', `public/images/${oldData[0].image}`)
            fs.unlink(pathImage, (err) => {
                if(err) return console.log('Error delete: ', err);
            })
        }
    }else{
         if(password !== ''){
            const validationPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
            if(!validationPassword.test(password)){
                return res.status(400).json({message: 'Password min terdapat 1 karakter, 1 angka, 1 huruf besar, dan 1 huruf kecil!', error: 'password'})
            }

            if(password !== confirmPassword){
                return res.status(400).json({message: 'Password tidak cocok!', error: 'confirmPassword'})
            }

            if(password.length <= 8){
                return res.status(400).json({message: 'Password minimal 8!', error: 'password'})
            }
            try {
                const salt = await bcrypt.genSalt()
                const hashingPassword = await bcrypt.hash(password, salt)

                await ModelAdmin.update({
                    username: username,
                    password: hashingPassword,
                },{
                    where: {
                        id_admin: req.params.id
                    }
                })

                const response = await ModelAdmin.findAll({where: {id_admin: req.params.id}})

                const data = {
                    id: response[0].id_admin,
                    name: response[0].username,
                    url: response[0].url,
                    role: 3,
                }

                const token = response[0].token

                res.status(200).json({message: 'Anda berhasil mengubah profile!', result: data, token})
            } catch (error) {
                res.status(500).json({message: error})
            }
        }else{
           try {
                await ModelAdmin.update({
                    username: username,
                    role: 3,
                }, {
                    where: {
                        id_admin: req.params.id
                    }
                })

                const response = await ModelAdmin.findAll({where: {id_admin: req.params.id}})

                const data = {
                    id: response[0].id_admin,
                    name: response[0].username,
                    url: response[0].url,
                    role: 3,
                }

                const token = response[0].token
                res.status(200).json({message: 'Anda berhasil mengubah profile!', result: data, token})
           } catch (error) {
                res.status(500).json({message: error})
           }
        }
    }
}