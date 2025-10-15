// src/components/SidebarDewan.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import logoDprd from '../assets/logo-dprd.png'; 
import { FaBars, FaUser, FaFileAlt, FaCog, FaSignOutAlt } from 'react-icons/fa';

const menuItems = [
    { name: 'Dashboard', icon: FaBars, path: '/dashboard/dewan' },
    { name: 'Profile Diri', icon: FaUser, path: '/profile/diri' },
    { name: 'Dokumen Saya', icon: FaFileAlt, path: '/dokumen/saya' },
    { name: 'Pengaturan Akun', icon: FaCog, path: '/pengaturan/akun' },
];

const SidebarDewan = ({ activePath, onLogout }) => {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };
    
    const handleLogout = () => {
        if (window.confirm('Apakah Anda yakin ingin keluar?')) { 
             onLogout(); // Memanggil fungsi logout dari AppRouter
        }
    };

    return (
        <aside className="sidebar">
            <div className="header-logo">
                <img src={logoDprd} alt="DPRD Logo" className="logo-img" style={{ width: '200px' }}/>
            </div>
            <div className="profile-summary">
                <div className="profile-pic-small">
                    <img src="https://placehold.co/70x70?text=GRS" alt="Profile" className="profile-img-small" />
                </div>
                <p className="name">Gusti Rizky Sukma Iskandar Putera, S.E.</p>
                <p className="position">Ketua DPRD</p>
            </div>
            <hr className="divider" />
            <nav className="menu">
                {menuItems.map((item) => {
                    const IconComponent = item.icon;
                    const isActive = activePath.startsWith(item.path); 
                    return (
                        <a 
                            key={item.path}
                            href="#" 
                            className={`menu-item ${isActive ? 'active' : ''}`}
                            onClick={() => handleNavigation(item.path)}
                        >
                            <IconComponent style={{ fontSize: '20px', width: '40px', textAlign: 'center', marginRight: '5px' }} /> {item.name}
                        </a>
                    );
                })}
            </nav>
            {/* Tombol Logout */}
            <button 
                onClick={handleLogout} 
                className="btn-logout" 
                style={{ display: 'flex', alignItems: 'center', marginTop: '20px', marginLeft: '50px', background: 'none', color: '#A8A8A8', border: 'none', cursor: 'pointer', fontSize: '16px', padding: '0' }}
            >
                <FaSignOutAlt style={{ fontSize: '20px', width: '40px', textAlign: 'center', marginRight: '5px' }} /> Logout
            </button>
        </aside>
    );
};

export default SidebarDewan;