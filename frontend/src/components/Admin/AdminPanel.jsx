import React, { useState, useEffect, useCallback } from "react";
import { adminAPI } from "../../services/api";
import { formatCurrency } from "../../utils/helpers";
import Loader from "../Shared/Loader";
import Button from "../Shared/Button";
import InputField from "../Shared/InputField";
import { useNavigate } from "react-router-dom";

const EDU_OPTIONS = [
  { value: "High School", label: "High School" },
  { value: "Associate", label: "Associate" },
  { value: "Bachelor's", label: "Bachelor's" },
  { value: "Master's", label: "Master's" },
  { value: "PhD", label: "PhD" },
  { value: "Certification", label: "Certification" },
];

const emptyForm = { title: "", category: "", description: "", requiredSkills: "", educationLevel: "Bachelor's", salaryMin: "", salaryMax: "" };

/* ─── Analytics Dashboard View ─── */
const AnalyticsDashboard = ({ stats }) => (
  <div className="space-y-6">
    {/* KPI Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {[
        { title: "Total Registered Users", value: stats.totalUsers || "...", trend: "+12.5% this month", trendUp: true },
        { title: "Active Careers Tracked", value: stats.totalCareers || "...", trend: "+45 imported today", trendUp: true },
        { title: "Total Matches Made", value: stats.totalMatches || "...", trend: "+2,140 this week", trendUp: true },
        { title: "ML Engine Status", value: "Healthy", trend: "Sys Latency: 42ms", forceGreen: true },
      ].map((kpi, i) => (
        <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between">
          <h3 className="text-sm font-semibold text-slate-500 mb-2">{kpi.title}</h3>
          <p className={`text-3xl font-extrabold mb-3 ${kpi.forceGreen ? 'text-emerald-500' : 'text-slate-800'}`}>{kpi.value}</p>
          <p className="text-xs font-semibold text-emerald-500">
            {kpi.trendUp ? '↑ ' : ''}{kpi.trend}
          </p>
        </div>
      ))}
    </div>

    {/* Main Charts Row */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Area Chart Component */}
      <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-slate-100 flex flex-col">
        <h3 className="text-lg font-bold text-slate-800 mb-6">User Growth & Engagement</h3>
        <div className="relative flex-1 w-full min-h-[250px]">
           <svg viewBox="0 0 500 250" preserveAspectRatio="none" className="absolute inset-0 w-full h-full overflow-visible">
               <defs>
                   <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                       <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.25" />
                       <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.01" />
                   </linearGradient>
               </defs>
               {/* Background Grid */}
               {[30, 85, 140, 195, 250].map(y => (
                  <path key={y} d={`M 0 ${y} L 500 ${y}`} stroke="#f1f5f9" strokeWidth="2" />
               ))}
               <path d="M 0 250 L 50 230 L 100 180 L 150 190 L 200 130 L 250 110 L 300 70 L 350 100 L 400 60 L 450 20 L 450 250 L 0 250 Z" fill="url(#areaGradient)" />
               <path d="M 0 250 L 50 230 L 100 180 L 150 190 L 200 130 L 250 110 L 300 70 L 350 100 L 400 60 L 450 20" fill="none" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
               <circle cx="450" cy="20" r="5" fill="#fff" stroke="#2563eb" strokeWidth="3" />
               
               {/* Labels X */}
               {['Sep','Oct','Nov','Dec','Jan','Feb','Mar','Apr','May','Jun'].map((lbl, i) => (
                  <text key={lbl} x={i * 50} y="275" fontSize="11" fill={i===9?"#2563eb":"#64748b"} fontWeight={i===9?"bold":"normal"} textAnchor="middle">{lbl}</text>
               ))}
           </svg>
        </div>
      </div>

      {/* Donut Component */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 flex flex-col">
        <h3 className="text-lg font-bold text-slate-800 mb-6">Target Role Distribution</h3>
        <div className="flex-1 flex flex-col items-center justify-center">
            <div className="relative w-44 h-44">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#f1f5f9" strokeWidth="20" />
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#2563eb" strokeWidth="20" strokeDasharray="100.5 251.2" strokeDashoffset="0" />
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#8b5cf6" strokeWidth="20" strokeDasharray="75.3 251.2" strokeDashoffset="-100.5" />
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#10b981" strokeWidth="20" strokeDasharray="50.2 251.2" strokeDashoffset="-175.8" />
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#f59e0b" strokeWidth="20" strokeDasharray="25.5 251.2" strokeDashoffset="-226" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="font-extrabold text-2xl text-slate-800 leading-tight">100%</span>
                    <span className="text-xs font-semibold text-slate-500">Analyzed</span>
                </div>
            </div>
            
            <div className="mt-8 grid grid-cols-2 gap-y-3 gap-x-6 text-xs font-medium text-slate-600">
                <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-sm bg-blue-600"></div>Software/Tech</div>
                <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-sm bg-violet-500"></div>Finance/Biz</div>
                <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-sm bg-emerald-500"></div>Healthcare</div>
                <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-sm bg-amber-500"></div>Creative/Other</div>
            </div>
        </div>
      </div>
    </div>

    {/* Activity Table */}
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden text-sm">
      <div className="p-6 border-b border-slate-100">
         <h3 className="text-lg font-bold text-slate-800">Recent System Activity</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
           <thead className="bg-slate-50 text-slate-500 font-semibold uppercase text-xs tracking-wider">
              <tr>
                 <th className="px-6 py-4 border-b border-slate-100">Timestamp (GMT)</th>
                 <th className="px-6 py-4 border-b border-slate-100">Action</th>
                 <th className="px-6 py-4 border-b border-slate-100">Details</th>
                 <th className="px-6 py-4 border-b border-slate-100">Status</th>
              </tr>
           </thead>
           <tbody className="divide-y divide-slate-50">
              <tr>
                 <td className="px-6 py-4 text-slate-600 font-medium">2 mins ago</td>
                 <td className="px-6 py-4 font-bold text-slate-900">Job API Sync</td>
                 <td className="px-6 py-4 text-slate-500">Pulled 55 new Software Engineering roles externally</td>
                 <td className="px-6 py-4"><span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 rounded text-[10px] font-bold">SUCCESS</span></td>
              </tr>
              <tr>
                 <td className="px-6 py-4 text-slate-600 font-medium">18 mins ago</td>
                 <td className="px-6 py-4 font-bold text-slate-900">Model Retrain Tasks</td>
                 <td className="px-6 py-4 text-slate-500">Updated Cosine Similarity matrices for Active Users</td>
                 <td className="px-6 py-4"><span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 rounded text-[10px] font-bold">SUCCESS</span></td>
              </tr>
              <tr>
                 <td className="px-6 py-4 text-slate-600 font-medium">1 hr ago</td>
                 <td className="px-6 py-4 font-bold text-slate-900">Database Backup</td>
                 <td className="px-6 py-4 text-slate-500">Failed to upload user-profiles snapshot to isolated S3 Bucket</td>
                 <td className="px-6 py-4"><span className="inline-block px-3 py-1 bg-red-100 text-red-600 rounded text-[10px] font-bold">FAILED</span></td>
              </tr>
           </tbody>
        </table>
      </div>
    </div>
  </div>
);

/* ─── User Management View ─── */
const UserManagement = ({ users, onUpdateRole, onDeleteUser }) => (
  <div className="animate-in fade-in duration-300">
    <div className="mb-6">
      <h2 className="text-lg font-bold text-slate-800">User Management</h2>
      <p className="text-sm text-slate-500 mt-1">Control user access and assign administrative privileges.</p>
    </div>
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
      <table className="w-full text-left text-sm whitespace-nowrap">
        <thead className="bg-slate-50 text-slate-500 text-xs font-semibold uppercase tracking-wider">
          <tr>
            <th className="px-6 py-4 border-b border-slate-100">User</th>
            <th className="px-6 py-4 border-b border-slate-100">Email</th>
            <th className="px-6 py-4 border-b border-slate-100">Role</th>
            <th className="px-6 py-4 border-b border-slate-100">Joined</th>
            <th className="px-6 py-4 border-b border-slate-100 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {users.map((u) => (
            <tr key={u._id} className="hover:bg-slate-50">
              <td className="px-6 py-4 font-bold text-slate-800">{u.name}</td>
              <td className="px-6 py-4 text-slate-500">{u.email}</td>
              <td className="px-6 py-4">
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${u.role === 'admin' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}`}>
                  {u.role}
                </span>
              </td>
              <td className="px-6 py-4 text-slate-500">{new Date(u.createdAt).toLocaleDateString()}</td>
              <td className="px-6 py-4 text-right">
                <select 
                   className="text-xs bg-slate-50 border border-slate-200 rounded px-2 py-1 mr-2 outline-none focus:ring-1 ring-blue-500"
                   value={u.role}
                   onChange={(e) => onUpdateRole(u._id, e.target.value)}
                >
                   <option value="user">User</option>
                   <option value="admin">Admin</option>
                </select>
                <button 
                  className="px-3 py-1 text-xs font-medium text-rose-600 hover:bg-rose-50 rounded"
                  onClick={() => onDeleteUser(u._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

/* ─── Recommendation Logs View ─── */
const RecommendationLogs = ({ logs }) => (
  <div className="animate-in fade-in duration-300">
    <div className="mb-6">
      <h2 className="text-lg font-bold text-slate-800">Recommendation Logs</h2>
      <p className="text-sm text-slate-500 mt-1">Audit trail of career matches and AI engine requests.</p>
    </div>
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
      <table className="w-full text-left text-sm whitespace-nowrap">
        <thead className="bg-slate-50 text-slate-500 text-xs font-semibold uppercase tracking-wider">
          <tr>
            <th className="px-6 py-4 border-b border-slate-100">User</th>
            <th className="px-6 py-4 border-b border-slate-100">Action Type</th>
            <th className="px-6 py-4 border-b border-slate-100">Activity Details</th>
            <th className="px-6 py-4 border-b border-slate-100">Timestamp</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {logs.map((l) => (
            <tr key={l._id} className="hover:bg-slate-50">
              <td className="px-6 py-4">
                 <div className="font-bold text-slate-800">{l.userName}</div>
                 <div className="text-[10px] text-slate-400">{l.userEmail}</div>
              </td>
              <td className="px-6 py-4">
                 <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                   l.type === 'Recommendation' ? 'bg-blue-100 text-blue-700' :
                   l.type === 'Forum Thread' ? 'bg-emerald-100 text-emerald-700' :
                   l.type === 'Forum Reply' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'
                 }`}>{l.type}</span>
              </td>
              <td className="px-6 py-4 text-slate-500 italic max-w-xs truncate">{l.details}</td>
              <td className="px-6 py-4 text-slate-500">{new Date(l.timestamp).toLocaleString()}</td>
            </tr>
          ))}
          {!logs.length && (
            <tr><td colSpan={4} className="p-8 text-center text-slate-500 font-medium italic">No activity logged yet.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);

/* ─── API Integrations View ─── */
const APIIntegrations = () => (
  <div className="animate-in fade-in duration-300">
    <div className="mb-6">
      <h2 className="text-lg font-bold text-slate-800">External Integrations</h2>
      <p className="text-sm text-slate-500 mt-1">Configure external data sources and ML engine sync settings.</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
         <div className="flex justify-between items-start mb-4">
            <h3 className="font-bold text-slate-800">Firebase Auth</h3>
            <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded text-[10px] font-black uppercase">Active</span>
         </div>
         <p className="text-xs text-slate-500 mb-4">Handles Google OAuth and user session persistence.</p>
         <div className="text-[10px] font-mono bg-slate-50 p-2 rounded text-slate-400 break-all">PROJECT_ID: career-path-v1</div>
      </div>
      
      <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm opacity-60 grayscale cursor-not-allowed">
         <div className="flex justify-between items-start mb-4">
            <h3 className="font-bold text-slate-800">LinkedIn Jobs API</h3>
            <span className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded text-[10px] font-black uppercase">Coming Soon</span>
         </div>
         <p className="text-xs text-slate-500 mb-4">Automate career database updates from global job postings.</p>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm opacity-60 grayscale cursor-not-allowed">
         <div className="flex justify-between items-start mb-4">
            <h3 className="font-bold text-slate-800">OpenAI Engine</h3>
            <span className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded text-[10px] font-black uppercase">Coming Soon</span>
         </div>
         <p className="text-xs text-slate-500 mb-4">AI-driven summary generation for career descriptions.</p>
      </div>
    </div>
  </div>
);


const AdminPanel = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard"); // 'dashboard' | 'careers' | 'users' | 'logs' | 'api'
  
  // existing state 
  const [careers, setCareers] = useState([]);
  const [users, setUsers] = useState([]);
  const [logs, setLogs] = useState([]);
  const [stats, setStats] = useState({});

  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [apiError, setApiError] = useState("");

  const fetchData = useCallback(async () => {
    setLoading(true);
    setApiError("");
    try {
      if (activeTab === "dashboard") {
        const { data } = await adminAPI.stats();
        setStats(data.stats);
      } else if (activeTab === "careers") {
        const { data } = await adminAPI.list();
        setCareers(data.careers);
      } else if (activeTab === "users") {
        const { data } = await adminAPI.users();
        setUsers(data.users);
      } else if (activeTab === "logs") {
        const { data } = await adminAPI.logs();
        setLogs(data.logs);
      }
    } catch (e) {
      setApiError(e?.response?.data?.message || "Failed to load relevant administration data");
    } finally {
      setLoading(false);
    }
  }, [activeTab]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const openCreate = () => { setEditId(null); setForm(emptyForm); setModalOpen(true); };

  const openEdit = (career) => {
    setEditId(career._id);
    setForm({
      title: career.title,
      category: career.category,
      description: career.description,
      requiredSkills: (career.requiredSkills || []).join(", "),
      educationLevel: career.educationLevel || "Bachelor's",
      salaryMin: career.salaryRange?.min || "",
      salaryMax: career.salaryRange?.max || "",
    });
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setApiError("");
    const payload = {
      title: form.title,
      category: form.category,
      description: form.description,
      requiredSkills: form.requiredSkills.split(",").map((s) => s.trim()).filter(Boolean),
      educationLevel: form.educationLevel,
      salaryRange: { min: Number(form.salaryMin) || 0, max: Number(form.salaryMax) || 0, currency: "USD" },
    };
    try {
      if (editId) {
        await adminAPI.update(editId, payload);
      } else {
        await adminAPI.create(payload);
      }
      setModalOpen(false);
      await fetchData();
    } catch (err) {
      setApiError(err?.response?.data?.message || "Save failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this career?")) return;
    try {
      await adminAPI.remove(id);
      setCareers((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      setApiError(err?.response?.data?.message || "Delete failed");
    }
  };

  const handleUpdateUserRole = async (userId, role) => {
    try {
      await adminAPI.updateUserRole(userId, role);
      setUsers((prev) => prev.map(u => u._id === userId ? { ...u, role } : u));
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to update role");
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user? This cannot be undone.")) return;
    try {
      await adminAPI.deleteUser(userId);
      setUsers((prev) => prev.filter(u => u._id !== userId));
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to delete user");
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="fixed inset-0 z-50 bg-slate-50 flex font-sans">
      
      {/* ─── Sidebar ─── */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col z-10 shrink-0">
        {/* Branding */}
        <div className="flex items-center gap-3 p-6 text-xl font-bold cursor-pointer" onClick={() => navigate("/")}>
           <div className="flex -space-x-2">
              <div className="w-6 h-6 rounded-full bg-blue-500"></div>
              <div className="w-6 h-6 rounded-full bg-violet-500 opacity-80"></div>
           </div>
           <span>CareerAdmin</span>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-1.5 font-medium mt-4">
           <button onClick={() => setActiveTab('dashboard')} className={`w-full text-left px-4 py-3 rounded-lg flex items-center transition-colors ${activeTab==='dashboard'? 'bg-blue-600 text-white font-semibold' : 'text-slate-400 hover:bg-slate-800'}`}>Analytics Dashboard</button>
           <button onClick={() => setActiveTab('careers')} className={`w-full text-left px-4 py-3 rounded-lg flex items-center transition-colors ${activeTab==='careers'? 'bg-blue-600 text-white font-semibold' : 'text-slate-400 hover:bg-slate-800'}`}>Career Database</button>
           <button onClick={() => setActiveTab('users')} className={`w-full text-left px-4 py-3 rounded-lg flex items-center transition-colors ${activeTab==='users'? 'bg-blue-600 text-white font-semibold' : 'text-slate-400 hover:bg-slate-800'}`}>User Management</button>
           <button onClick={() => setActiveTab('logs')} className={`w-full text-left px-4 py-3 rounded-lg flex items-center transition-colors ${activeTab==='logs'? 'bg-blue-600 text-white font-semibold' : 'text-slate-400 hover:bg-slate-800'}`}>Recommendation Logs</button>
           <button onClick={() => setActiveTab('api')} className={`w-full text-left px-4 py-3 rounded-lg flex items-center transition-colors ${activeTab==='api'? 'bg-blue-600 text-white font-semibold' : 'text-slate-400 hover:bg-slate-800'}`}>API Integrations</button>
        </nav>
        
        <div className="p-4 mb-2">
            <button onClick={() => navigate("/")} className="w-full px-4 py-3 rounded-lg text-left text-slate-400 hover:bg-slate-800 transition-colors">
                ← Exit Admin
            </button>
        </div>
      </aside>
      
      {/* ─── Main Content ─── */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* Header */}
        <header className="h-[74px] bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0 shadow-sm z-10">
           <div className="flex items-center gap-4">
               {/* Hamburger lines style */}
               <div className="flex flex-col gap-[5px]">
                  <div className="w-5 h-[2px] bg-slate-500 rounded"></div>
                  <div className="w-5 h-[2px] bg-slate-500 rounded"></div>
                  <div className="w-5 h-[2px] bg-slate-500 rounded"></div>
               </div>
               <h1 className="text-xl font-bold text-slate-800 tracking-tight">
                   {activeTab === 'dashboard' ? 'Platform Overview' : 
                    activeTab === 'careers'   ? 'Career Database Management' :
                    activeTab === 'users'     ? 'User Access Control' :
                    activeTab === 'logs'      ? 'System Activity Logs' : 'External Integrations'}
               </h1>
           </div>

           <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600 relative cursor-pointer">
              A<span className="absolute bottom-0 -right-1 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white"></span>
           </div>
        </header>
        
        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-8 bg-slate-50">
           
           {activeTab === 'dashboard' && <AnalyticsDashboard stats={stats} />}
           
           {activeTab === 'users' && <UserManagement users={users} onUpdateRole={handleUpdateUserRole} onDeleteUser={handleDeleteUser} />}

           {activeTab === 'logs' && <RecommendationLogs logs={logs} />}

           {activeTab === 'api' && <APIIntegrations />}
           
           {activeTab === 'careers' && (
             <div className="animate-in fade-in duration-300">
               {/* Original Career Database Table UI */}
               <div className="flex justify-between items-center mb-6">
                 <div>
                    <h2 className="text-lg font-bold text-slate-800">Database Records</h2>
                    <p className="text-sm text-slate-500 mt-1">Manage, add, and modify career logic and requirements.</p>
                 </div>
                 <Button variant="accent" onClick={openCreate} className="shadow-sm">+ Add Career</Button>
               </div>
         
               {apiError && (
                 <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg mb-4 text-sm font-medium">
                   {apiError}
                 </div>
               )}
         
               <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                 <table className="w-full text-left text-sm whitespace-nowrap">
                   <thead className="bg-slate-50 text-slate-500 text-xs font-semibold uppercase tracking-wider">
                     <tr>
                       {["Title", "Category", "Education", "Salary", "Actions"].map((h) => (
                         <th key={h} className="px-6 py-4 border-b border-slate-100">{h}</th>
                       ))}
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-50">
                     {careers.map((c) => (
                       <tr key={c._id} className="hover:bg-slate-50">
                         <td className="px-6 py-4 font-bold text-slate-800">{c.title}</td>
                         <td className="px-6 py-4 text-slate-500">{c.category}</td>
                         <td className="px-6 py-4 text-slate-500 cursor-default" title={c.educationLevel}>
                            <span className="inline-block truncate max-w-[150px]">{c.educationLevel}</span>
                         </td>
                         <td className="px-6 py-4 text-slate-500 font-medium">
                           {formatCurrency(c.salaryRange?.min)} – {formatCurrency(c.salaryRange?.max)}
                         </td>
                         <td className="px-6 py-4 flex gap-2">
                           <button className="px-3 py-1.5 text-xs font-medium border border-slate-200 rounded text-slate-600 hover:bg-slate-100 transition-colors" onClick={() => openEdit(c)}>Edit</button>
                           <button className="px-3 py-1.5 text-xs font-medium border border-red-200 rounded text-red-600 hover:bg-red-50 bg-red-50/50 transition-colors" onClick={() => handleDelete(c._id)}>Delete</button>
                         </td>
                       </tr>
                     ))}
                     {!careers.length && (
                       <tr><td colSpan={5} className="p-8 text-center text-slate-500">No careers found in database.</td></tr>
                     )}
                   </tbody>
                 </table>
               </div>
             </div>
           )}
        </div>

        {/* ─── Modal ─── */}
        {modalOpen && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4 shadow-2xl" onClick={() => setModalOpen(false)}>
            <div className="bg-white rounded-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <h2 className="text-xl font-bold text-slate-800 mb-5">{editId ? "Edit Career" : "New Career"}</h2>
  
              {apiError && (
                <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg mb-4 text-sm font-medium">
                  {apiError}
                </div>
              )}
  
              <form onSubmit={handleSave} className="flex flex-col gap-4">
                <InputField label="Title" name="title" value={form.title} placeholder="e.g. Full-Stack Developer" required onChange={(e) => setForm({ ...form, title: e.target.value })} />
                <InputField label="Category" name="category" value={form.category} placeholder="e.g. Technology" required onChange={(e) => setForm({ ...form, category: e.target.value })} />
                <InputField label="Description" name="description" value={form.description} multiline rows={3} placeholder="Describe the role…" required onChange={(e) => setForm({ ...form, description: e.target.value })} />
                <InputField label="Required Skills (comma-separated)" name="requiredSkills" value={form.requiredSkills} placeholder="javascript, react, node.js" onChange={(e) => setForm({ ...form, requiredSkills: e.target.value })} />
                <InputField label="Education Level" type="select" name="educationLevel" value={form.educationLevel} options={EDU_OPTIONS} onChange={(e) => setForm({ ...form, educationLevel: e.target.value })} />
                <div className="grid grid-cols-2 gap-4">
                  <InputField label="Salary Min (USD)" type="number" name="salaryMin" value={form.salaryMin} placeholder="60000" onChange={(e) => setForm({ ...form, salaryMin: e.target.value })} />
                  <InputField label="Salary Max (USD)" type="number" name="salaryMax" value={form.salaryMax} placeholder="120000" onChange={(e) => setForm({ ...form, salaryMax: e.target.value })} />
                </div>
  
                <div className="flex gap-3 mt-4 pt-4 border-t border-slate-100">
                  <Button type="submit" variant="primary" className="flex-1">Save Profile</Button>
                  <Button type="button" variant="outline" className="flex-1" onClick={() => setModalOpen(false)}>Cancel</Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminPanel;
