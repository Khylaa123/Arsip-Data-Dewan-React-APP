// src/components/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import logoDprd from '../assets/logo-dprd.png';
import '../styles/LoginPage.css'; 
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa'; 

// --- DAFTAR AKUN PENTING:
// ADMIN: admin / admin123
// DEWAN: dewan / dewan123
// ---

const LoginPage = ({ onLogin }) => { 
    const navigate = useNavigate(); 
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); 

    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };

    const handleSubmit = (e) => {
        e.preventDefault(); 
        
        const trimmedEmail = email.trim();
        const trimmedPassword = password.trim();

        if (!trimmedEmail || !trimmedPassword) {
            alert('Email/NIP dan Password harus diisi.');
            return;
        }

        let userRole = '';
        
        // --- LOGIKA LOGIN ADMIN ---
        if (trimmedEmail === 'admin' && trimmedPassword === 'admin123') {
            userRole = 'admin';
        // --- LOGIKA LOGIN DEWAN ---
        } else if (trimmedEmail === 'dewan' && trimmedPassword === 'dewan123') {
            userRole = 'dewan';
        } else {
            alert('Email/NIP atau Password salah.');
            return;
        }
        
        onLogin(userRole); 
        
        // Redirect ke dashboard yang sesuai
        if (userRole === 'admin') {
            navigate('/dashboard/admin', { replace: true });
        } else {
            navigate('/dashboard/dewan', { replace: true });
        }
    };
    
    // ... (Bagian JSX Formulir Login sama)
    // ... (Hanya bagian handleSubmit yang penting untuk diperhatikan)
    
    return (
        <div className="login-page"> 
            <div className="login-form">
                
                <img src={logoDprd} alt="Logo DPRD" className="logo" />
                <h1>SIMPADU</h1>
                <p className="subtitle">Sistem Informasi Terpadu</p>

                <h2>Selamat Datang Kembali</h2>
                <p className="desc">Silahkan masuk ke akun Anda</p>

                <form onSubmit={handleSubmit}>
                    <label>Email / NIP</label>
                    <div className="input-box">
                        <FaEnvelope />
                        <input 
                            type="text" 
                            placeholder="Masukkan Email atau NIP"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <label>Password</label>
                    <div className="input-box">
                        <FaLock />
                        <input 
                            type={showPassword ? "text" : "password"}
                            placeholder="Masukkan Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {showPassword ? (
                            <FaEyeSlash onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }} />
                        ) : (
                            <FaEye onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }} />
                        )}
                    </div>

                    <div className="options">
                        <label><input type="checkbox" /> Ingat Saya</label>
                        <a href="#">Lupa Password?</a>
                    </div>

                    <button type="submit">Masuk</button>
                </form>

                <p className="footer">©2025 SIMPADU - Politeknik Negeri Banjarmasin</p>
            </div>
        </div>
    );
};

export default LoginPage;