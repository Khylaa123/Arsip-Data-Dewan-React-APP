import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
// GANTI JALUR INI: kembali satu folder ke src, lalu ke styles
import '../styles/DashboardSearch.css'; 
// Koreksi: import logo dari folder assets dan nama file yang benar
import LogoDPRD from '../assets/logo-dprd.png';

const DashboardSearch = () => {
  const navigate = useNavigate();

  const handleAdminAccess = () => {
    // NAVIGASI KEMBALI KE DASHBOARD ADMIN (ganti entry history saat ini)
    navigate('/dashboard/admin', { replace: true });
  };

  return (
    <div className="main-dashboard-container">
      {/* Tombol Grid/Menu di Kanan Atas */}
      <div 
        className="top-right-icon" 
        onClick={handleAdminAccess}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleAdminAccess(); } }}
        role="button"
        tabIndex={0}
        aria-label="Buka Dashboard Admin"
        title="Buka Dashboard Admin"
        style={{ cursor: 'pointer' }}
      >
        <div className="icon-circle">
          <FaBars className="grid-icon-placeholder" style={{ fontSize: '24px', color: '#fff' }} aria-hidden="true" />
        </div>
      </div>

      <div className="content-center">
        {/* Area Logo Besar */}
        <div className="logo-section">
          <div className="logo-outer-ring">
            <div className="logo-inner-circle">
              <img src={LogoDPRD} alt="DPRD Kota Banjarbaru Logo" className="main-logo" />
            </div>
          </div>
        </div>

        {/* Teks Header */}
        <div className="header-text">
          <h1 className="main-title">DASHBOARD ARSIP ANGGOTA DEWAN</h1>
          <p className="subtitle">Cari dan Data Informasi Anggota Dewan</p>
        </div>

        {/* Kolom Pencarian */}
        <div className="search-bar-wrapper">
          <div className="search-input-container">
            <i className="fas fa-search search-icon" aria-hidden="true"></i>
            <input type="text" placeholder="Cari Anggota Dewan..." className="search-input" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSearch;