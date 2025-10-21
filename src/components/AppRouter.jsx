// src/components/AppRouter.jsx
import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// --- Komponen Utama ---
import LoginPage from './LoginPage';
import DashboardDewan from './DashboardDewan'; 
import DashboardAdmin from './DashboardAdmin'; 
import DashboardSearch from './DashboardSearch'; // <<< Pastikan ini di-import

// --- Komponen Dewan ---
import DokumenSayaDewan from './DokumenSayaDewan';
import ProfileDiriDewan from './ProfileDiriDewan'; 
import PengaturanAkunDewan from './PengaturanAkunDewan'; 

// --- Komponen Admin ---
import DataDewanAdmin from './DataDewanAdmin'; 
import TambahDokumenAdmin from './TambahDokumenAdmin'; 
import DokumenDewanAdmin from './DokumenDewanAdmin'; 
import PengaturanAkunAdmin from './PengaturanAkunAdmin'; 
// Komponen Data Dewan (CRUD)
import TambahDewanAdmin from './TambahDewanAdmin'; 
import ViewDewanAdmin from './ViewDewanAdmin'; 
// Komponen View Dokumen
import ViewDokumenAdmin from './ViewDokumenAdmin'; 


const AppRouter = () => {
    const initialRole = localStorage.getItem('user_role') || null;
    const [userRole, setUserRole] = useState(initialRole);

    const handleLogin = (role) => {
        // Simulasi menyimpan role setelah login sukses
        localStorage.setItem('user_role', role);
        setUserRole(role);
    };

    const handleLogout = () => {
        // Membersihkan status login
        localStorage.removeItem('user_role');
        setUserRole(null);
        alert('Anda berhasil keluar.');
        // Pastikan user kembali ke halaman root/login
        window.location.href = '/';
    };
    
    // Fungsi untuk menentukan jalur dashboard berdasarkan role
    const getDashboardPath = (role) => {
        if (role === 'admin') return '/dashboard/admin';
        if (role === 'dewan') return '/dashboard/dewan';
        return '/';
    };

    // --- JIKA SUDAH LOGIN ---
    if (userRole) {
        const dashboardPath = getDashboardPath(userRole);
        return (
            <Routes>
                {/* 1. Jika sudah login, root path dialihkan ke dashboard utama */} 
                <Route path="/" element={<Navigate to={dashboardPath} replace />} /> 
                
                {/* 2. Rute KHUSUS untuk Dashboard Search (terlindungi) */}
                <Route 
                    path="/data/search" 
                    element={<DashboardSearch />} 
                />

                {/* ==================================== */}
                {/* Rute DEWAN dan ADMIN lainnya (tetap sama) */}
                {/* ==================================== */}
                
                <Route 
                    path="/dashboard/dewan" 
                    element={<DashboardDewan onLogout={handleLogout} activePath="/dashboard/dewan" />} 
                />
                
                {/* Menu Samping Dewan (rute lainnya tidak diubah) */}
                <Route 
                    path="/profile/diri" 
                    element={<ProfileDiriDewan onLogout={handleLogout} activePath="/profile/diri" />} 
                />
                <Route 
                    path="/dokumen/saya" 
                    element={<DokumenSayaDewan onLogout={handleLogout} activePath="/dokumen/saya" />} 
                />
                <Route 
                    path="/pengaturan/akun" 
                    element={<PengaturanAkunDewan onLogout={handleLogout} activePath="/pengaturan/akun" />} 
                />
                

                <Route 
                    path="/dashboard/admin" 
                    element={<DashboardAdmin onLogout={handleLogout} activePath="/dashboard/admin" />} 
                />
                
                <Route 
                    path="/data/dewan" 
                    element={<DataDewanAdmin onLogout={handleLogout} activePath="/data/dewan" />} 
                />
                
                <Route 
                    path="/data/dewan/tambah" 
                    element={<TambahDewanAdmin onLogout={handleLogout} activePath="/data/dewan" />} 
                />
                <Route 
                    path="/data/dewan/edit/:id" 
                    element={<TambahDewanAdmin onLogout={handleLogout} activePath="/data/dewan" />} 
                />
                <Route 
                    path="/data/dewan/:id" 
                    element={<ViewDewanAdmin onLogout={handleLogout} activePath="/data/dewan" />} 
                />
                
                <Route 
                    path="/dokumen/admin" 
                    element={<DokumenDewanAdmin onLogout={handleLogout} activePath="/dokumen/admin" />} 
                />

                <Route path="/dokumen/tambah" 
                    element={<TambahDokumenAdmin onLogout={handleLogout} activePath="/dokumen/admin" />} 
                />
                 <Route path="/dokumen/admin/:id" 
                    element={<ViewDokumenAdmin onLogout={handleLogout} activePath="/dokumen/admin" />} 
                />
                
                <Route 
                    path="/pengaturan/admin" 
                    element={<PengaturanAkunAdmin onLogout={handleLogout} activePath="/pengaturan/admin" />} 
                />
                
                <Route path="/data/kelola" 
                    element={<DataDewanAdmin onLogout={handleLogout} activePath="/data/dewan" />} 
                />
                
                {/* Rute yang tidak dikenal dialihkan ke dashboard utama */}
                <Route path="*" element={<Navigate to={dashboardPath} replace />} />
            </Routes>
        );
    }
    
    // --- JIKA BELUM LOGIN ---
    return (
        <Routes>
            {/* INI MENGEMBALIKAN LOGIN PAGE SEBAGAI HALAMAN UTAMA/ROOT */}
            <Route path="/" element={<LoginPage onLogin={handleLogin} />} />
            
            {/* Alihkan semua rute lain ke Login */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

export default AppRouter;