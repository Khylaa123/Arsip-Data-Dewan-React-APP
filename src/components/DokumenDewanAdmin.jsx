// src/components/DokumenDewanAdmin.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarAdmin from './SidebarAdmin'; 
import '../styles/DokumenDewanAdmin.css'; 
import { FaHome, FaSearch, FaSlidersH, FaPlusCircle, FaDownload, FaPencilAlt, FaTrashAlt, FaFilePdf, FaFileWord, FaFileExcel, FaAngleLeft, FaAngleRight, FaAngleDown, FaFileInvoice } from 'react-icons/fa';

// --- MOCK DATA (Data Dokumen Tabel Admin) ---
const initialDocuments = [
    { id: 1, name: 'Laporan Kinerja 2025', type: 'PDF', uploader: 'Gusti Rizky', status: 'Diunggah', date: '4 Agustus 2025' },
    { id: 2, name: 'Daftar Hadir Rapat Komisi I', type: 'WORD', uploader: 'Siti Nurhayati', status: 'Diunggah', date: '3 Agustus 2025' },
    { id: 3, name: 'Rekapitulasi Anggaran 2026', type: 'EXCEL', uploader: 'Muhammad Ilham', status: 'Diunggah', date: '2 Agustus 2025' },
    { id: 4, name: 'Rancangan Perda Ketenagakerjaan', type: 'PDF', uploader: 'Ahmad Faisal', status: 'Diunggah', date: '1 Agustus 2025' },
    { id: 5, name: 'Notulensi Rapat Paripurna', type: 'PDF', uploader: 'Gusti Rizky', status: 'Diunggah', date: '30 Juli 2025' },
];

// --- UTILITY ---
const getFileIcon = (type) => {
    if (type === 'PDF') return { icon: FaFilePdf, colorClass: 'red-file' };
    if (type === 'WORD') return { icon: FaFileWord, colorClass: 'word-file' };
    if (type === 'EXCEL') return { icon: FaFileExcel, colorClass: 'excel-file' };
    return { icon: FaFileInvoice, colorClass: '' }; 
};

