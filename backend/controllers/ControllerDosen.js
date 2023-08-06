import multer from 'multer'
import ModelDosen from '../models/ModelDosen.js'
import bcrypt from 'bcrypt'
import fs from 'fs'
import path, {dirname} from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const deleteUploadFile = (filePath) => {
    const absolutePath = path.join(__dirname, '..', filePath)
    fs.unlink(absolutePath, (err) => {
        console.error('Error deleting: ', err);
    })
}

export const upload = multer({storage: storage})


export const updateDataDosen = async(req, res) => {
    const {username, alamat, telpon} = req.body;
    const dosen = await ModelDosen.findAll({where: {id_dosen: req.params.id}})
    if(req.file){
        if(username === ''){
            deleteUploadFile(req.file.path)
            return res.status(400).json({message: 'Username tidak boleh kosong!'})
        }

        if(alamat === ''){
            deleteUploadFile(req.file.path)
            return res.status(400).json({message: 'Alamat tidak boleh kosong!'})
        } 

        if(telpon === ''){
            deleteUploadFile(req.file.path)
            return res.status(400).json({message: 'Alamat tidak boleh kosong!'})
        } 

        if(req.file.size > 5000000) {
            deleteUploadFile(req.file.path)
            return res.status(400).json({message: 'Ups! Ukuran gambar terlalu besar, min 5 mb!'})
        }
        
        if(req.file.mimetype !== 'image/jpg' && req.file.mimetype !== 'image/jpeg' && req.file.mimetype !== 'image/png'){
            deleteUploadFile(req.file.path)
            return res.status(400).json({message: 'Ups! Harap anda mengupload gambar!'})
        }

        if(dosen[0].image !== 'default.png'){
            const pathImage = path.join(__dirname, '..', `public/images/${dosen[0].image}`)
            fs.unlink(pathImage, (err) => {
                console.error('Error delete file : ', err);
            })
        }


        const image = req.file.filename
        const url = `${req.protocol}://${req.get("host")}/public/images/${image}`
        try {
            await ModelDosen.update({
            nama_dosen: username,
            alamat_dosen: alamat,
            telp_dosen: telpon,
            image: image,
            url: url,
            }, {
                where : {
                    id_dosen: req.params.id
                }
            })

            const response = await ModelDosen.findAll({where: {id_dosen: req.params.id}})
            const data = {
                id: response[0].id_dosen,
                nip: response[0].nip_dosen,
                name: response[0].nama_dosen,
                alamat: response[0].alamat_dosen,
                telp: response[0].telp_dosen,
                url: response[0].url,
                role: 2,
            }

            const token = response[0].token

            res.status(200).json({message: 'Anda berhasil mengubah data!', result: data, token})
        } catch (error) {
            res.status(500).json({message: error})
        }
    } else {
        if(username === ''){
            return res.status(400).json({message: 'Username tidak boleh kosong!'})
        }

        if(alamat === ''){
            return res.status(400).json({message: 'Alamat tidak boleh kosong!'})
        } 

        if(telpon === ''){
            return res.status(400).json({message: 'Alamat tidak boleh kosong!'})
        } 

       try {
         await ModelDosen.update({
            nama_dosen: username,
            alamat_dosen: alamat,
            telp_dosen: telpon,
        },{
            where: {
                id_dosen: req.params.id
            }
        })

        const response = await ModelDosen.findAll({where: {id_dosen: req.params.id}})
        const data = {
            id: response[0].id_dosen,
            nip: response[0].nip_dosen,
            name: response[0].nama_dosen,
            alamat: response[0].alamat_dosen,
            telp: response[0].telp_dosen,
            url: response[0].url,
            role: 2,
        }

        const token = response[0].token

        res.status(200).json({message: 'Anda berhasil mengubah data!', result: data, token})
       } catch (error) {
        res.status(500).json({message: error})
       }
    }
}

export const getDataDosen = async(req, res) => {
    try {
        const response = await ModelDosen.findAll()
        res.status(200).json({result: response})
    } catch (error) {
        res.status(500).json({message: error})
    }
}