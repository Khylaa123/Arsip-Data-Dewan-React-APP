// src/components/DashboardAdmin.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarAdmin from './SidebarAdmin';
import '../styles/DashboardAdmin.css';
// Ikon yang dibutuhkan
import { FaHome, FaUsers, FaFolder, FaFileExport, FaUserPlus, FaFileUpload, FaDatabase, FaEye, FaDownload, FaFilePdf, FaFileWord, FaBars, FaFileInvoice, FaCog } from 'react-icons/fa';

// MOCK DATA (Diambil dari dashboard_admin.html)
const mockData = {
    totalAnggota: 30,
    totalDokumen: 1246,
    dokumenTerbaru: 22,
    aktivitas: [
        { name: 'Laporan Kinerja 2023', anggota: 'Budi Susilo', status: 'Diunggah', date: '11 Agustus 2023', type: 'pdf' },
        { name: 'Laporan Kinerja 2023', anggota: 'Budi Susilo', status: 'Diunggah', date: '11 Agustus 2023', type: 'pdf' },
        { name: 'Laporan Kinerja 2023', anggota: 'Budi Susilo', status: 'Diunggah', date: '11 Agustus 2023', type: 'word' },
        { name: 'Laporan Kinerja 2023', anggota: 'Budi Susilo', status: 'Diunggah', date: '11 Agustus 2023', type: 'pdf' },
        { name: 'Laporan Kinerja 2023', anggota: 'Budi Susilo', status: 'Diunggah', date: '11 Agustus 2023', type: 'pdf' },
        { name: 'Laporan Kinerja 2023', anggota: 'Budi Susilo', status: 'Diunggah', date: '11 Agustus 2023', type: 'pdf' },
        { name: 'Laporan Kinerja 2023', anggota: 'Budi Susilo', status: 'Diunggah', date: '11 Agustus 2023', type: 'pdf' },
        { name: 'Laporan Kinerja 2023', anggota: 'Budi Susilo', status: 'Diunggah', date: '11 Agustus 2023', type: 'pdf' },
    ]
};

// --- UTILITY ---
const getFileIcon = (type) => {
    if (type === 'pdf') return { icon: FaFilePdf, colorClass: 'red-file' };
    if (type === 'word') return { icon: FaFileWord, colorClass: 'blue-file' };
    return { icon: FaFileExport, colorClass: '' }; 
};

