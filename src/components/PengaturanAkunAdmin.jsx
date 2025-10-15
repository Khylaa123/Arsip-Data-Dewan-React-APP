// src/components/PengaturanAkunAdmin.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarAdmin from './SidebarAdmin'; 
// Menggunakan style yang dimodifikasi dari Pengaturan Akun Dewan untuk tampilan form
import '../styles/PengaturanAkunDewan.css'; 
import { FaHome, FaLock, FaEye, FaEyeSlash, FaSignOutAlt, FaTimes, FaSave } from 'react-icons/fa';

const PengaturanAkunAdmin = ({ activePath, onLogout }) => {
    const navigate = useNavigate();
    
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const [showOldPass, setShowOldPass] = useState(false);
    const [showNewPass, setShowNewPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);

    const togglePasswordVisibility = (field) => {
        if (field === 'old') setShowOldPass(prev => !prev);
        if (field === 'new') setShowNewPass(prev => !prev);
        if (field === 'confirm') setShowConfirmPass(prev => !prev);
    };

    const handleSave = (e) => {
        e.preventDefault();
        
        if (!oldPassword || !newPassword || !confirmPassword) {
            alert('Semua kolom password harus diisi.');
            return;
        }
        
        if (newPassword !== confirmPassword) {
            alert('Password Baru dan Konfirmasi Password tidak cocok!');
            return;
        }

        alert('Sedang memproses perubahan password untuk Admin...');
        
        setTimeout(() => {
            alert('✅ Perubahan password berhasil disimpan!');
            setOldPassword('');
            setNewPassword('');
            setConfirmPassword('');
        }, 800);
    };

    const handleCancel = () => {
        if (window.confirm('Batalkan perubahan dan kembali ke Dashboard?')) {
            navigate('/dashboard/admin');
        }
    };
    
    const handleHomeClick = () => {
        navigate('/dashboard/admin');
    };

    return (
        <div className="main-wrapper">
            <SidebarAdmin activePath={activePath} onLogout={onLogout} />

            <main className="content-area"> 
                {/* Ikon Rumah (House Icon) di kanan atas */}
                <div className="header-admin-profile">
                    <div className="profile-pic-large-admin" onClick={handleHomeClick} style={{ cursor: 'pointer' }}>
                        <FaHome className="home-icon" />
                    </div>
                </div>
                
                {/* Breadcrumb (Diambil dari style Pengaturan Akun Dewan karena tata letaknya berbeda dari Data Dewan) */}
                <div className="settings-content" style={{ padding: '20px 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    
                    <div className="settings-card">
                        <h1 className="setting-title" style={{ color: '#40342F' }}>Pengaturan Akun Admin</h1>
                        <p className="setting-subtitle">Ubah password dan informasi login Admin</p>

                        <form className="settings-form" onSubmit={handleSave}>
                            {/* Username */}
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <div className="input-container username-field">
                                    <input type="text" id="username" value="admin" readOnly />
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
                                        required
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
                                        required
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
                                        required
                                    />
                                    {showConfirmPass ? (
                                        <FaEyeSlash className="input-icon" onClick={() => togglePasswordVisibility('confirm')} style={{ cursor: 'pointer' }} />
                                    ) : (
                                        <FaEye className="input-icon" onClick={() => togglePasswordVisibility('confirm')} style={{ cursor: 'pointer' }} />
                                    )}
                                </div>
                            </div>
                        </form>

                        <div className="action-footer">
                            <button className="btn-logout" onClick={onLogout}>
                                <FaSignOutAlt style={{ fontSize: '20px', marginRight: '5px' }} /> Logout
                            </button>
                            <div className="btn-group">
                                <button type="button" className="btn-cancel" onClick={handleCancel}>
                                    <FaTimes style={{ marginRight: '8px' }}/> Batal
                                </button>
                                <button 
                                    type="submit" 
                                    className="btn-save" 
                                    onClick={handleSave}
                                    disabled={!oldPassword || !newPassword || !confirmPassword || newPassword !== confirmPassword}
                                >
                                    <FaSave style={{ marginRight: '8px' }}/> Simpan Perubahan
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default PengaturanAkunAdmin;