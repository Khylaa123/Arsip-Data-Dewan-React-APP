// src/components/DokumenSayaDewan.jsx
import React, { useState, useCallback } from 'react';
import SidebarDewan from './SidebarDewan'; 
import '../styles/DokumenSayaDewan.css'; 
import { FaSearch, FaSlidersH, FaDownload, FaPencilAlt, FaTrashAlt, FaFilePdf, FaFileWord, FaFileExcel, FaAngleLeft, FaAngleRight, FaAngleDown } from 'react-icons/fa';

// --- MOCK DATA (Data Dokumen Tabel) ---
const initialDocuments = [
    { id: 1, name: 'Laporan Kinerja 2025', type: 'PDF', status: 'Diunggah', date: '4 Agustus 2025' },
    { id: 2, name: 'Daftar Hadir Rapat', type: 'WORD', status: 'Diunggah', date: '4 Agustus 2025' },
    { id: 3, name: 'Rekapitulasi Anggaran', type: 'EXCEL', status: 'Diunggah', date: '4 Agustus 2025' },
    { id: 4, name: 'Rancangan Perda Ketenagakerjaan', type: 'PDF', status: 'Diunggah', date: '4 Agustus 202lahj' },
    { id: 5, name: 'Notulensi Rapat Komisi I', type: 'PDF', status: 'Diunggah', date: '4 Agustus 2025' },
    { id: 6, name: 'Laporan Reses Dapil II', type: 'WORD', status: 'Diunggah', date: '3 Agustus 2025' },
];

// --- UTILITY ---
const getFileIcon = (type) => {
    if (type === 'PDF') return { icon: FaFilePdf, colorClass: 'red-file' };
    if (type === 'WORD') return { icon: FaFileWord, colorClass: 'green-file' };
    if (type === 'EXCEL') return { icon: FaFileExcel, colorClass: 'blue-file' };
    return { icon: FaFileWord, colorClass: '' }; 
};

// --- KOMPONEN UTAMA ---
const DokumenSayaDewan = ({ activePath, onLogout }) => {
    const [documents, setDocuments] = useState(initialDocuments);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectAll, setSelectAll] = useState(false);

    // 1. Logika Pencarian (Replikasi dokumen_saya_dewan.js)
    const handleSearch = (e) => {
        if (e.key === 'Enter' || e.type === 'click') {
            const query = searchTerm.toLowerCase();
            alert(`Mencari dokumen dengan kata kunci: "${query}"`);
            
            // Logika filter (Simulasi)
            const filtered = initialDocuments.filter(doc => 
                doc.name.toLowerCase().includes(query)
            );
            setDocuments(filtered);
        }
    };

    // 2. Logika Tombol Filter
    const handleFilterClick = () => {
        alert('Menampilkan opsi filter (Tanggal, Jenis Dokumen, Status).');
    };

    // 3. Logika Aksi Tabel (Download, Edit, Delete)
    const handleAction = (action, docId, docName) => {
        if (action === 'download') {
            alert(`✅ Mengunduh dokumen (ID: ${docId}): ${docName}`);
        } else if (action === 'edit') {
            alert(`✏️ Membuka form edit untuk dokumen (ID: ${docId}): ${docName}`);
        } else if (action === 'delete') {
            if (window.confirm(`Yakin ingin menghapus dokumen: ${docName} (ID: ${docId})?`)) {
                // Di React, ini akan menghapus dari state
                setDocuments(documents.filter(doc => doc.id !== docId));
                alert(`❌ Dokumen ${docName} berhasil dihapus.`);
            }
        }
    };
    
    // 4. Logika Checkbox Massal (Replikasi dokumen_saya_dewan.js)
    const handleSelectAll = () => {
        setSelectAll(prev => !prev);
        alert(!selectAll ? 'Semua baris dipilih.' : 'Pilihan dibatalkan.');
    };
    
    // 5. Logika Pagination (Simulasi)
    const handlePageClick = (page) => {
        alert(`Memuat halaman ${page} dokumen.`);
        // Di sini Anda akan memperbarui state halaman aktif
    };


    return (
        <div className="main-wrapper">
            <SidebarDewan activePath={activePath} onLogout={onLogout} />

            <main className="document-content">
                <div className="document-section">
                    
                    {/* Baris Pencarian */}
                    <div className="search-container">
                        <div className="search-box">
                            <FaSearch className="search-icon" onClick={handleSearch} style={{ cursor: 'pointer' }} />
                            <input 
                                type="text" 
                                placeholder="Cari" 
                                className="search-input"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyPress={(e) => { if (e.key === 'Enter') handleSearch(e); }}
                            />
                        </div>
                        {/* Ikon Filter */}
                        <FaSlidersH className="filter-icon" onClick={handleFilterClick} style={{ cursor: 'pointer' }} />
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
                                            <td className="col-name"><IconComponent className={`doc-icon ${colorClass}`} /> {doc.name}</td>
                                            <td className="col-status"><span className="status-badge green">{doc.status}</span></td>
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

export default DokumenSayaDewan; 