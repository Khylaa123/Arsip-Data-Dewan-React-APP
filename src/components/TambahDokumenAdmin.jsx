// src/components/TambahDokumenAdmin.jsx
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarAdmin from './SidebarAdmin'; 
// PASTIKAN STYLE INI ADA DI src/styles/
import '../styles/TambahDokumenAdmin.css'; 
// Import Icons
import { FaHome, FaCalendarAlt, FaUpload } from 'react-icons/fa';

const TambahDokumenAdmin = ({ activePath, onLogout }) => {
    const navigate = useNavigate();
    
    // State untuk form
    const [namaDokumen, setNamaDokumen] = useState('');
    const [tanggal, setTanggal] = useState('');
    const [file, setFile] = useState(null);
    const [fileNameDisplay, setFileNameDisplay] = useState('No file chosen');

    const fileInputRef = useRef(null);

    // 1. Logika Tampilkan Nama File
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        if (selectedFile) {
            setFileNameDisplay(selectedFile.name);
        } else {
            setFileNameDisplay('No file chosen');
        }
    };

    // Memicu klik pada input file tersembunyi
    const triggerFileSelect = () => {
        fileInputRef.current.click();
    };

    // 2. Logika Tombol Tambah
    const handleTambah = (e) => {
        e.preventDefault();
        
        if (!namaDokumen.trim() || !tanggal.trim() || !file) {
            alert('Semua field harus diisi (Nama Dokumen, Tanggal, Dokumen File).');
            return;
        }

        alert(`✅ Dokumen "${namaDokumen.trim()}" berhasil diunggah!`);
        
        // Reset form
        setNamaDokumen('');
        setTanggal('');
        setFile(null);
        setFileNameDisplay('No file chosen');
        
        // Arahkan ke halaman dokumen dewan setelah upload sukses
        setTimeout(() => {
            navigate('/dokumen/admin'); 
        }, 500);
    };

    // 3. Logika Tombol Batal
    const handleCancel = () => {
        if (window.confirm('Batalkan penambahan dokumen?')) {
            navigate('/dokumen/admin'); 
        }
    };
    
    // 4. Logika Ikon Rumah
    const handleHomeClick = () => {
        navigate('/dashboard/admin');
    };
    
    // 5. Logika Ikon Kalender
    const handleCalendarClick = () => {
        alert('Memunculkan Date Picker...');
    };


    return (
        <div className="main-wrapper">
            <SidebarAdmin activePath={activePath} onLogout={onLogout} />

            <main className="content-area">
                <div className="header-admin-profile">
                    <div className="profile-pic-large-admin" onClick={handleHomeClick} style={{ cursor: 'pointer' }}>
                        <FaHome className="home-icon" />
                    </div>
                </div>
                
                {/* Breadcrumb */}
                <div className="breadcrumb">
                    <span className="active-link" onClick={() => navigate('/dokumen/admin')} style={{ cursor: 'pointer' }}>Dokumen Dewan</span> 
                    <span className="separator"> &gt; </span>
                    <span className="current-page">Tambah</span>
                </div>

                <h1 className="main-title">Tambah Dokumen Dewan</h1>

                <div className="form-card">
                    {/* Menggunakan form kelas document-form */}
                    <form className="document-form" onSubmit={handleTambah}>
                        
                        <div className="form-group">
                            <label htmlFor="nama-dokumen">Nama Dokumen</label>
                            <input 
                                type="text" 
                                id="nama-dokumen" 
                                placeholder="Masukkan Nama Dokumen" 
                                className="text-input" 
                                value={namaDokumen}
                                onChange={(e) => setNamaDokumen(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="tanggal">Tanggal</label>
                            <div className="input-with-icon">
                                <input 
                                    type="date" // Menggunakan type="date"
                                    id="tanggal" 
                                    placeholder="mm/dd/yyyy" 
                                    className="text-input date-input"
                                    value={tanggal}
                                    onChange={(e) => setTanggal(e.target.value)}
                                    required
                                />
                                <FaCalendarAlt className="calendar-icon" onClick={handleCalendarClick} />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="dokumen-file">Dokumen</label>
                            <div className="file-input-container">
                                <label 
                                    htmlFor="dokumen-file" 
                                    className="file-label-button"
                                    onClick={triggerFileSelect}
                                >
                                    <FaUpload style={{ marginRight: '5px' }} /> Choose File
                                </label>
                                <input 
                                    type="file" 
                                    ref={fileInputRef} 
                                    onChange={handleFileChange} 
                                    className="file-input"
                                    id="dokumen-file" 
                                    required
                                />
                                <span className="file-name-display">{fileNameDisplay}</span>
                            </div>
                        </div>

                        {/* Tombol Aksi */}
                        <div className="action-buttons-footer">
                            <button type="button" className="btn-cancel" onClick={handleCancel}>Batal</button>
                            <button type="submit" className="btn-tambah">Tambah</button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default TambahDokumenAdmin;