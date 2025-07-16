import { useState } from 'react'

export default function LoginPage() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async () => {
        const res = await fetch('http://localhost:5000/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        })
        const data = await res.json()
        if (res.ok) {
            localStorage.setItem('user', JSON.stringify({ token: data.token, role: data.role }))
            window.location.href = `/${data.role}`
        } else {
            alert(data.message)
        }
    }

    return (
        <div>
            <h2>Connexion</h2>
            <input placeholder="Nom" value={username} onChange={e => setUsername(e.target.value)} />
            <input type="password" placeholder="Mot de passe" value={password} onChange={e => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Se connecter</button>
        </div>
    )
}
