// src/components/DashboardDewan.jsx
import React, { useState, useCallback } from 'react';
// HANYA IMPORT SidebarDewan dari file terpisah
import SidebarDewan from './SidebarDewan'; 
import '../styles/DashboardDewan.css'; 
// Impor Ikon
import { FaAngleLeft, FaAngleRight, FaDownload, FaEye, FaTrashAlt, FaCopy, FaFileInvoice, FaBell, FaCircle, FaFilePdf, FaFileWord, FaFileExcel, FaAngleRight as FaArrowRight, FaUpload, FaUserCheck } from 'react-icons/fa';

// --- MOCK DATA & UTILITY (Dipindahkan ke luar komponen utama) ---
const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
const mockToday = new Date(); 
const FIXED_HOLIDAYS = [
    { month: 0, day: 1, name: 'Tahun Baru Masehi (Libur Nasional)' },
    { month: 4, day: 1, name: 'Hari Buruh Internasional (Libur Nasional)' },
    { month: 5, day: 1, name: 'Hari Lahir Pancasila (Libur Nasional)' },
    { month: 7, day: 17, name: 'Hari Kemerdekaan RI (Libur Nasional)' },
    { month: 9, day: 28, name: 'Hari Sumpah Pemuda (Hari Penting)' },
    { month: 11, day: 25, name: 'Hari Raya Natal (Libur Nasional)' },
];
const mockApiData = {
    totalDocuments: 154,
    recentDocuments: [
        { id: 101, name: 'Laporan Reses Dapil I', type: 'PDF', status: 'Diunggah', date: '10 Oktober 2025' },
        { id: 102, name: 'Daftar Hadir Rapat AKD Komisi III', type: 'WORD', status: 'Diunggah', date: '08 Oktober 2025' },
        { id: 103, name: 'Rekapitulasi Suara 2024', type: 'EXCEL', status: 'Diunggah', date: '05 Oktober 2025' },
        { id: 104, name: 'Rancangan Perda Ketenagakerjaan', type: 'PDF', status: 'Diunggah', date: '01 Oktober 2025' },
        { id: 105, name: 'Laporan Kinerja Bulanan September', type: 'PDF', status: 'Diunggah', date: '28 September 2025' },
    ],
    historyList: [
        { name: 'Rancangan Perda Ketenagakerjaan', fileType: 'PDF', iconClass: 'text-pdf' },
        { name: 'Data Keuangan 2025 Q3', fileType: 'WORD', iconClass: 'text-word' },
        { name: 'Jadwal Reses 2025', fileType: 'EXCEL', iconClass: 'text-excel' },
    ],
    reminders: [
        { text: 'Rapat Paripurna Komisi II | 10.00 - 12.00 |', detail: 'Rapat Paripurna terkait Anggaran 2026' },
        { text: 'Temu Konstituen Dapil I | 14.00 - 16.00 |', detail: 'Kunjungan rutin ke wilayah Dapil I' }
    ],
    internalEvents: [
        { year: 2025, month: 9, day: 2, class: 'event-green', name: 'Rapat Persiapan Anggaran (Internal)' }, 
        { year: 2025, month: 9, day: 15, class: 'event-green', name: 'Rapat Paripurna Lanjutan' }, 
        { year: 2025, month: 9, day: 20, class: 'event-green', name: 'Sidang Paripurna (Agenda Utama)' },
        { year: 2025, month: 10, day: 25, class: 'event-green', name: 'Kunjungan Kerja Komisi III' },
        { year: 2025, month: 11, day: 31, class: 'event-green', name: 'Rapat Evaluasi Akhir Tahun' },
    ],
    activities: [
        { text: 'Anda Mengunggah dokumen Rancangan Anggaran 2024', date: '1 Januari 2025', iconClass: 'red-icon', icon: FaUpload },
        { text: 'Profile Anda Telah Diperbarui', date: '1 September 2025', iconClass: 'green-icon', icon: FaUserCheck },
    ]
};
const generateFixedHolidays = (year) => {
    return FIXED_HOLIDAYS.map(holiday => ({
        year: year,
        month: holiday.month,
        day: holiday.day,
        class: 'event-red', 
        name: holiday.name
    }));
};
const getAllCalendarEvents = (currentYear, internalEvents) => {
    const fixedHolidays = generateFixedHolidays(currentYear);
    const currentInternalEvents = internalEvents.filter(e => e.year === currentYear);
    return [...fixedHolidays, ...currentInternalEvents];
};
const getFileIcon = (type) => {
    if (type === 'PDF') return { icon: FaFilePdf, colorClass: 'red-file' };
    if (type === 'WORD') return { icon: FaFileWord, colorClass: 'word-file' };
    if (type === 'EXCEL') return { icon: FaFileExcel, colorClass: 'excel-file' };
    return { icon: FaFileInvoice, colorClass: '' }; 
};
const handleAction = (action, docId, docName) => {
    if (action === 'download') {
        alert(`✅ Mengunduh dokumen (ID: ${docId}): ${docName}`);
    } else if (action === 'view') {
        alert(`👀 Melihat dokumen (ID: ${docId}): ${docName}`);
    } else if (action === 'delete') {
        if (window.confirm(`Yakin ingin menghapus dokumen: ${docName} (ID: ${docId})?`)) {
            alert(`❌ Dokumen ${docName} berhasil dihapus.`);
        }
    }
};

