// src/components/ViewDokumenAdmin.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// Gunakan style khusus View Dokumen
import '../styles/ViewDokumenAdmin.css'; 
import { FaArrowLeft, FaHome, FaDownload, FaPrint } from 'react-icons/fa';

// Mock Data Detail Dokumen
const mockDocumentData = {
    1: { 
        name: 'Laporan Kinerja Keuangan 2020', 
        date: '24 Juni 2022', 
        type: 'PDF', 
        size: '3.4MB',
        uploader: 'Admin Sistem',
        link: 'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf' // Contoh link PDF eksternal
    },
};

const ViewDokumenAdmin = () => {
    const navigate = useNavigate();
    const { id } = useParams(); 
    
    const [document, setDocument] = useState(null);

    useEffect(() => {
        // Simulasi memuat data dokumen
        if (mockDocumentData[id]) {
            setDocument(mockDocumentData[id]);
        } else {
            alert('Dokumen tidak ditemukan.');
            navigate('/dokumen/admin', { replace: true });
        }
    }, [id, navigate]);

    if (!document) return null; // Loading state

    const handleBack = () => {
        navigate(-1); // Kembali ke halaman sebelumnya (List Dokumen)
    };

    const handleHomeClick = () => {
        navigate('/dashboard/admin');
    };
    
    const handleDownload = () => {
        alert(`⬇️ Mengunduh dokumen: ${document.name}`);
        // Logika nyata: window.location.href = document.link;
    };

    const handlePrint = () => {
        alert(`🖨 Mencetak dokumen: ${document.name}`);
        // Logika nyata: Membuka jendela cetak untuk iframe atau dokumen
    };

    return (
        <>
            <header className="header-bg">
                {/* Asumsi bg-admin.png bisa digunakan untuk header */}
                <img src="../../assets/bg-admin.png" alt="Background Header" /> 
                <button className="back-btn" onClick={handleBack}><FaArrowLeft /></button>
                <div className="home-btn" onClick={handleHomeClick} style={{ cursor: 'pointer' }}>
                    <FaHome style={{ color: '#F8A44D' }}/>
                </div>
            </header>

            <main className="container">
                {/* Bagian kiri: viewer PDF */}
                <section className="viewer">
                    <div className="viewer-toolbar">
                        <p className="viewer-title">📄 Pratinjau Dokumen</p>
                        {/* Halaman dinamis tidak diimplementasikan tanpa PDF reader library */}
                        <p>Pratinjau PDF</p> 
                    </div>

                    {/* iframe menampilkan PDF asli */}
                    <div className="pdf-frame">
                        <iframe src={document.link} frameBorder="0" title="Pratinjau Dokumen PDF"></iframe>
                    </div>
                </section>

                {/* Bagian kanan: info & tindakan */}
                <aside className="info-panel">
                    <div className="info-box">
                        <h3>Informasi Dokumen</h3>
                        <ul>
                            <li>
                                <span className="dot"></span>
                                <div>
                                    <p className="title">{document.name}</p>
                                </div>
                            </li>
                            <li>
                                <span className="dot"></span>
                                <div>
                                    <p className="label">Tanggal Dibuat</p>
                                    <p>{document.date}</p>
                                </div>
                            </li>
                            <li>
                                <span className="dot"></span>
                                <div>
                                    <p className="label">Jenis Dokumen</p>
                                    <p>{document.type} | {document.size}</p>
                                </div>
                            </li>
                            <li>
                                <span className="dot"></span>
                                <div>
                                    <p className="label">Pengunggah</p>
                                    <p>{document.uploader}</p>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="action-box">
                        <h3>Tindakan</h3>
                        <button className="download-btn" onClick={handleDownload}><FaDownload style={{ marginRight: '8px' }}/> Download Dokumen</button>
                        <button className="print-btn" onClick={handlePrint}><FaPrint style={{ marginRight: '8px' }}/> Print Dokumen</button>
                    </div>
                </aside>
            </main>
        </>
    );
};

export default ViewDokumenAdmin;