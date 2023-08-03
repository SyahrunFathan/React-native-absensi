import ModelAdmin from "../models/ModelAdmin.js";
import ModelDosen from "../models/ModelDosen.js";
import ModelMahasiswa from "../models/ModelMahasiswa.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const Login = async(req, res) => {
    const {username, password, role} = req.body;
    if(username === '' || password === ''){
        res.status(404).json({message: 'Pastikan semua inputan terisi!'})
    }else{
        if(role === 1) {
            try {
                const mahasiswa = await ModelMahasiswa.findAll({where: {nim_mhs: username}})
                if(!mahasiswa[0]) return res.status(404).json({message: 'Anda tidak terdaftar!'})
                const match = await bcrypt.compare(password, mahasiswa[0].password)
                if(!match) return res.status(400).json({message: 'Password anda salah!'})
                const id_mhs = mahasiswa[0].id_mhs
                const name = mahasiswa[0].nama_mhs
                const nim = mahasiswa[0].nim_mhs
    
                const token = jwt.sign({id_mhs, name, nim}, process.env.ACCESS_TOKEN, {expiresIn: '24h'})
                await ModelMahasiswa.update({token: token},{where: {id_mhs: id_mhs}})
    
                res.cookie('token', token, {
                    httpOnly: true,
                    maxAge: 24 * 60 * 60 * 1000
                })
    
                const data = {
                    id: id_mhs,
                    name: name,
                    nim: nim,
                    url: mahasiswa[0].url,
                    tempat: mahasiswa[0].tempat_lahir,
                    tanggal: mahasiswa[0].tanggal_lahir,
                    alamat: mahasiswa[0].alamat_mhs,
                    telp: mahasiswa[0].telp_mhs,
                    role: 1,
                }
    
                res.status(200).json({result: data, token})
            } catch (error) {
                res.status(500).json({message: error})
            }
        }else if(role === 2){
            try {
                const dosen = await ModelDosen.findAll({where: {nip_dosen: username}})
                if(!dosen[0]) return res.status(404).json({message: 'Anda tidak terdaftar!'})
                const match = await bcrypt.compare(password, dosen[0].password)
                if(!match) return res.status(400).json({message: 'Password anda salah!'})
                const id_dosen = dosen[0].id_dosen
                const nip = dosen[0].nip_dosen
                const name = dosen[0].nama_dosen
    
                const token = jwt.sign({id_dosen, nip, name}, process.env.ACCESS_TOKEN, {expiresIn: '24h'})
                await ModelDosen.update({token: token}, {where: {id_dosen: id_dosen}})
    
                res.cookie('token', token, {
                    httpOnly: true,
                    maxAge: 24 * 60 * 60 * 1000
                })
    
                const data = {
                    id: dosen[0].id_dosen,
                    nip: dosen[0].nip_dosen,
                    name: dosen[0].nama_dosen,
                    alamat: dosen[0].alamat_dosen,
                    telp: dosen[0].telp_dosen,
                    url: dosen[0].url,
                    role: 2,
                }
    
                res.status(200).json({result: data, token})
            } catch (error) {
                res.status(500).json({message: error})
            }
        }else{
            try {
                const admin = await ModelAdmin.findAll({where: {username: username}})
                if(!admin[0]) return res.status(404).json({message: 'Anda tidak terdaftar!'})
                const match = await bcrypt.compare(password, admin[0].password)
                if(!match) return res.status(400).json({message: 'Password anda salah!'})
                const id_admin = admin[0].id_admin
                const name = admin[0].username

                const token = jwt.sign({id_admin ,name}, process.env.ACCESS_TOKEN, {expiresIn: '24h'})
                await ModelAdmin.update({token: token}, {where: {id_admin: id_admin}})

                res.cookie('token', token, {
                    httpOnly: true,
                    maxAge: 24 * 60 * 60 * 1000
                })
                const data = {
                    id: admin[0].id_admin,
                    name: admin[0].username,
                    url: admin[0].url,
                    role: 3,
                }

                res.status(200).json({result: data, token})
            } catch (error) {
                res.status(500).json({message: error})
            }
        }
    }
}

export const Register = async(req, res) => {
    const {nim, nama, alamat, telp, role} = req.body;
    if(nim === '') return res.status(404).json({message: 'NIM/NIP tidak boleh kosong!'})
    if(nama === '') return res.status(404).json({message: 'Nama tidak boleh kosong!'})
    if(telp === '') return res.status(404).json({message: 'Telpon tidak boleh kosong!'})
    if(role === 1){
        try {
            const mahasiswa = await ModelMahasiswa.findAll({where: {nim_mhs: nim}})
            if(mahasiswa[0]) return res.status(400).json({message: 'Mahasiswa sudah terdaftar!'})
            const password = nim
            const salt = await bcrypt.genSalt()
            const hashing = await bcrypt.hash(password, salt)

            await ModelMahasiswa.create({
                nim_mhs: nim,
                nama_mhs: nama,
                password: hashing,
                alamat_mhs: alamat,
                telp_mhs: telp,
                image: 'default.png',
                url: `${req.protocol}://${req.get("host")}/public/images/default.png`
            })

            res.status(201).json({message: 'Mahasiswa ' + nama + ' berhasil di daftar!'})
        } catch (error) {
            res.status(500).json({message: error})
        }
    }else{
        try {
            const dosen = await ModelDosen.findAll({where: {nip_dosen: nim}})
            if(dosen[0]) return res.status(400).json({message: 'Dosen sudah terdaftar!'})
            const password = nim
            const salt = await bcrypt.genSalt()
            const hashing = await bcrypt.hash(password, salt)

            await ModelDosen.create({
                nip_dosen: nim,
                nama_dosen: nama,
                password: hashing,
                alamat_dosen: alamat,
                telp_dosen: telp,
                image: 'default.png',
                url: `${req.protocol}://${req.get("host")}/public/images/default.png`
            })

            res.status(201).json({message: 'Dosen ' + nama + ' berhasil di daftar!'})
        } catch (error) {
            res.status(500).json({message: error})
        }
    }
}

export const Logout = async(req, res) => {
    const token = req.cookies.token
    if(!token) return res.sendStatus(204)
    const mahasiswa = await ModelMahasiswa.findAll({where: {token: token}})
    if(mahasiswa[0]){
        const id_mhs = mahasiswa[0].id_mhs
        await ModelMahasiswa.update({token: null}, {where: {id_mhs: id_mhs}})
    }else{
        const dosen = await ModelDosen.findAll({where: {token: token}})
        const id_dosen = dosen[0].id_dosen
        await ModelDosen.update({token: null},{where: {id_dosen: id_dosen}})
    }

    res.clearCookie('token')

    res.status(200).json({message: 'Logout Berhasil!'})
}