// --- KOMPONEN KALENDER (Diambil dari DashboardDewan.jsx lama) ---
const Calendar = ({ currentDate, setCurrentDate, allEvents }) => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const eventsThisYear = allEvents.filter(e => e.year === year);
    
    const getEventDetails = (dayNum) => {
        const event = eventsThisYear.find(e => 
            e.month === month && e.day === dayNum
        );
        return event;
    };
    
    const renderDays = useCallback(() => {
        const days = [];
        const date = new Date(year, month, 1);
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDayIndex = date.getDay(); 
        const daysInPrevMonth = new Date(year, month, 0).getDate();
        
        for (let i = firstDayIndex; i > 0; i--) {
            const dayNum = daysInPrevMonth - i + 1;
            days.push(<div key={`prev-${dayNum}`} className="day inactive">{dayNum}</div>);
        }

        for (let i = 1; i <= daysInMonth; i++) {
            let className = 'day active-month';
            let title = '';

            if (i === mockToday.getDate() && month === mockToday.getMonth() && year === mockToday.getFullYear()) {
                className += ' active-day-today';
            }

            const event = getEventDetails(i);
            if (event) {
                className += ` ${event.class}`;
                title = event.name;
            }

            days.push(<div key={`curr-${i}`} className={className} title={title}>{i}</div>);
        }
        
        let nextDay = 1;
        const totalDaysRendered = days.length;
        const remainingCells = 42 - totalDaysRendered; 

        for (let i = 0; i < remainingCells && days.length < 42; i++) {
            days.push(<div key={`next-${nextDay}`} className="day inactive">{nextDay}</div>);
            nextDay++;
        }

        return days;
    }, [year, month, eventsThisYear]);
    
    const monthlyEvents = eventsThisYear
        .filter(e => e.month === month)
        .sort((a, b) => a.day - b.day);
    
    const handlePrev = () => {
        setCurrentDate(new Date(year, month - 1, 1));
    };
    const handleNext = () => {
        setCurrentDate(new Date(year, month + 1, 1));
    };

    return (
        <div className="card-calendar">
            <h3 className="card-title-orange">Kalendar Kegiatan</h3>
            <div className="calendar-header">
                <FaAngleLeft className="arrow-icon" id="prevMonthArrow" onClick={handlePrev} /> 
                <div className="calendar-month">{monthNames[month]} {year}</div>
                <FaAngleRight className="arrow-icon" id="nextMonthArrow" onClick={handleNext} />
            </div>
            <div className="calendar-grid">
                <div className="day-name header-text-orange">Min</div>
                <div className="day-name header-text-orange">Sen</div>
                <div className="day-name header-text-orange">Sel</div>
                <div className="day-name header-text-orange">Rab</div>
                <div className="day-name header-text-orange">Kam</div>
                <div className="day-name header-text-orange">Jum</div>
                <div className="day-name header-text-orange">Sab</div>
                {renderDays()}
            </div>
             <div className="calendar-legend">
                <p className="legend-item red-text"><FaCircle className="red-dot" /> Libur Nasional/Hari Penting</p>
                <p className="legend-item green-text"><FaCircle className="green-dot" /> Rapat Dewan/Acara Internal</p>
            </div>
            
            <div className="monthly-event-list">
                <h4>Daftar Agenda Bulan Ini:</h4>
                <ul id="eventListContainer">
                    {monthlyEvents.length === 0 ? (
                        <li>Tidak ada agenda terjadwal di bulan ini.</li>
                    ) : (
                        monthlyEvents.map((event, index) => (
                            <li key={index}>
                                <span className={`event-dot ${event.class === 'event-red' ? 'red-text' : 'green-text'}`}><FaCircle /></span>
                                <span className="event-day-number">{event.day < 10 ? '0' + event.day : event.day}.</span>
                                {event.name}
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </div>
    );
};


// --- KOMPONEN UTAMA DASHBOARD ---
const DashboardDewan = ({ activePath, onLogout }) => {
    const [currentDate, setCurrentDate] = useState(new Date(mockToday.getFullYear(), mockToday.getMonth(), 1)); 

    const data = mockApiData;
    const currentYear = currentDate.getFullYear();
    const allEvents = getAllCalendarEvents(currentYear, data.internalEvents);


    return (
        <div className="main-wrapper">
            <SidebarDewan activePath={activePath} onLogout={onLogout} />

            <main className="dashboard-content">

                {/* Baris 1: Info Cards */}
                <section className="info-cards-grid">
                    <div className="info-card card-blue">
                        <div className="card-left">
                            <p className="card-title">Total Dokumen</p>
                            <h2 className="card-value">{data.totalDocuments.toLocaleString('id-ID')}</h2>
                            <div className="card-details-wrapper">
                                <span className="detail-blue-bg">
                                    <span className="detail-number">104</span>
                                </span>
                                <span className="comparison-text">Dibandingkan <span className="white-highlight">1</span> hari Lalu</span>
                            </div>
                        </div>
                        <div className="card-icon-container">
                            <FaCopy className="card-icon" />
                        </div>
                        <div className="detail-bar blue-bar"></div>
                    </div>

                    <div className="info-card card-pink">
                        <div className="card-left">
                            <p className="card-title">Histori Dokumen</p>
                            <ul className="history-list">
                                {data.historyList.map((item, index) => (
                                    <li key={index}>
                                        <FaCircle className="list-dot white-dot" /> {item.name} - <span className={item.iconClass}>{item.fileType}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="card-icon-container">
                            <FaFileInvoice className="card-icon" />
                        </div>
                        <div className="detail-bar pink-bar"></div>
                    </div>

                    <div className="info-card card-orange">
                        <div className="card-left">
                            <p className="card-title">Pengingat</p>
                            <ul className="reminder-list">
                                {data.reminders.map((item, index) => (
                                    <li key={index} title={item.detail} onClick={() => alert(`Detail: ${item.detail}`)}>
                                        <FaCircle className="list-dot white-dot" /> {item.text}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="card-icon-container">
                            <FaBell className="card-icon" />
                        </div>
                        <div className="detail-bar orange-bar"></div>
                    </div>
                </section>

                {/* Baris 2: Dokumen Terbaru (Table) */}
                <section className="document-section">
                    <div className="section-header">
                        <h3 className="section-title">Dokumen Terbaru</h3>
                        <a href="#" className="view-all">Lihat Semua <FaArrowRight /></a>
                    </div>

                    <div className="document-table-container">
                        <table className="document-table">
                            <thead>
                                <tr className="header-row">
                                    <th className="col-checkbox"><div className="custom-checkbox white-border"></div></th>
                                    <th className="col-name">Nama Dokumen</th>
                                    <th className="col-status">Status</th>
                                    <th className="col-date">Tanggal</th>
                                    <th className="col-aksi">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.recentDocuments.map(doc => {
                                    const { icon: IconComponent, colorClass } = getFileIcon(doc.type);
                                    return (
                                        <tr key={doc.id}>
                                            <td className="col-checkbox"><div className="custom-checkbox"></div></td>
                                            <td className="col-name"><IconComponent className={`doc-icon ${colorClass}`} /> {doc.name}</td>
                                            <td className="col-status"><span className="status-badge green">{doc.status}</span></td>
                                            <td className="col-date">{doc.date}</td>
                                            <td className="col-aksi">
                                                <div className="action-buttons">
                                                    <button className="action-btn orange-border" onClick={() => handleAction('download', doc.id, doc.name)}><FaDownload /></button>
                                                    <button className="action-btn blue-border" onClick={() => handleAction('view', doc.id, doc.name)}><FaEye /></button>
                                                    <button className="action-btn red-border" onClick={() => handleAction('delete', doc.id, doc.name)}><FaTrashAlt /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </section>
                
                {/* Baris 3: Aktivitas & Kalender */}
                <section className="bottom-grid">
                    {/* Card 4: Aktivitas Terbaru */}
                    <div className="card-activities">
                        <h3 className="card-title-orange">Aktivitas Terbaru</h3>
                        <div className="activity-list">
                            {data.activities.map((item, index) => {
                                const IconComponent = item.icon;
                                return (
                                    <div key={index} className="activity-item">
                                        <div className={`activity-icon ${item.iconClass}`}>
                                            <IconComponent />
                                        </div>
                                        <div className="activity-text">
                                            {item.text}
                                            <span className="activity-date">- {item.date} -</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Card 5: Kalendar Kegiatan */}
                    <Calendar 
                        currentDate={currentDate} 
                        setCurrentDate={setCurrentDate} 
                        allEvents={allEvents} 
                    />
                </section>
            </main>
        </div>
    );
};

export default DashboardDewan;