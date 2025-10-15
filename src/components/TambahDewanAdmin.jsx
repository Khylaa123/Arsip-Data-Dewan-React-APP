// src/components/TambahDewanAdmin.jsx (Digunakan untuk Tambah dan Edit)
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SidebarAdmin from './SidebarAdmin'; 
import '../styles/TambahDewanAdmin.css'; 
import { FaHome, FaCalendarAlt, FaUpload } from 'react-icons/fa';

// Mock Data untuk inisialisasi dan edit
const initialProfileData = {
    namaLengkap: '',
    nip: '',
    jabatan: 'Anggota',
    fraksi: 'Fraksi Demokrat',
    akd: 'Komisi I',
    dapil: 'Banjarbaru 1',
    email: '',
    tanggalLahir: '',
    alamat: '',
    noTelepon: '',
    jenisKelamin: 'Pria',
    agama: '',
    statusKawin: 'Kawin',
    golonganDarah: '',
    fotoUrl: 'https://placehold.co/120x120?text=FOTO', 
};

// Data Opsi
const JABATAN_OPTIONS = ['Ketua', 'Wakil Ketua I', 'Wakil Ketua II', 'Sekretaris', 'Anggota'];
const FRAKSI_OPTIONS = ['Fraksi Demokrat', 'Fraksi Golkar', 'Fraksi PDI-P', 'Fraksi Gerindra', 'Fraksi Nasdem'];
const AKD_OPTIONS = ['Komisi I', 'Komisi II', 'Komisi III', 'Badan Anggaran', 'Badan Kehormatan'];
const DAPIL_OPTIONS = ['Banjarbaru 1', 'Banjarbaru 2', 'Banjarbaru 3', 'Banjarbaru 4'];

