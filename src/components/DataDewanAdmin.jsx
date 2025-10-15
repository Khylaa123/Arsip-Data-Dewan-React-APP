// src/components/DataDewanAdmin.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarAdmin from './SidebarAdmin'; 
import '../styles/DataDewanAdmin.css'; 
import '../styles/DataDewanModal.css'; 
// Import Icons
import { FaHome, FaSearch, FaSlidersH, FaEye, FaPencilAlt, FaTrashAlt, FaPlusCircle, FaAngleDown, FaAngleLeft, FaAngleRight, FaQuestionCircle, FaCheckCircle, FaInfoCircle } from 'react-icons/fa';

// --- MOCK DATA ---
const initialDewanData = [
    // Data telah diperbaiki dan dibuat lebih deskriptif
    { id: 1, fullName: 'Gusti Rizky Sukma I.', name: 'Dewan 1', jabatan: 'Ketua', akd: 'Komisi I', fraksi: 'Demokrat', dapil: 'Banjarbaru 1' },
    { id: 2, fullName: 'Ahmad Faisal B.', name: 'Dewan 2', jabatan: 'Wakil Ketua I', akd: 'Komisi II', fraksi: 'Golkar', dapil: 'Banjarbaru 2' },
    { id: 3, fullName: 'Siti Nurhayati', name: 'Dewan 3', jabatan: 'Sekretaris', akd: 'Badan Anggaran', fraksi: 'PDI-P', dapil: 'Banjarbaru 3' },
    { id: 4, fullName: 'Muhammad Ilham', name: 'Dewan 4', jabatan: 'Anggota', akd: 'Komisi III', fraksi: 'Gerindra', dapil: 'Banjarbaru 4' },
    { id: 5, fullName: 'Rina Kartika', name: 'Dewan 5', jabatan: 'Anggota', akd: 'Komisi I', fraksi: 'Nasdem', dapil: 'Banjarbaru 1' },
];

// --- KOMPONEN MODAL KUSTOM ---
const CustomModal = ({ isOpen, type, title, message, onConfirm, onCancel, onClose }) => {
    if (!isOpen) return null;
    
    // Konfigurasi Modal berdasarkan tipe
    let modalClass = 'modal-content';
    let icon = <FaInfoCircle />;
    let modalTitle = title;
    let modalMessage = message;
    let confirmButtonText = 'Ya, Hapus';
    let cancelButtonText = 'Batal';
    
    if (type === 'confirm-delete') {
        modalClass += ' delete-verification-modal';
        icon = <FaQuestionCircle />;
        modalTitle = title || 'Verifikasi Hapus';
        modalMessage = message || 'Anda yakin ingin menghapus data ini?';
    } else if (type === 'success' || type === 'info') {
        modalClass += ' success-delete-modal success-add-modal'; 
        if (type === 'success') {
             icon = <FaCheckCircle />;
             modalTitle = title || 'Berhasil!';
             modalMessage = message || 'Aksi berhasil dilakukan.';
        }
        confirmButtonText = 'OK';
    }

    return (
        <div className="modal-overlay" onClick={type === 'info' || type === 'success' ? onClose : undefined}>
            <div className={modalClass} onClick={(e) => e.stopPropagation()}>
                <div className="modal-icon-wrapper">
                    {icon}
                </div>
                <h3 className="modal-title">{modalTitle}</h3>
                <p className="modal-message">{modalMessage}</p>
                
                {type === 'confirm-delete' && (
                    <div className="modal-actions">
                        <button className="btn-cancel" onClick={onCancel}>{cancelButtonText}</button> 
                        <button className="btn-confirm" onClick={onConfirm}>{confirmButtonText}</button>
                    </div>
                )}
                
                {(type === 'success' || type === 'info') && (
                    <button className="btn-confirm" onClick={onClose}>OK</button>
                )}
            </div>
        </div>
    );
};


