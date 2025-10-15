// src/components/ProfileDiriDewan.jsx
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarDewan from './SidebarDewan'; 
// Import style baru
import '../styles/ProfileDiriDewan.css'; 
import { FaCamera, FaUpload } from 'react-icons/fa'; // Ikon untuk upload

// Data Mockup untuk Profile Dewan
const initialProfileData = {
    namaLengkap: 'Gusti Rizky Sukma Iskandar Putera, S.E.',
    jabatan: 'Ketua DPRD',
    nip: '197905172007011003',
    email: 'gustirizkysip@dprd.go.id',
    tanggalLahir: '1979-05-17',
    alamat: 'Jalan Kenanga No. 12',
    noTelepon: '081234567890',
    jenisKelamin: 'Pria',
    agama: 'Islam',
    statusKawin: 'Kawin',
    golonganDarah: 'A',
    fotoUrl: 'https://placehold.co/120x120?text=GRS', 
};

const ProfileDiriDewan = ({ activePath, onLogout }) => {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    
    // State untuk data profil yang akan diedit
    const [profileData, setProfileData] = useState(initialProfileData);
    // State untuk melacak perubahan data sebelum disimpan
    const [tempData, setTempData] = useState(initialProfileData);
    // State untuk mengaktifkan/menonaktifkan mode edit
    const [isEditing, setIsEditing] = useState(false);

    // Handler Perubahan Input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setTempData(prev => ({ ...prev, [name]: value }));
    };

    // 1. Logika Mode Edit
    const handleEdit = () => {
        // Ketika tombol "Ubah Data" diklik, aktifkan mode edit
        setTempData(profileData); // Reset temporary data to current saved data
        setIsEditing(true);
    };

    // 2. Logika Tombol Batal
    const handleCancel = () => {
        if (window.confirm('Batalkan perubahan yang belum disimpan?')) {
            setTempData(profileData); // Kembalikan ke data awal
            setIsEditing(false); // Nonaktifkan mode edit
        }
    };

    // 3. Logika Simpan Perubahan
    const handleSave = () => {
        // Simulasi validasi data di sini
        if (!tempData.namaLengkap || !tempData.noTelepon) {
            alert('Nama Lengkap dan Nomor Telepon tidak boleh kosong.');
            return;
        }

        // Kirim data ke API (Simulasi)
        alert('Sedang menyimpan perubahan...');
        
        setTimeout(() => {
            // Update data profil yang tersimpan
            setProfileData(tempData);
            setIsEditing(false);
            alert('✅ Profile berhasil diperbarui!');
        }, 500);
    };

    // 4. Logika Ganti Foto Profil
    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const newPhotoUrl = reader.result;
                setTempData(prev => ({ ...prev, fotoUrl: newPhotoUrl }));
                if (!isEditing) {
                    // Jika diubah di luar mode edit, langsung simpan (Opsional)
                    // Untuk kesederhanaan, biarkan pengguna menekan Simpan Perubahan
                    alert('Foto telah diubah, jangan lupa klik Simpan Perubahan.');
                }
            };
            reader.readAsDataURL(file);
        }
    };
    
    const triggerFileSelect = () => {
        fileInputRef.current.click();
    };

    return (
        <div className="main-wrapper">
            <SidebarDewan activePath={activePath} onLogout={onLogout} />

            <main className="profile-content">
                <div className="profile-card">
                    
                    {/* Header Profil (Foto & Nama) */}
                    <div className="profile-header">
                        <div className="profile-pic-large" onClick={isEditing ? triggerFileSelect : undefined} style={{ cursor: isEditing ? 'pointer' : 'default' }}>
                            <img src={tempData.fotoUrl} alt="Foto Profil" className="profile-img-large" />
                            {isEditing && (
                                <div className="upload-overlay">
                                    <FaCamera className="upload-icon" />
                                </div>
                            )}
                            <input 
                                type="file" 
                                ref={fileInputRef} 
                                onChange={handlePhotoChange} 
                                style={{ display: 'none' }} 
                                accept="image/*"
                                disabled={!isEditing}
                            />
                        </div>

                        <div className="profile-info-text">
                            <h1>{tempData.namaLengkap}</h1>
                            <p>{tempData.jabatan}</p>
                        </div>
                    </div>

                    {/* Form Profil Detail */}
                    <div className="profile-form">
                        
                        {/* Kolom 1 */}
                        <div className="form-group">
                            <label htmlFor="namaLengkap">Nama Lengkap</label>
                            <input type="text" id="namaLengkap" name="namaLengkap" value={tempData.namaLengkap} onChange={handleChange} readOnly={!isEditing} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="nip">NIP</label>
                            {/* NIP biasanya tidak dapat diubah */}
                            <input type="text" id="nip" name="nip" value={tempData.nip} readOnly />
                        </div>
                        <div className="form-group">
                            <label htmlFor="jabatan">Jabatan</label>
                            {/* Jabatan tidak dapat diubah oleh dewan */}
                            <input type="text" id="jabatan" name="jabatan" value={tempData.jabatan} readOnly />
                        </div>
                        <div className="form-group">
                            <label htmlFor="tanggalLahir">Tanggal Lahir</label>
                            <input type="date" id="tanggalLahir" name="tanggalLahir" value={tempData.tanggalLahir} onChange={handleChange} readOnly={!isEditing} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="jenisKelamin">Jenis Kelamin</label>
                            <select id="jenisKelamin" name="jenisKelamin" value={tempData.jenisKelamin} onChange={handleChange} disabled={!isEditing}>
                                <option value="Pria">Pria</option>
                                <option value="Wanita">Wanita</option>
                            </select>
                        </div>

                        {/* Kolom 2 */}
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" value={tempData.email} onChange={handleChange} readOnly={!isEditing} />
                        </div>
                        <div className="form-group" style={{ gridColumn: 'span 2' }}>
                            <label htmlFor="alamat">Alamat</label>
                            <input type="text" id="alamat" name="alamat" value={tempData.alamat} onChange={handleChange} readOnly={!isEditing} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="noTelepon">Nomor Telepon</label>
                            <input type="text" id="noTelepon" name="noTelepon" value={tempData.noTelepon} onChange={handleChange} readOnly={!isEditing} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="agama">Agama</label>
                            <input type="text" id="agama" name="agama" value={tempData.agama} onChange={handleChange} readOnly={!isEditing} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="statusKawin">Status Perkawinan</label>
                            <select id="statusKawin" name="statusKawin" value={tempData.statusKawin} onChange={handleChange} disabled={!isEditing}>
                                <option value="Kawin">Kawin</option>
                                <option value="Belum Kawin">Belum Kawin</option>
                                <option value="Cerai Hidup">Cerai Hidup</option>
                                <option value="Cerai Mati">Cerai Mati</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="golonganDarah">Golongan Darah</label>
                            <input type="text" id="golonganDarah" name="golonganDarah" value={tempData.golonganDarah} onChange={handleChange} readOnly={!isEditing} />
                        </div>
                    </div>

                    {/* Footer Aksi */}
                    <div className="action-footer">
                        {!isEditing ? (
                            <button className="btn-edit" onClick={handleEdit}>
                                <FaCamera style={{ marginRight: '8px' }}/> Ubah Data
                            </button>
                        ) : (
                            <>
                                <button className="btn-cancel" onClick={handleCancel}>Batal</button>
                                <button className="btn-save" onClick={handleSave}>Simpan Perubahan</button>
                            </>
                        )}
                    </div>

                </div>
            </main>
        </div>
    );
};

export default ProfileDiriDewan;