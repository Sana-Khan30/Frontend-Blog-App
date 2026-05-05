import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Frontend basic validation to avoid 400 bad requests
    if (!form.name.trim() || !form.email.trim() || !form.password.trim()) {
      setError('All fields are required');
      setLoading(false);
      return;
    }

    try {
      await register({
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password
      });
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.msg || err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={r.container}>
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        style={r.card}
      >
        <div style={r.header}>
          <h2 style={r.title}>Create Account</h2>
          <p style={r.subtitle}>Join the platform to start your journey</p>
        </div>

        {error && <div style={r.errorBox}>{error}</div>}

        <form onSubmit={handleSubmit} style={r.form}>
          <div style={r.inputGroup}>
            <label style={r.label}>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Sana Samad"
              value={form.name}
              onChange={handleChange}
              required
              style={r.input}
            />
          </div>

          <div style={r.inputGroup}>
            <label style={r.label}>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              required
              style={r.input}
            />
          </div>

          <div style={r.inputGroup}>
            <label style={r.label}>Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              required
              style={r.input}
            />
          </div>

          <motion.button
            whileHover={{ backgroundColor: "#5850ec" }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            style={loading ? {...r.btn, opacity: 0.7} : r.btn}
          >
            {loading ? "Creating Account..." : "Register Now"}
          </motion.button>
        </form>

        <p style={r.footer}>
          Already have an account? <Link to="/login" style={r.link}>Login here</Link>
        </p>
      </motion.div>
    </div>
  );
}

const r = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0a0a0a",
    fontFamily: "'Inter', sans-serif",
    padding: "20px"
  },
  card: {
    backgroundColor: "#161616",
    padding: "40px",
    borderRadius: "20px",
    width: "100%",
    maxWidth: "420px",
    border: "1px solid rgba(255,255,255,0.05)",
    boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
  },
  header: { marginBottom: "32px" },
  title: { color: "#fff", fontSize: "28px", fontWeight: "700", marginBottom: "8px", letterSpacing: "-0.5px" },
  subtitle: { color: "#888", fontSize: "14px" },
  errorBox: {
    backgroundColor: "rgba(239, 68, 68, 0.1)",
    border: "1px solid rgba(239, 68, 68, 0.2)",
    color: "#f87171",
    padding: "12px",
    borderRadius: "10px",
    fontSize: "13px",
    marginBottom: "20px",
  },
  form: { display: "flex", flexDirection: "column", gap: "18px" },
  inputGroup: { display: "flex", flexDirection: "column", gap: "8px" },
  label: { color: "#ccc", fontSize: "12px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "1px" },
  input: {
    backgroundColor: "#0f0f0f",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "12px",
    padding: "12px 16px",
    color: "#fff",
    fontSize: "14px",
    outline: "none",
    transition: "border 0.2s",
  },
  btn: {
    backgroundColor: "#4F46E5",
    color: "#fff",
    padding: "14px",
    borderRadius: "12px",
    border: "none",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "10px",
    transition: "all 0.2s",
  },
  footer: { marginTop: "24px", textAlign: "center", color: "#666", fontSize: "14px" },
  link: { color: "#6366f1", textDecoration: "none", fontWeight: "600" },
};
