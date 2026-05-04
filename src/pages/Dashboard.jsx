import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div style={d.container}>
      <div style={d.wrapper}>
        <header style={d.header}>
          <div>
            <h1 style={d.welcome}>Dashboard</h1>
            <p style={d.status}>Account Active • Senior Frontend Engineer</p>
          </div>
          <button onClick={handleLogout} style={d.logoutBtn}>Logout</button>
        </header>

        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          style={d.profileCard}
        >
          <div style={d.userHeader}>
            <div style={d.avatar}>{user?.name?.[0] || "S"}</div>
            <div>
              <h2 style={d.userName}>{user?.name || "Sana Samad"}</h2>
              <p style={d.userEmail}>{user?.email}</p>
            </div>
          </div>

          <div style={d.statsGrid}>
            <div style={d.statBox}>
              <span style={d.statLabel}>Role</span>
              <span style={d.statValue}>Administrator</span>
            </div>
            <div style={d.statBox}>
              <span style={d.statLabel}>Project Status</span>
              <span style={d.statValue}>Live Deployment</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

const d = {
  container: { minHeight: "100vh", backgroundColor: "#0a0a0a", padding: "40px 20px" },
  wrapper: { maxWidth: "800px", margin: "0 auto" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "40px" },
  welcome: { color: "#fff", fontSize: "24px", fontWeight: "700", margin: 0 },
  status: { color: "#555", fontSize: "13px", marginTop: "4px" },
  logoutBtn: { 
    backgroundColor: "rgba(239, 68, 68, 0.1)", 
    color: "#ef4444", 
    border: "1px solid rgba(239, 68, 68, 0.2)", 
    padding: "8px 16px", 
    borderRadius: "8px", 
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "600"
  },
  profileCard: {
    backgroundColor: "#161616",
    borderRadius: "24px",
    padding: "32px",
    border: "1px solid rgba(255,255,255,0.05)",
  },
  userHeader: { display: "flex", alignItems: "center", gap: "20px", marginBottom: "32px" },
  avatar: { 
    width: "60px", 
    height: "60px", 
    borderRadius: "16px", 
    backgroundColor: "#4F46E5", 
    display: "flex", 
    alignItems: "center", 
    justifyContent: "center",
    fontSize: "24px",
    fontWeight: "bold",
    color: "#fff"
  },
  userName: { color: "#fff", fontSize: "20px", fontWeight: "600", margin: 0 },
  userEmail: { color: "#888", fontSize: "14px", marginTop: "2px" },
  statsGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" },
  statBox: { 
    backgroundColor: "#0f0f0f", 
    padding: "16px", 
    borderRadius: "16px", 
    display: "flex", 
    flexDirection: "column", 
    gap: "4px" 
  },
  statLabel: { fontSize: "10px", color: "#444", fontWeight: "800", textTransform: "uppercase", letterSpacing: "1px" },
  statValue: { fontSize: "14px", color: "#ccc", fontWeight: "500" },
};
