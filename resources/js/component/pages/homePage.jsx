import React from "react";
import { styles } from "./stylesHomepage";

function HomePage() {
    return (
        <div style={styles.body}>
            {/* Navigation Header */}
            <nav style={styles.navbar}>
                <div style={styles.navContainer}>
                    <a href="#" style={styles.navLogo}>
                        TLX
                    </a>

                    <div style={styles.navCenter}>
                        <span style={{ color: "#666", fontSize: "14px" }}>
                            🚚 Jasa Pengiriman Internasional Terpercaya
                        </span>
                    </div>

                    <div style={styles.navRight}>
                        <a
                            href="/lacak"
                            style={{
                                ...styles.navButton,
                                ...styles.trackButton,
                            }}
                        >
                            📦 Lacak Paket
                        </a>
                        <a
                            href="/login"
                            style={{
                                ...styles.navButton,
                                ...styles.loginButton,
                            }}
                        >
                            👤 Login
                        </a>
                    </div>
                </div>
            </nav>

            <div style={styles.container}>
                <header style={styles.header}>
                    <div style={styles.headerContent}>
                        <div style={styles.logo}>TLX</div>
                        <div style={styles.tagline}>Total Logistic Express</div>
                        <div style={styles.companyName}>
                            PT. Dokumen Paket Ekspres (DPEK)
                        </div>
                    </div>
                </header>

                <main style={styles.content}>
                    <div style={styles.highlightBox}>
                        <h2>
                            Jasa Pengiriman Barang Internasional Via Udara (Door
                            to Door) yang Handal dan Terpercaya
                        </h2>
                        <p>
                            Melayani pengiriman ke seluruh dunia dengan jaminan
                            keamanan dan kecepatan
                        </p>
                    </div>

                    <section style={styles.section}>
                        <h2 style={styles.sectionTitle}>Tentang Perusahaan</h2>
                        <p>
                            PT. Dokumen Paket Ekspres (DPEK) yang beroperasi
                            dengan brand TLX (Total Logistic Express) adalah
                            perusahaan jasa pengiriman barang dan dokumen ke
                            luar negeri yang telah beroperasi sejak awal tahun
                            2000-an. Kami memiliki izin resmi dari KOMINFO
                            sebagai perusahaan penyelenggara pos dan menjadi
                            anggota aktif ASPERINDO (Asosiasi Perusahaan Jasa
                            Pengiriman Ekspres Pos dan Logistik Indonesia).
                        </p>

                        <div style={styles.stats}>
                            <div style={styles.stat}>
                                <span style={styles.statNumber}>20+</span>
                                <div style={styles.statLabel}>
                                    Tahun Pengalaman
                                </div>
                            </div>
                            <div style={styles.stat}>
                                <span style={styles.statNumber}>10K+</span>
                                <div style={styles.statLabel}>
                                    Paket per Bulan
                                </div>
                            </div>
                            <div style={styles.stat}>
                                <span style={styles.statNumber}>100%</span>
                                <div style={styles.statLabel}>Terpercaya</div>
                            </div>
                        </div>
                    </section>

                    <section style={styles.section}>
                        <h2 style={styles.sectionTitle}>Layanan Kami</h2>
                        <div style={styles.servicesGrid}>
                            <div style={styles.serviceItem}>
                                <div style={styles.serviceIcon}>📦</div>
                                <div style={styles.cardTitle}>
                                    Pengiriman Barang
                                </div>
                                <p>
                                    Layanan pengiriman barang internasional
                                    dengan sistem door-to-door ke seluruh dunia
                                </p>
                            </div>
                            <div style={styles.serviceItem}>
                                <div style={styles.serviceIcon}>📄</div>
                                <div style={styles.cardTitle}>
                                    Pengiriman Dokumen
                                </div>
                                <p>
                                    Pengiriman dokumen penting dengan jaminan
                                    keamanan dan kecepatan tinggi
                                </p>
                            </div>
                            <div style={styles.serviceItem}>
                                <div style={styles.serviceIcon}>📍</div>
                                <div style={styles.cardTitle}>
                                    Tracking System
                                </div>
                                <p>
                                    Sistem pelacakan real-time untuk memantau
                                    status pengiriman paket Anda
                                </p>
                            </div>
                            <div style={styles.serviceItem}>
                                <div style={styles.serviceIcon}>🛡️</div>
                                <div style={styles.cardTitle}>
                                    Asuransi Paket
                                </div>
                                <p>
                                    Garansi keamanan dengan pertanggungan hingga
                                    Rp 1.000.000 per paket
                                </p>
                            </div>
                        </div>
                    </section>

                    <section style={styles.section}>
                        <h2 style={styles.sectionTitle}>Keunggulan TLX</h2>
                        <div style={styles.grid}>
                            <div style={styles.card}>
                                <div style={styles.cardTitle}>
                                    ✅ Resmi & Terpercaya
                                </div>
                                <p>
                                    Terdaftar resmi di KOMINFO sebagai
                                    perusahaan kurir dan anggota aktif ASPERINDO
                                    Jawa Barat
                                </p>
                            </div>
                            <div style={styles.card}>
                                <div style={styles.cardTitle}>
                                    🌍 Jangkauan Global
                                </div>
                                <p>
                                    Melayani pengiriman ke berbagai negara di
                                    setiap benua dengan jaringan mitra
                                    internasional yang luas
                                </p>
                            </div>
                            <div style={styles.card}>
                                <div style={styles.cardTitle}>
                                    ⚡ Pengalaman Panjang
                                </div>
                                <p>
                                    Lebih dari 20 tahun pengalaman dalam bisnis
                                    pengiriman internasional
                                </p>
                            </div>
                            <div style={styles.card}>
                                <div style={styles.cardTitle}>
                                    💬 Komunikasi Efektif
                                </div>
                                <p>
                                    Tim yang mampu berkomunikasi dengan mitra
                                    luar negeri untuk kemudahan pelacakan
                                </p>
                            </div>
                            <div style={styles.card}>
                                <div style={styles.cardTitle}>
                                    📈 Volume Tinggi
                                </div>
                                <p>
                                    Melayani puluhan ribu kilogram barang
                                    kiriman setiap bulannya
                                </p>
                            </div>
                            <div style={styles.card}>
                                <div style={styles.cardTitle}>
                                    🎯 Solusi Personal
                                </div>
                                <p>
                                    Memberikan solusi pengiriman yang
                                    disesuaikan dengan kebutuhan individual
                                </p>
                            </div>
                        </div>
                    </section>

                    <section style={styles.section}>
                        <h2 style={styles.sectionTitle}>Komitmen Kualitas</h2>
                        <div style={styles.grid}>
                            <div style={styles.card}>
                                <div style={styles.cardTitle}>
                                    🔒 Keamanan Penerbangan
                                </div>
                                <p>
                                    Mematuhi seluruh standar keamanan
                                    penerbangan internasional untuk setiap
                                    pengiriman
                                </p>
                            </div>
                            <div style={styles.card}>
                                <div style={styles.cardTitle}>
                                    📋 Compliance Export
                                </div>
                                <p>
                                    Memahami dan mematuhi batasan-batasan ekspor
                                    sesuai regulasi internasional
                                </p>
                            </div>
                            <div style={styles.card}>
                                <div style={styles.cardTitle}>
                                    🌐 Standar Internasional
                                </div>
                                <p>
                                    Mengikuti ketentuan pengiriman internasional
                                    yang berlaku di setiap negara tujuan
                                </p>
                            </div>
                        </div>
                    </section>

                    <div style={styles.contactInfo}>
                        <h2
                            style={{
                                textAlign: "center",
                                marginBottom: "30px",
                            }}
                        >
                            Hubungi Kami
                        </h2>
                        <div style={styles.contactGrid}>
                            <div style={styles.contactItem}>
                                <div style={styles.contactIcon}>🌐</div>
                                <h3>Website</h3>
                                <p>www.tlx.co.id</p>
                            </div>
                            <div style={styles.contactItem}>
                                <div style={styles.contactIcon}>📞</div>
                                <h3>Customer Service</h3>
                                <p>
                                    Hubungi admin marketing kami untuk
                                    konsultasi pengiriman
                                </p>
                            </div>
                            <div style={styles.contactItem}>
                                <div style={styles.contactIcon}>📍</div>
                                <h3>Lokasi</h3>
                                <p>Bandung, Jawa Barat, Indonesia</p>
                            </div>
                        </div>
                    </div>
                </main>

                <footer style={styles.footer}>
                    <p>
                        &copy; 2024 TLX (Total Logistic Express) - PT. Dokumen
                        Paket Ekspres. Semua hak dilindungi.
                    </p>
                    <p>Anggota resmi ASPERINDO & Terdaftar di KOMINFO</p>
                </footer>
            </div>
        </div>
    );
}

export default HomePage;
