// src/components/PengaturanAkunDewan.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarDewan from './SidebarDewan'; 
// PASTIKAN JALUR INI BENAR:
import '../styles/PengaturanAkunDewan.css'; 
// Import ikon yang dibutuhkan untuk mengganti Font Awesome
import { FaLock, FaEye, FaEyeSlash, FaSignOutAlt } from 'react-icons/fa';

const PengaturanAkunDewan = ({ activePath, onLogout }) => {
    const navigate = useNavigate();
    
    // State untuk input form
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    // State untuk visibilitas password
    const [showOldPass, setShowOldPass] = useState(false);
    const [showNewPass, setShowNewPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);

    // 1. Logika Password Visibility Toggle
    const togglePasswordVisibility = (field) => {
        if (field === 'old') setShowOldPass(prev => !prev);
        if (field === 'new') setShowNewPass(prev => !prev);
        if (field === 'confirm') setShowConfirmPass(prev => !prev);
    };

    // 2. Logika Tombol Simpan Perubahan (Sesuai pengaturan_akun_dewan.js)
    const handleSave = () => {
        // Cek input kosong
        if (!oldPassword || !newPassword || !confirmPassword) {
            alert('Semua kolom password harus diisi.');
            return;
        }
        
        // Cek validasi password
        if (newPassword !== confirmPassword) {
            alert('Password Baru dan Konfirmasi Password tidak cocok!');
            return;
        }

        // Simulasi proses ganti password
        alert('Sedang memproses perubahan password...');
        
        // Asumsi sukses (menggunakan setTimeout untuk simulasi loading)
        setTimeout(() => {
            alert('✅ Perubahan password berhasil disimpan!');
            // Reset form state setelah sukses
            setOldPassword('');
            setNewPassword('');
            setConfirmPassword('');
        }, 500);
    };

    // 3. Logika Tombol Batal (Sesuai pengaturan_akun_dewan.js)
    const handleCancel = () => {
        if (window.confirm('Batalkan perubahan dan kembali ke pengaturan sebelumnya?')) {
            // Reset form state
            setOldPassword('');
            setNewPassword('');
            setConfirmPassword('');
        }
    };

    return (
        <div className="main-wrapper">
            <SidebarDewan activePath={activePath} onLogout={onLogout} />

            <main className="settings-content">
                <div className="settings-card">
                    <h1 className="setting-title">Pengaturan Akun</h1>
                    <p className="setting-subtitle">Ubah password dan informasi login Anda</p>

                    {/* Menggunakan div untuk form fields */}
                    <div className="settings-form">
                        {/* Username (Readonly) */}
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <div className="input-container username-field">
                                {/* Nilai username dibuat statis sesuai HTML */}
                                <input type="text" id="username" value="gustirizkysip" readOnly />
                                {/* Ikon Kunci untuk Readonly Field */}
                                <FaLock className="input-icon" />
                            </div>
                        </div>

                        {/* Password Lama */}
                        <div className="form-group">
                            <label htmlFor="old-password">Password Lama</label>
                            <div className="input-container password-field">
                                <input 
                                    type={showOldPass ? "text" : "password"} 
                                    id="old-password" 
                                    placeholder="Masukan Password Lama"
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                />
                                {showOldPass ? (
                                    <FaEyeSlash className="input-icon" onClick={() => togglePasswordVisibility('old')} style={{ cursor: 'pointer' }} />
                                ) : (
                                    <FaEye className="input-icon" onClick={() => togglePasswordVisibility('old')} style={{ cursor: 'pointer' }} />
                                )}
                            </div>
                        </div>

                        {/* Password Baru */}
                        <div className="form-group">
                            <label htmlFor="new-password">Password Baru</label>
                            <div className="input-container password-field">
                                <input 
                                    type={showNewPass ? "text" : "password"} 
                                    id="new-password" 
                                    placeholder="Masukan Password Baru"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                                {showNewPass ? (
                                    <FaEyeSlash className="input-icon" onClick={() => togglePasswordVisibility('new')} style={{ cursor: 'pointer' }} />
                                ) : (
                                    <FaEye className="input-icon" onClick={() => togglePasswordVisibility('new')} style={{ cursor: 'pointer' }} />
                                )}
                            </div>
                        </div>

                        {/* Konfirmasi Password */}
                        <div className="form-group">
                            <label htmlFor="confirm-password">Konfirmasi Password</label>
                            <div className="input-container password-field">
                                <input 
                                    type={showConfirmPass ? "text" : "password"} 
                                    id="confirm-password" 
                                    placeholder="Konfirmasi Password Baru"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                {showConfirmPass ? (
                                    <FaEyeSlash className="input-icon" onClick={() => togglePasswordVisibility('confirm')} style={{ cursor: 'pointer' }} />
                                ) : (
                                    <FaEye className="input-icon" onClick={() => togglePasswordVisibility('confirm')} style={{ cursor: 'pointer' }} />
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="action-footer">
                        {/* Tombol Logout memanggil onLogout dari props, ditambahkan ikon untuk konsistensi */}
                        <button className="btn-logout" onClick={onLogout}>
                            <FaSignOutAlt style={{ fontSize: '20px', marginRight: '5px' }} /> Logout
                        </button>
                        <div className="btn-group">
                            <button className="btn-cancel" onClick={handleCancel}>Batal</button>
                            {/* Tombol Simpan Perubahan memanggil handleSave */}
                            <button 
                                className="btn-save" 
                                onClick={handleSave}
                                // Menonaktifkan tombol jika ada kolom yang kosong
                                disabled={!oldPassword || !newPassword || !confirmPassword}
                            >
                                Simpan Perubahan
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default PengaturanAkunDewan;