// --- KOMPONEN UTAMA ---
const DataDewanAdmin = ({ activePath, onLogout }) => {
    const navigate = useNavigate();
    const [dewanList, setDewanList] = useState(initialDewanData);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectAll, setSelectAll] = useState(false);
    
    // State Modal
    const [modal, setModal] = useState({
        isOpen: false,
        type: 'info', // 'info', 'success', 'confirm-delete'
        title: '',
        message: '',
        onConfirm: null,
        onCancel: null
    });

    // --- UTILITY MODAL ---
    const showCustomAlert = (type, title, message) => {
        setModal({
            isOpen: true,
            type: type,
            title: title,
            message: message,
            onConfirm: null, 
            onCancel: null 
        });
    };

    const showCustomConfirm = (anggotaName) => {
        return new Promise((resolve) => {
            setModal({
                isOpen: true,
                type: 'confirm-delete',
                title: 'Verifikasi Hapus',
                message: `Anda akan menghapus data ${anggotaName}. Data ini tidak dapat dikembalikan.`,
                onConfirm: () => {
                    setModal({ ...modal, isOpen: false });
                    resolve(true);
                },
                onCancel: () => {
                    setModal({ ...modal, isOpen: false });
                    resolve(false);
                }
            });
        });
    };

    const closeModal = () => {
        setModal({ ...modal, isOpen: false });
    };


    // --- 1. LOGIKA NAVIGASI ---
    const handleHomeClick = () => {
        showCustomAlert('info', 'Mengarahkan', 'Kembali ke Dashboard Admin...');
        setTimeout(() => {
            navigate('/dashboard/admin');
        }, 500);
    };
    
    const handleTambahDewan = () => {
        showCustomAlert('info', 'Mengarahkan', 'Membuka halaman Tambah Anggota Dewan...');
        setTimeout(() => {
            navigate('/data/dewan/tambah'); 
        }, 500);
    };

    // --- 2. LOGIKA AKSI TABEL (Lihat, Edit, Hapus) ---
    const handleAction = async (action, id, name) => {
        if (action === 'view') {
            showCustomAlert('info', 'Mengarahkan', `Melihat Profil: ${name}`);
            setTimeout(() => {
                navigate(`/data/dewan/${id}`); // Rute View Detail
            }, 500);

        } else if (action === 'edit') {
            showCustomAlert('info', 'Mengarahkan', `Membuka halaman Edit Data: ${name}`);
            setTimeout(() => {
                navigate(`/data/dewan/edit/${id}`); // Rute Edit Data
            }, 500);

        } else if (action === 'delete') {
            const confirmed = await showCustomConfirm(name);
            
            if (confirmed) {
                setDewanList(dewanList.filter(dewan => dewan.id !== id)); 
                showCustomAlert('success', 'Berhasil!', 'Data Dewan berhasil dihapus.');
            }
        }
    };

    // --- 3. LOGIKA PENCARIAN (Simulasi) ---
    const handleSearch = () => {
        const query = searchTerm.toLowerCase();
        if (query) {
             showCustomAlert('info', 'Pencarian', `Mencari anggota dewan dengan kata kunci: "${query}"`);
             const filtered = initialDewanData.filter(dewan => 
                 dewan.fullName.toLowerCase().includes(query) ||
                 dewan.jabatan.toLowerCase().includes(query) ||
                 dewan.fraksi.toLowerCase().includes(query)
             );
             setDewanList(filtered);
        } else {
             setDewanList(initialDewanData);
        }
    };
    
    // --- 4. LOGIKA LAIN ---
    const handleFilterClick = () => {
        alert('Menampilkan opsi filter (Jabatan, Fraksi, Dapil).');
    };
    
    const handleSelectAll = () => {
        setSelectAll(prev => !prev);
        alert(!selectAll ? 'Semua baris dipilih.' : 'Pilihan dibatalkan.');
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
                        <span className="current-page">Data Dewan</span>
                    </div>
                    <button className="btn-tambah-dewan" onClick={handleTambahDewan}>
                        <FaPlusCircle /> Tambah Dewan
                    </button>
                </div>

                <h1 className="main-title">Anggota Dewan</h1>

                <div className="list-card">
                    <div className="search-and-action">
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

                    <div className="data-table-container">
                        <table className="data-table">
                            <thead>
                                <tr className="header-row">
                                    <th className="col-checkbox">
                                         <div 
                                            className={`custom-checkbox white-border ${selectAll ? 'checked' : ''}`}
                                            onClick={handleSelectAll}
                                            style={{ cursor: 'pointer' }}
                                        ></div>
                                    </th>
                                    <th className="col-foto">Anggota</th>
                                    <th className="col-jabatan">Jabatan</th>
                                    <th className="col-akd">AKD</th>
                                    <th className="col-fraksi">Fraksi</th>
                                    <th className="col-dapil">Dapil</th>
                                    <th className="col-aksi">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Mapping Data Anggota Dewan */}
                                {dewanList.map((dewan) => (
                                    <tr key={dewan.id}>
                                        <td className="col-checkbox"><div className={`custom-checkbox ${selectAll ? 'checked' : ''}`}></div></td>
                                        <td className="col-foto">
                                            <div className="anggota-info">
                                                <div className="profile-thumb"></div> {dewan.fullName}
                                            </div>
                                        </td>
                                        <td className="col-jabatan">{dewan.jabatan}</td>
                                        <td className="col-akd">{dewan.akd}</td>
                                        <td className="col-fraksi">{dewan.fraksi}</td>
                                        <td className="col-dapil">{dewan.dapil}</td>
                                        <td className="col-aksi">
                                            <div className="action-buttons">
                                                <button className="action-btn green-border" title="Lihat Detail" onClick={() => handleAction('view', dewan.id, dewan.fullName)}><FaEye /></button>
                                                <button className="action-btn blue-border" title="Edit Data" onClick={() => handleAction('edit', dewan.id, dewan.fullName)}><FaPencilAlt /></button>
                                                <button className="action-btn red-border" title="Hapus Data" onClick={() => handleAction('delete', dewan.id, dewan.fullName)}><FaTrashAlt /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Footer Pagination */}
                    <div className="pagination-footer">
                        <p className="results-info">Showing 1 to {dewanList.length} of {initialDewanData.length} results</p>
                        <div className="pagination-controls">
                            <div className="per-page-selector">
                                <span>Per page</span>
                                <div className="dropdown-box">
                                    <span>5</span>
                                    <FaAngleDown />
                                </div>
                            </div>

                            <div className="page-numbers">
                                <button className="page-arrow" title="Halaman Sebelumnya"><FaAngleLeft /></button>
                                <button className="page-number active-page">1</button>
                                <button className="page-number">2</button>
                                <button className="page-number">3</button>
                                <button className="page-arrow" title="Halaman Berikutnya"><FaAngleRight /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            
            {/* Custom Modal Component */}
            <CustomModal 
                isOpen={modal.isOpen}
                type={modal.type}
                title={modal.title}
                message={modal.message}
                onConfirm={modal.onConfirm}
                onCancel={modal.onCancel}
                onClose={closeModal}
            />

        </div>
    );
};

export default DataDewanAdmin;