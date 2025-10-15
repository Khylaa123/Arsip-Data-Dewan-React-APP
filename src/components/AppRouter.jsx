// src/components/AppRouter.jsx
import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// --- Komponen Utama ---
import LoginPage from './LoginPage';
import DashboardDewan from './DashboardDewan'; 
import DashboardAdmin from './DashboardAdmin'; 

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
    // Memuat role dari Local Storage untuk menjaga status login
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
                {/* Rute Default/Login dialihkan ke Dashboard jika sudah login */}
                <Route path="/" element={<Navigate to={dashboardPath} replace />} />

                {/* ==================================== */}
                {/* Rute untuk DEWAN (Role: 'dewan') */}
                {/* ==================================== */}
                
                <Route 
                    path="/dashboard/dewan" 
                    element={<DashboardDewan onLogout={handleLogout} activePath="/dashboard/dewan" />} 
                />
                
                {/* Menu Samping Dewan */}
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
                

                {/* ==================================== */}
                {/* Rute untuk ADMIN (Role: 'admin') */}
                {/* ==================================== */}
                
                {/* Dashboard Utama Admin */}
                <Route 
                    path="/dashboard/admin" 
                    element={<DashboardAdmin onLogout={handleLogout} activePath="/dashboard/admin" />} 
                />
                
                {/* Menu Samping Admin: Data Dewan (List) */}
                <Route 
                    path="/data/dewan" 
                    element={<DataDewanAdmin onLogout={handleLogout} activePath="/data/dewan" />} 
                />
                
                {/* RUTE Data Dewan (CRUD) */}
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
                
                {/* Menu Samping Admin: Dokumen Dewan */}
                <Route 
                    path="/dokumen/admin" 
                    element={<DokumenDewanAdmin onLogout={handleLogout} activePath="/dokumen/admin" />} 
                />

                {/* RUTE Dokumen Dewan (Tambah/View) */}
                <Route path="/dokumen/tambah" 
                    element={<TambahDokumenAdmin onLogout={handleLogout} activePath="/dokumen/admin" />} 
                />
                 <Route path="/dokumen/admin/:id" 
                    element={<ViewDokumenAdmin onLogout={handleLogout} activePath="/dokumen/admin" />} 
                />
                
                {/* Menu Samping Admin: Pengaturan Akun */}
                <Route 
                    path="/pengaturan/admin" 
                    element={<PengaturanAkunAdmin onLogout={handleLogout} activePath="/pengaturan/admin" />} 
                />
                
                {/* Rute Menu Cepat Admin (Alias) */}
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
            {/* Hanya izinkan akses ke Login */}
            <Route path="/" element={<LoginPage onLogin={handleLogin} />} />
            
            {/* Alihkan semua rute lain ke Login */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

export default AppRouter;