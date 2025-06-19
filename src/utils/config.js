
// Configuration file for Lead Referral System
const API_BASE_URL = 'https://lead-manager-production.up.railway.app';

// Export configuration for use in other files
window.CONFIG = {
  API_BASE_URL
};

// For module-based imports (if needed)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { API_BASE_URL };
}
