import { useState } from "react";

// Design tokens (matching main app)
const BG = "#060b14";
const BG2 = "#0c1522";
const BG3 = "rgba(255,255,255,0.04)";
const BORD = "rgba(255,255,255,0.07)";
const T1 = "#f1f5f9";
const T2 = "#64748b";
const T3 = "#2d3f52";

/**
 * Login Component with Azure AD Integration
 * Supports:
 * - Internal users (Azure AD tenant members)
 * - Guest users (B2B collaboration - external users invited to tenant)
 * - Demo mode (for testing without Azure AD)
 */
export default function Login({ onLogin }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [demoMode, setDemoMode] = useState(true); // Toggle for demo

  // Demo login (for testing without Azure AD)
  const handleDemoLogin = (role) => {
    setLoading(true);
    setTimeout(() => {
      const demoUsers = {
        admin: { id: "demo-admin", name: "Alex Rivera", email: "admin@demo.com", role: "admin", rep: null, isGuest: false },
        rep: { id: "demo-rep1", name: "Marisol Vega", email: "marisol@demo.com", role: "rep", rep: "rep-1", isGuest: false },
        guest: { id: "demo-guest", name: "John External", email: "john@external.com", role: "rep", rep: null, isGuest: true },
      };
      onLogin(demoUsers[role]);
      setLoading(false);
    }, 800);
  };

  // Azure AD login
  const handleAzureLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      // In production, this would use @azure/msal-browser
      // For now, showing the flow structure
      
      // Import MSAL (would be installed via npm)
      // const { PublicClientApplication } = await import('@azure/msal-browser');
      // const { msalConfig, loginRequest } = await import('./authConfig');
      
      // const msalInstance = new PublicClientApplication(msalConfig);
      // await msalInstance.initialize();
      
      // Login with popup
      // const loginResponse = await msalInstance.loginPopup(loginRequest);
      
      // Map Azure user to app user
      // const appUser = mapAzureUserToAppUser(loginResponse.account);
      // onLogin(appUser);

      // Demo: Simulate Azure AD login
      setTimeout(() => {
        const mockAzureUser = {
          id: "azure-user-123",
          name: "Jane Smith",
          email: "jane.smith@yourcompany.com",
          role: "admin",
          rep: null,
          isGuest: false,
          tenantId: "12345678-1234-1234-1234-123456789012",
        };
        onLogin(mockAzureUser);
        setLoading(false);
      }, 1500);

    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: BG,
      fontFamily: "'DM Sans', sans-serif",
      padding: "20px",
    }}>
      {/* Background gradient orbs */}
      <div style={{position: "absolute", top: "10%", left: "20%", width: "500px", height: "500px", background: "radial-gradient(circle, rgba(14,165,233,0.15) 0%, rgba(14,165,233,0) 70%)", filter: "blur(60px)", pointerEvents: "none"}} />
      <div style={{position: "absolute", bottom: "15%", right: "15%", width: "600px", height: "600px", background: "radial-gradient(circle, rgba(167,139,250,0.12) 0%, rgba(167,139,250,0) 70%)", filter: "blur(80px)", pointerEvents: "none"}} />

      <div style={{
        width: "100%",
        maxWidth: "450px",
        background: BG2,
        border: `1px solid ${BORD}`,
        borderRadius: "16px",
        padding: "48px 40px",
        position: "relative",
        zIndex: 1,
      }}>
        {/* Logo */}
        <div style={{display: "flex", alignItems: "center", gap: "12px", marginBottom: "32px"}}>
          <div style={{
            width: "48px",
            height: "48px",
            borderRadius: "12px",
            background: "linear-gradient(135deg, #0ea5e9, #10b981)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5} strokeLinecap="round">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
            </svg>
          </div>
          <div>
            <div style={{fontSize: "20px", fontWeight: 700, color: T1, letterSpacing: "-0.02em"}}>CommissionOS</div>
            <div style={{fontSize: "12px", color: T2}}>Sales Commission Management</div>
          </div>
        </div>

        {/* Title */}
        <h1 style={{fontSize: "24px", fontWeight: 700, color: T1, margin: "0 0 8px", letterSpacing: "-0.02em"}}>
          Sign in to your account
        </h1>
        <p style={{margin: "0 0 32px", fontSize: "14px", color: T2}}>
          Access your commission dashboard and reports
        </p>

        {/* Error message */}
        {error && (
          <div style={{
            padding: "12px 14px",
            background: "rgba(239,68,68,0.1)",
            border: "1px solid rgba(239,68,68,0.2)",
            borderRadius: "8px",
            marginBottom: "24px",
            fontSize: "13px",
            color: "#f87171",
          }}>
            {error}
          </div>
        )}

        {/* Azure AD Login Button */}
        <button
          onClick={handleAzureLogin}
          disabled={loading}
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "10px",
            border: "none",
            background: "linear-gradient(135deg, #0ea5e9, #10b981)",
            color: "white",
            fontSize: "14px",
            fontWeight: 600,
            cursor: loading ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            opacity: loading ? 0.6 : 1,
            marginBottom: "16px",
          }}
        >
          {loading ? (
            <>
              <div style={{
                width: "16px",
                height: "16px",
                border: "2px solid rgba(255,255,255,0.3)",
                borderTop: "2px solid white",
                borderRadius: "50%",
                animation: "spin 0.6s linear infinite",
              }} />
              <span>Signing in...</span>
            </>
          ) : (
            <>
              <svg width={20} height={20} viewBox="0 0 21 21" fill="none">
                <path d="M0 10.5h10.5V0H0v10.5zm10.5 0V21H21V10.5H10.5zM0 21h10.5V10.5H0V21z" fill="#f25022"/>
                <path d="M10.5 0v10.5H21V0H10.5z" fill="#00a4ef"/>
                <path d="M10.5 10.5V21H21V10.5H10.5z" fill="#ffb900"/>
                <path d="M0 21h10.5V10.5H0V21z" fill="#7fba00"/>
              </svg>
              <span>Sign in with Microsoft</span>
            </>
          )}
        </button>

        {/* Divider */}
        <div style={{display: "flex", alignItems: "center", gap: "12px", margin: "24px 0"}}>
          <div style={{flex: 1, height: "1px", background: BORD}} />
          <span style={{fontSize: "12px", color: T3}}>Or use demo mode</span>
          <div style={{flex: 1, height: "1px", background: BORD}} />
        </div>

        {/* Demo Login Buttons */}
        <div style={{display: "flex", flexDirection: "column", gap: "10px"}}>
          <button
            onClick={() => handleDemoLogin("admin")}
            disabled={loading}
            style={{
              padding: "12px",
              borderRadius: "8px",
              border: `1px solid ${BORD}`,
              background: BG3,
              color: T1,
              fontSize: "13px",
              fontWeight: 500,
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.5 : 1,
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span style={{fontSize: "16px"}}>🛡</span>
            <span>Demo as Admin</span>
          </button>
          <button
            onClick={() => handleDemoLogin("rep")}
            disabled={loading}
            style={{
              padding: "12px",
              borderRadius: "8px",
              border: `1px solid ${BORD}`,
              background: BG3,
              color: T1,
              fontSize: "13px",
              fontWeight: 500,
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.5 : 1,
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span style={{fontSize: "16px"}}>👤</span>
            <span>Demo as Sales Rep</span>
          </button>
          <button
            onClick={() => handleDemoLogin("guest")}
            disabled={loading}
            style={{
              padding: "12px",
              borderRadius: "8px",
              border: `1px solid ${BORD}`,
              background: BG3,
              color: T1,
              fontSize: "13px",
              fontWeight: 500,
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.5 : 1,
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span style={{fontSize: "16px"}}>🌐</span>
            <span>Demo as Guest User (External)</span>
          </button>
        </div>

        {/* Guest user info */}
        <div style={{
          marginTop: "24px",
          padding: "12px",
          background: "rgba(14,165,233,0.08)",
          border: "1px solid rgba(14,165,233,0.15)",
          borderRadius: "8px",
        }}>
          <div style={{fontSize: "11px", fontWeight: 600, color: "#0ea5e9", marginBottom: "4px"}}>
            🔐 Secure Authentication
          </div>
          <div style={{fontSize: "10px", color: T2, lineHeight: "1.5"}}>
            • Internal users: Sign in with your Microsoft account<br/>
            • Guest users: Use your external email (invited via Azure AD B2B)<br/>
            • All data is encrypted and access is role-based
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
