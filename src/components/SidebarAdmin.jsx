// src/components/SidebarAdmin.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import logoDprd from '../assets/logo-dprd.png'; 
import { FaBars, FaUsers, FaFileInvoice, FaCog, FaSignOutAlt } from 'react-icons/fa';

// Data Menu Admin
const menuItems = [
    { name: 'Dashboard', icon: FaBars, path: '/dashboard/admin' },
    { name: 'Data Dewan', icon: FaUsers, path: '/data/dewan' }, 
    { name: 'Dokumen Dewan', icon: FaFileInvoice, path: '/dokumen/admin' }, 
    { name: 'Pengaturan Akun', icon: FaCog, path: '/pengaturan/admin' }, 
];

const SidebarAdmin = ({ activePath, onLogout }) => {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };
    
    const handleLogout = () => {
        if (window.confirm('Apakah Anda yakin ingin keluar?')) { 
             onLogout(); 
        }
    };

    return (
        <aside className="sidebar">
            <div className="header-logo">
                <img src={logoDprd} alt="DPRD Logo" className="logo-img" />
            </div>
            
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
            <button 
                onClick={handleLogout} 
                className="btn-logout" 
                style={{ position: 'absolute', bottom: '20px', left: '20px', display: 'flex', alignItems: 'center', background: 'none', color: '#A8A8A8', border: 'none', cursor: 'pointer', fontSize: '16px', padding: '0' }}
            >
                <FaSignOutAlt style={{ fontSize: '20px', width: '40px', textAlign: 'center', marginRight: '5px' }} /> Logout
            </button>
        </aside>
    );
};

export default SidebarAdmin;