const TambahDewanAdmin = ({ activePath, onLogout }) => {
    const navigate = useNavigate();
    const { id } = useParams(); 
    const isEditMode = !!id;

    const fileInputRef = useRef(null);
    const [formData, setFormData] = useState(initialProfileData);
    const [fileName, setFileName] = useState('No file chosen');

    // Efek untuk memuat data jika dalam mode edit
    useEffect(() => {
        if (isEditMode) {
            // Simulasi memuat data dari API berdasarkan ID
            const mockEditData = { 
                ...initialProfileData, 
                namaLengkap: `Anggota ${id} Edit`, 
                nip: '1234567890',
                email: `anggota${id}@dprd.go.id`,
                jabatan: 'Anggota',
                fraksi: 'Fraksi Demokrat',
                akd: 'Komisi II',
                tanggalLahir: '1985-11-20',
                noTelepon: '081122334455',
                alamat: 'Jalan Kenangan Edit No. 5',
                fotoUrl: 'https://placehold.co/120x120?text=EDIT',
            };
            setFormData(mockEditData);
            setFileName('foto-anggota.jpg');
        } else {
            setFormData(initialProfileData);
            setFileName('No file chosen');
        }
    }, [isEditMode, id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, fotoUrl: reader.result }));
            };
            reader.readAsDataURL(file);
            setFileName(file.name);
        } else {
            setFileName('No file chosen');
            setFormData(prev => ({ ...prev, fotoUrl: initialProfileData.fotoUrl }));
        }
    };
    
    const triggerFileSelect = () => {
        fileInputRef.current.click();
    };

    const handleSave = (e) => {
        e.preventDefault();
        // Simulasi validasi
        if (!formData.namaLengkap || !formData.nip || !formData.email) {
            alert('Nama Lengkap, NIP, dan Email harus diisi.');
            return;
        }

        const action = isEditMode ? 'Perubahan Data' : 'Data Anggota';
        alert(`Sedang memproses ${action}: ${formData.namaLengkap}...`);
        
        setTimeout(() => {
            alert(`✅ ${action} berhasil disimpan!`);
            navigate('/data/dewan'); // Kembali ke daftar dewan
        }, 800);
    };

    const handleCancel = () => {
        if (window.confirm('Batalkan dan kembali ke daftar data dewan?')) {
            navigate('/data/dewan');
        }
    };
    
    const handleHomeClick = () => {
        navigate('/dashboard/admin');
    };

    const titleText = isEditMode ? 'Edit Data Anggota Dewan' : 'Tambah Data Anggota Dewan';
    const currentActionText = isEditMode ? 'Simpan Perubahan' : 'Tambah Data';

    return (
        <div className="main-wrapper">
            <SidebarAdmin activePath={activePath} onLogout={onLogout} />

            <main className="content-area">
                <div className="header-admin-profile">
                    <div className="profile-pic-large-admin" onClick={handleHomeClick}>
                        <FaHome className="home-icon" />
                    </div>
                </div>
                
                <div className="breadcrumb">
                    <span className="active-link" onClick={() => navigate('/data/dewan')}>Data Dewan</span> 
                    <span className="separator"> &gt; </span>
                    <span className="current-page">{isEditMode ? 'Edit' : 'Tambah'}</span>
                </div>

                <h1 className="main-title">{titleText}</h1>

                <div className="form-card">
                    <form className="document-form" onSubmit={handleSave}>
                        
                        {/* Kolom 1: Foto Profil */}
                        <div className="form-group span-2 photo-upload-container">
                            <div className="profile-pic-preview">
                                <img src={formData.fotoUrl} alt="Preview" />
                            </div>
                            <div className="file-upload-details">
                                <p className="file-name-display">{fileName}</p>
                                <label className="file-label-button" onClick={triggerFileSelect}>
                                    <FaUpload /> Pilih Foto
                                </label>
                                <input 
                                    type="file" 
                                    ref={fileInputRef} 
                                    onChange={handleFileChange} 
                                    className="file-input"
                                    accept="image/*"
                                />
                            </div>
                        </div>
                        
                        {/* Data Pokok */}
                        <div className="form-group">
                            <label htmlFor="namaLengkap">Nama Lengkap</label>
                            <input type="text" id="namaLengkap" name="namaLengkap" placeholder="Nama Lengkap dengan Gelar" className="text-input" value={formData.namaLengkap} onChange={handleChange} required/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="nip">NIP</label>
                            <input type="text" id="nip" name="nip" placeholder="Nomor Induk Pegawai" className="text-input" value={formData.nip} onChange={handleChange} required/>
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="jabatan">Jabatan</label>
                            <select id="jabatan" name="jabatan" className="select-input" value={formData.jabatan} onChange={handleChange} required>
                                {JABATAN_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                            </select>
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="fraksi">Fraksi</label>
                            <select id="fraksi" name="fraksi" className="select-input" value={formData.fraksi} onChange={handleChange} required>
                                {FRAKSI_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                            </select>
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="akd">Alat Kelengkapan Dewan (AKD)</label>
                            <select id="akd" name="akd" className="select-input" value={formData.akd} onChange={handleChange} required>
                                {AKD_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="dapil">Daerah Pemilihan (Dapil)</label>
                            <select id="dapil" name="dapil" className="select-input" value={formData.dapil} onChange={handleChange} required>
                                {DAPIL_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                            </select>
                        </div>

                        {/* Data Kontak & Pribadi */}
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" placeholder="Email Aktif" className="text-input" value={formData.email} onChange={handleChange} required/>
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="noTelepon">Nomor Telepon</label>
                            <input type="text" id="noTelepon" name="noTelepon" placeholder="Nomor Telepon" className="text-input" value={formData.noTelepon} onChange={handleChange} required/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="tanggalLahir">Tanggal Lahir</label>
                            <div className="input-with-icon">
                                <input type="date" id="tanggalLahir" name="tanggalLahir" className="text-input date-input" value={formData.tanggalLahir} onChange={handleChange}/>
                                <FaCalendarAlt className="calendar-icon" />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="agama">Agama</label>
                            <input type="text" id="agama" name="agama" placeholder="Agama" className="text-input" value={formData.agama} onChange={handleChange}/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="statusKawin">Status Kawin</label>
                            <select id="statusKawin" name="statusKawin" className="select-input" value={formData.statusKawin} onChange={handleChange}>
                                <option value="Kawin">Kawin</option>
                                <option value="Belum Kawin">Belum Kawin</option>
                                <option value="Cerai Hidup">Cerai Hidup</option>
                                <option value="Cerai Mati">Cerai Mati</option>
                            </select>
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="golonganDarah">Golongan Darah</label>
                            <input type="text" id="golonganDarah" name="golonganDarah" placeholder="Golongan Darah" className="text-input" value={formData.golonganDarah} onChange={handleChange}/>
                        </div>
                        
                        <div className="form-group span-2">
                            <label htmlFor="alamat">Alamat Lengkap</label>
                            <input type="text" id="alamat" name="alamat" placeholder="Alamat Sesuai KTP" className="text-input" value={formData.alamat} onChange={handleChange}/>
                        </div>
                        
                        {/* Tombol Aksi */}
                        <div className="action-buttons-footer span-2">
                            <button type="button" className="btn-cancel" onClick={handleCancel}>Batal</button>
                            <button type="submit" className="btn-tambah">{currentActionText}</button>
                        </div>

                    </form>
                </div>
            </main>
        </div>
    );
};

export default TambahDewanAdmin;