// --- KOMPONEN UTAMA ---
const DokumenDewanAdmin = ({ activePath, onLogout }) => { 
    const navigate = useNavigate();
    const [documents, setDocuments] = useState(initialDocuments);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectAll, setSelectAll] = useState(false);

    // 1. Logika Navigasi
    const handleHomeClick = () => {
        // NAVIGASI KE DASHBOARD SEARCH BARU
        navigate('/data/search');
    };
    
    const handleTambahDokumen = () => {
        // Logika navigasi ke halaman Tambah Dokumen
        alert('Mengarahkan ke halaman Tambah Dokumen...');
        navigate('/dokumen/tambah'); 
    };

    // 2. Logika Pencarian
    const handleSearch = () => {
        const query = searchTerm.toLowerCase();
        if (query) {
             alert(`Mencari dokumen dengan kata kunci: "${query}"`);
             const filtered = initialDocuments.filter(doc => 
                 doc.name.toLowerCase().includes(query) ||
                 doc.uploader.toLowerCase().includes(query)
             );
             setDocuments(filtered);
        } else {
             setDocuments(initialDocuments);
        }
    };
    
    // 3. Logika Filter
    const handleFilterClick = () => {
        alert('Menampilkan opsi filter (Tanggal, Jenis Dokumen, Pengunggah).');
    };

    // 4. Logika Aksi Tabel (Download, Edit, Delete)
    const handleAction = (action, docId, docName) => {
        if (action === 'download') {
            alert(`⬇️ Mengunduh dokumen (ID: ${docId}): ${docName}`);
        } else if (action === 'edit') {
            alert(`✍️ Membuka halaman Edit Dokumen (ID: ${docId}): ${docName}`);
            // Logika navigasi ke halaman edit/tambah dokumen admin
            navigate(`/dokumen/tambah?edit=${docId}`);
        } else if (action === 'delete') {
            if (window.confirm(`❌ Yakin ingin menghapus dokumen: ${docName} (ID: ${docId})?`)) {
                // Hapus dari state
                setDocuments(documents.filter(doc => doc.id !== docId));
                alert(`✅ Dokumen ${docName} berhasil dihapus.`);
            }
        }
    };
    
    // 5. Logika Checkbox Massal
    const handleSelectAll = () => {
        setSelectAll(prev => !prev);
        alert(!selectAll ? 'Semua baris dipilih.' : 'Pilihan dibatalkan.');
    };
    
    // 6. Logika Pagination
    const handlePageClick = (page) => {
        alert(`Memuat halaman ${page} dokumen.`);
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
                
                {/* Top Bar: Breadcrumb & Tombol Tambah */}
                <div className="top-bar">
                    <div className="breadcrumb">
                        <span className="active-link" onClick={() => navigate('/dashboard/admin')} style={{ cursor: 'pointer' }}>Dashboard</span> 
                        <span className="separator"> &gt; </span>
                        <span className="current-page">Dokumen Dewan</span>
                    </div>
                    <button className="btn-tambah-dokumen" onClick={handleTambahDokumen}>
                        <FaPlusCircle /> Tambah Dokumen
                    </button>
                </div>

                <h1 className="main-title">Dokumen Dewan</h1>

                <div className="list-card">
                    {/* Search and Action */}
                    <div className="search-container">
                        <div className="search-box">
                            <FaSearch className="search-icon" onClick={handleSearch} style={{ cursor: 'pointer' }}/>
                            <input 
                                type="text" 
                                placeholder="Cari" 
                                className="search-input"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyPress={(e) => { if (e.key === 'Enter') handleSearch(); }}
                            />
                        </div>
                        <FaSlidersH className="filter-icon" onClick={handleFilterClick} style={{ cursor: 'pointer' }}/>
                    </div>

                    {/* Tabel Dokumen */}
                    <div className="document-table-container">
                        <table className="document-table">
                            <thead>
                                <tr className="header-row">
                                    <th className="col-checkbox">
                                        <div 
                                            className={`custom-checkbox white-border ${selectAll ? 'checked' : ''}`}
                                            onClick={handleSelectAll}
                                            style={{ cursor: 'pointer' }}
                                        ></div>
                                    </th>
                                    <th className="col-name">Nama Dokumen</th>
                                    <th className="col-anggota">Anggota</th> 
                                    <th className="col-status">Status</th>
                                    <th className="col-date">Tanggal</th>
                                    <th className="col-aksi">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {documents.map(doc => {
                                    const { icon: IconComponent, colorClass } = getFileIcon(doc.type);
                                    return (
                                        <tr key={doc.id}>
                                            <td className="col-checkbox"><div className={`custom-checkbox ${selectAll ? 'checked' : ''}`}></div></td>
                                            <td className="col-name"><IconComponent className={`file-icon ${colorClass}`} /> {doc.name}</td>
                                            <td className="col-anggota">{doc.uploader}</td> 
                                            <td className="col-status"><span className="status-badge green-bg">{doc.status}</span></td>
                                            <td className="col-date">{doc.date}</td>
                                            <td className="col-aksi">
                                                <div className="action-buttons">
                                                    <button className="action-btn orange-border" title="Unduh Dokumen" onClick={() => handleAction('download', doc.id, doc.name)}><FaDownload /></button>
                                                    <button className="action-btn blue-border" title="Edit Dokumen" onClick={() => handleAction('edit', doc.id, doc.name)}><FaPencilAlt /></button>
                                                    <button className="action-btn red-border" title="Hapus Dokumen" onClick={() => handleAction('delete', doc.id, doc.name)}><FaTrashAlt /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination/Halaman */}
                    <div className="pagination-footer">
                        <p className="results-info">Showing 1 to {documents.length} of {initialDocuments.length} results</p>
                        <div className="pagination-controls">
                            <div className="per-page-selector">
                                <span>Per page</span>
                                <div className="dropdown-box">
                                    <span>5</span>
                                    <FaAngleDown />
                                </div>
                            </div>

                            <div className="page-numbers">
                                <button className="page-arrow" title="Halaman sebelumnya"><FaAngleLeft /></button>
                                <button className="page-number active-page" onClick={() => handlePageClick(1)}>1</button>
                                <button className="page-number" onClick={() => handlePageClick(2)}>2</button>
                                <button className="page-number" onClick={() => handlePageClick(3)}>3</button>
                                <button className="page-arrow" title="Halaman berikutnya"><FaAngleRight /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DokumenDewanAdmin;