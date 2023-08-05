import multer from 'multer'
import ModelMahasiswa from '../models/ModelMahasiswa.js'
import fs from 'fs'
import path, { dirname } from 'path'
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

export const upload = multer({storage: storage});

export const updateMahasiswa = async(req, res) => {
    const {username, tempatLahir, tanggalLahir, alamat, telpon} = req.body;
    if(username === '') return res.status(404).json({message: 'Username tidak boleh kosong!'})
    if(alamat === '') return res.status(404).json({message: 'Alamat tidak boleh kosong!'})
    if(req.file){
        try {
            const file = req.file;
            if(file.size > 5000000) return res.status(402).json({message: 'Ukuran gambar maximal 5 mb!'})
            const mahasiswa = await ModelMahasiswa.findAll({where: {id_mhs: req.params.id}})
            const url = `${req.protocol}://${req.get("host")}/public/images/${file.filename}`
            if(mahasiswa[0].image !== 'default.png'){
                const oldImage = path.join(__dirname, '..', `public/images/${mahasiswa[0].image}`)
                fs.unlink(oldImage, (err) => {
                    console.log(err);
                })
            }
            await ModelMahasiswa.update({
                nama_mhs: username,
                tempat_lahir: tempatLahir,
                tanggal_lahir: tanggalLahir,
                alamat_mhs: alamat,
                telp_mhs: telpon,
                image: req.file.filename,
                url: url
            },{where: {id_mhs: req.params.id}})
            const mahasiswaUpdate = await ModelMahasiswa.findAll({where: {id_mhs: req.params.id}})
            const data = {
                id: req.params.id,
                name: mahasiswaUpdate[0].nama_mhs,
                nim: mahasiswaUpdate[0].nim_mhs,
                tempat: mahasiswaUpdate[0].tempat_lahir,
                tanggal: mahasiswaUpdate[0].tanggal_lahir,
                alamat: mahasiswaUpdate[0].alamat_mhs,
                telp: mahasiswaUpdate[0].telp_mhs,
                url: mahasiswaUpdate[0].url,
                role: 1,
            }
            const token = mahasiswa[0].token
            res.status(200).json({message: 'Update data berhasil', result: data, token})
        } catch (error) {
            res.status(500).json({message: error})
        }
    }else{
        try {
            await ModelMahasiswa.update({
                nama_mhs: username,
                tempat_lahir: tempatLahir,
                tanggal_lahir: tanggalLahir,
                alamat_mhs: alamat,
                telp_mhs: telpon,
            },{where: {id_mhs: req.params.id}})
            const mahasiswa = await ModelMahasiswa.findAll({where: {id_mhs: req.params.id}})
            const data = {
                id: req.params.id,
                name: mahasiswa[0].nama_mhs,
                nim: mahasiswa[0].nim_mhs,
                tempat: mahasiswa[0].tempat_lahir,
                tanggal: mahasiswa[0].tanggal_lahir,
                alamat: mahasiswa[0].alamat_mhs,
                telp: mahasiswa[0].telp_mhs,
                url: mahasiswa[0].url,
                role: 1
            }
            const token = mahasiswa[0].token
            res.status(200).json({message: 'Anda berhasil mengubah data!', result: data, token})
        } catch (error) {
            res.status(500).json({message: error})
        }
    }
}