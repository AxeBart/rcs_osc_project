import { useEffect, useState } from 'react'

export default function AdminPage() {
    const [message, setMessage] = useState('')
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))
        fetch('http://localhost:5000/admin/data', {
            headers: { Authorization: `Bearer ${user.token}` }
        }).then(res => res.json()).then(data => setMessage(data.message))
    }, [])
    return <div><h2>Admin</h2><p>{message}</p></div>
}
