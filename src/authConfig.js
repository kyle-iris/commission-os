// Azure AD B2C Authentication Configuration
// This file handles authentication using Microsoft Identity Platform (Azure AD)

export const msalConfig = {
  auth: {
    clientId: process.env.VITE_AZURE_CLIENT_ID || "YOUR_CLIENT_ID_HERE", // Application (client) ID from Azure Portal
    authority: process.env.VITE_AZURE_AUTHORITY || "https://login.microsoftonline.com/YOUR_TENANT_ID", // Tenant ID or domain
    redirectUri: process.env.VITE_REDIRECT_URI || "http://localhost:3000", // Must match Azure Portal config
    postLogoutRedirectUri: process.env.VITE_POST_LOGOUT_REDIRECT_URI || "http://localhost:3000",
  },
  cache: {
    cacheLocation: "sessionStorage", // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set to true for IE 11 or Edge
  },
};

// Scopes for ID token to be used at Microsoft identity platform endpoints
export const loginRequest = {
  scopes: ["User.Read", "email", "profile", "openid"],
};

// Scopes for access token to be used at a protected resource API
export const tokenRequest = {
  scopes: ["User.Read", "email"],
  forceRefresh: false, // Set to true to skip a cached token and go to the server to get a new token
};

// User roles mapping (matches Azure AD group membership)
export const ROLES = {
  ADMIN: "Admin",
  REP: "SalesRep",
  MANAGER: "Manager",
  GUEST: "Guest", // External users (B2B collaboration)
};

/**
 * Determines user role based on Azure AD groups or custom claims
 * @param {Object} account - MSAL account object
 * @returns {string} User role
 */
export function getUserRole(account) {
  if (!account) return ROLES.GUEST;

  // Check for custom role claim (configure in Azure AD app manifest)
  const roles = account.idTokenClaims?.roles || [];
  
  if (roles.includes("Admin")) return ROLES.ADMIN;
  if (roles.includes("Manager")) return ROLES.MANAGER;
  if (roles.includes("SalesRep")) return ROLES.REP;

  // Check if user is guest (external user invited via B2B)
  const userType = account.idTokenClaims?.userType || account.username?.includes("#EXT#");
  if (userType === "Guest" || userType) return ROLES.GUEST;

  // Default to Rep for internal users without specific role
  return ROLES.REP;
}

/**
 * Maps Azure AD user to CommissionOS user structure
 * @param {Object} account - MSAL account object
 * @returns {Object} User object for the app
 */
export function mapAzureUserToAppUser(account) {
  const role = getUserRole(account);
  const isGuest = account.idTokenClaims?.userType === "Guest";

  return {
    id: account.localAccountId || account.homeAccountId,
    name: account.name || account.username,
    email: account.username,
    role: role.toLowerCase(),
    isGuest: isGuest,
    tenantId: account.tenantId,
    idToken: account.idToken,
    // Map to rep if role is "rep"
    rep: role === ROLES.REP ? null : null, // Would be set based on email matching or custom claim
  };
}