// --- KOMPONEN UTAMA ---
const DashboardAdmin = ({ activePath, onLogout }) => {
    const navigate = useNavigate();
    
    // Logika Navigasi Cepat (dari dashboard_admin.js)
    const handleQuickMenuNavigation = (title) => {
        if (title === 'Tambah Anggota') {
            navigate('/data/dewan'); 
        } else if (title === 'Tambah Dokumen') {
            navigate('/dokumen/admin');
        } else if (title === 'Kelola Data') {
            navigate('/data/dewan'); 
        } else {
            alert(`Aksi untuk ${title}`);
        }
    };
    
    // Logika Aksi Tabel (dari dashboard_admin.js)
    const handleTableAction = (action, docName) => {
        if (action === 'view') {
            alert(`Admin melihat dokumen: ${docName}`);
        } else if (action === 'download') {
            alert(`Admin mengunduh dokumen: ${docName}`);
        }
    };
    
    // Logika Home Icon (di kanan atas)
    const handleHomeClick = () => {
        navigate('/dashboard/admin');
    };

    return (
        <div className="main-wrapper">
            <SidebarAdmin activePath={activePath} onLogout={onLogout} />

            <main className="admin-content">
                <div className="header-admin-profile">
                    {/* Ikon Rumah (House Icon) di kanan atas */}
                    <div className="profile-pic-large-admin" onClick={handleHomeClick} style={{ cursor: 'pointer' }}>
                        <FaHome className="home-icon" />
                    </div>
                </div>

                {/* Baris 1: Ringkasan Data */}
                <section className="summary-cards-grid">
                    {/* Card 1: Total Anggota Dewan */}
                    <div className="summary-card card-orange">
                        <div className="card-icon-container">
                            <FaUsers className="card-icon" />
                        </div>
                        <div className="card-text">
                            <p className="card-title-text">Total Anggota Dewan</p>
                            <h2 className="card-value">{mockData.totalAnggota}</h2>
                        </div>
                        <div className="detail-line line-orange"></div>
                    </div>

                    {/* Card 2: Total Dokumen */}
                    <div className="summary-card card-red">
                        <div className="card-icon-container">
                            <FaFolder className="card-icon" />
                        </div>
                        <div className="card-text">
                            <p className="card-title-text">Total Dokumen</p>
                            <h2 className="card-value">{mockData.totalDokumen.toLocaleString('id-ID')}</h2>
                        </div>
                        <div className="detail-line line-red"></div>
                    </div>

                    {/* Card 3: Dokumen Terbaru */}
                    <div className="summary-card card-yellow">
                        <div className="card-icon-container">
                            <FaFileExport className="card-icon" />
                        </div>
                        <div className="card-text">
                            <p className="card-title-text">Dokumen Terbaru</p>
                            <h2 className="card-value">{mockData.dokumenTerbaru}</h2>
                        </div>
                        <div className="detail-line line-yellow"></div>
                    </div>
                </section>
                
                {/* Baris 2: Menu Cepat */}
                <section className="quick-menu">
                    <h3 className="section-title">Menu Cepat</h3>
                    <div className="quick-menu-grid">
                        {/* Menu 1: Tambah Anggota */}
                        <div className="menu-item-card card-border-orange" onClick={() => handleQuickMenuNavigation('Tambah Anggota')}>
                            <div className="menu-icon-circle circle-orange">
                                <FaUserPlus className="menu-icon-primary" />
                            </div>
                            <p className="menu-title-primary">Tambah Anggota</p>
                            <p className="menu-subtitle">Tambah data anggota dewan baru</p>
                        </div>

                        {/* Menu 2: Tambah Dokumen */}
                        <div className="menu-item-card card-border-green" onClick={() => handleQuickMenuNavigation('Tambah Dokumen')}>
                            <div className="menu-icon-circle circle-green">
                                <FaFileUpload className="menu-icon-primary" />
                            </div>
                            <p className="menu-title-primary">Tambah Dokumen</p>
                            <p className="menu-subtitle">Unggah Dokumen Arsip Baru</p>
                        </div>

                        {/* Menu 3: Kelola Data */}
                        <div className="menu-item-card card-border-blue" onClick={() => handleQuickMenuNavigation('Kelola Data')}>
                            <div className="menu-icon-circle circle-blue">
                                <FaDatabase className="menu-icon-primary" />
                            </div>
                            <p className="menu-title-primary">Kelola Data</p>
                            <p className="menu-subtitle">Kelola Seluruh Data Arsip</p>
                        </div>
                    </div>
                </section>

                {/* Baris 3: Aktivitas Terbaru (Tabel) */}
                <section className="activity-section">
                    <h3 className="section-title">Aktivitas Terbaru</h3>
                    <div className="activity-table-container">
                        <table className="activity-table">
                            <thead>
                                <tr className="header-row">
                                    <th className="col-name">Nama Dokumen</th>
                                    <th className="col-anggota">Anggota</th>
                                    <th className="col-status">Status</th>
                                    <th className="col-date">Tanggal</th>
                                    <th className="col-aksi">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Mapping data aktivitas */}
                                {mockData.aktivitas.map((item, index) => {
                                    const { icon: IconComponent, colorClass } = getFileIcon(item.type);
                                    return (
                                        <tr key={index}>
                                            <td className="col-name">
                                                <IconComponent className={`file-icon ${colorClass}`} /> {item.name}
                                            </td>
                                            <td className="col-anggota">{item.anggota}</td>
                                            <td className="col-status"><span className="status-badge green-bg">{item.status}</span></td>
                                            <td className="col-date">{item.date}</td>
                                            <td className="col-aksi">
                                                <button className="action-btn" title="Lihat Dokumen" onClick={() => handleTableAction('view', item.name)}>
                                                    <FaEye />
                                                </button>
                                                <button className="action-btn" title="Unduh Dokumen" onClick={() => handleTableAction('download', item.name)}>
                                                    <FaDownload />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default DashboardAdmin;