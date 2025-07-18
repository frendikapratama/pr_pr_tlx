export const styles = {
    body: {
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        lineHeight: 1.6,
        color: "#333",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        minHeight: "100vh",
        margin: 0,
        padding: 0,
    },
    navbar: {
        background: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(10px)",
        padding: "15px 0",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        boxShadow: "0 2px 20px rgba(0,0,0,0.1)",
        borderBottom: "1px solid rgba(42, 82, 152, 0.1)",
    },
    navContainer: {
        maxWidth: "1200px",
        margin: "0 auto",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 20px",
    },
    navLogo: {
        fontSize: "1.8rem",
        fontWeight: "bold",
        color: "#1e3c72",
        textDecoration: "none",
    },
    navCenter: {
        display: "flex",
        alignItems: "center",
        gap: "20px",
        flex: 1,
        justifyContent: "center",
    },
    searchForm: {
        display: "flex",
        alignItems: "center",
        background: "white",
        borderRadius: "25px",
        padding: "8px 20px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        border: "2px solid #e0e0e0",
        transition: "all 0.3s ease",
    },
    searchInput: {
        border: "none",
        outline: "none",
        padding: "8px 12px",
        fontSize: "14px",
        width: "300px",
        backgroundColor: "transparent",
    },
    searchButton: {
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        border: "none",
        borderRadius: "20px",
        padding: "8px 16px",
        color: "white",
        cursor: "pointer",
        fontSize: "14px",
        fontWeight: "500",
        transition: "all 0.3s ease",
    },
    navRight: {
        display: "flex",
        alignItems: "center",
        gap: "15px",
    },
    navButton: {
        padding: "10px 20px",
        borderRadius: "25px",
        border: "none",
        cursor: "pointer",
        fontSize: "14px",
        fontWeight: "500",
        transition: "all 0.3s ease",
        textDecoration: "none",
        display: "inline-block",
        textAlign: "center",
    },
    loginButton: {
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "white",
    },
    trackButton: {
        background: "transparent",
        color: "#1e3c72",
        border: "2px solid #1e3c72",
    },

    container: {
        maxWidth: "1200px",
        margin: "0 auto",
        background: "white",
        boxShadow: "0 20px 60px rgba(0,0,0,0.1)",
        borderRadius: "20px",
        overflow: "hidden",
        marginTop: "20px",
        marginBottom: "20px",
    },
    header: {
        background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
        color: "white",
        padding: "60px 0",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
    },
    headerContent: {
        position: "relative",
        zIndex: 2,
    },
    logo: {
        fontSize: "3.5rem",
        fontWeight: "bold",
        marginBottom: "10px",
        textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
    },
    tagline: {
        fontSize: "1.3rem",
        opacity: 0.9,
        marginBottom: "20px",
    },
    companyName: {
        fontSize: "1.1rem",
        opacity: 0.8,
        fontWeight: 300,
    },
    content: {
        padding: "40px",
    },
    section: {
        marginBottom: "50px",
        padding: "30px",
        background: "linear-gradient(135deg, #f8f9ff 0%, #ffffff 100%)",
        borderRadius: "15px",
        borderLeft: "5px solid #2a5298",
        boxShadow: "0 5px 20px rgba(0,0,0,0.05)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
    },
    sectionTitle: {
        color: "#1e3c72",
        fontSize: "2rem",
        marginBottom: "20px",
        fontWeight: 600,
        position: "relative",
    },
    highlightBox: {
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "white",
        padding: "30px",
        borderRadius: "15px",
        margin: "30px 0",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
    },
    stats: {
        display: "flex",
        justifyContent: "space-around",
        textAlign: "center",
        margin: "30px 0",
        flexWrap: "wrap",
    },
    stat: {
        flex: 1,
        minWidth: "150px",
        margin: "10px",
    },
    statNumber: {
        fontSize: "2.5rem",
        fontWeight: "bold",
        color: "#2a5298",
        display: "block",
    },
    statLabel: {
        color: "#666",
        marginTop: "5px",
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "30px",
        marginTop: "30px",
    },
    servicesGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "20px",
        marginTop: "20px",
    },
    card: {
        background: "white",
        padding: "25px",
        borderRadius: "12px",
        boxShadow: "0 5px 20px rgba(0,0,0,0.08)",
        borderTop: "4px solid #2a5298",
        transition: "all 0.3s ease",
    },
    serviceItem: {
        background: "white",
        padding: "20px",
        borderRadius: "10px",
        textAlign: "center",
        boxShadow: "0 3px 15px rgba(0,0,0,0.1)",
        transition: "all 0.3s ease",
        border: "2px solid transparent",
    },
    cardTitle: {
        color: "#1e3c72",
        fontSize: "1.3rem",
        fontWeight: 600,
        marginBottom: "15px",
    },
    serviceIcon: {
        width: "60px",
        height: "60px",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "0 auto 15px",
        color: "white",
        fontSize: "24px",
    },
    contactInfo: {
        background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
        color: "white",
        padding: "40px",
        borderRadius: "15px",
        marginTop: "30px",
    },
    contactGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "30px",
        marginTop: "20px",
    },
    contactItem: {
        textAlign: "center",
    },
    contactIcon: {
        width: "50px",
        height: "50px",
        background: "rgba(255,255,255,0.2)",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "0 auto 15px",
        fontSize: "20px",
    },
    footer: {
        background: "#1e3c72",
        color: "white",
        textAlign: "center",
        padding: "20px",
        marginTop: "40px",
    },
};
