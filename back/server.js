const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const bcrypt = require('bcryptjs')

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())

const users = [
    { id: 1, username: 'admin', password: bcrypt.hashSync('adminpass', 8), role: 'admin' },
    { id: 2, username: 'gestionnaire', password: bcrypt.hashSync('managerpass', 8), role: 'gestionnaire' }
]

const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) return res.status(401).json({ message: 'Token manquant' })
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Token invalide' })
        req.user = decoded
        next()
    })
}

const authorizeRole = (role) => (req, res, next) => {
    if (req.user.role !== role) return res.status(403).json({ message: 'Accès refusé' })
    next()
}



app.get('/', (req, res) => {
    res.json({ message: 'Bienvenue sur notre API' })
})

app.post('/auth/login', (req, res) => {
    const { username, password } = req.body
    const user = users.find(u => u.username === username)
    if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ message: 'Identifiants invalides' })
    }
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' })
    res.json({ token, role: user.role })
})

app.get('/admin/data', authenticate, authorizeRole('admin'), (req, res) => {
    res.json({ message: 'Contenu admin' })
})

app.get('/gestionnaire/data', authenticate, authorizeRole('gestionnaire'), (req, res) => {
    res.json({ message: 'Contenu gestionnaire' })
})

app.listen(5000, () => console.log('Backend en écoute sur le port 5000'))
