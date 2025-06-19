
// Simple toast utility for HTML pages
const toast = {
  success: (message) => {
    showToast(message, 'success');
  },
  error: (message) => {
    showToast(message, 'error');
  }
};

function showToast(message, type) {
  // Create toast container if it doesn't exist
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 9999;
      pointer-events: none;
    `;
    document.body.appendChild(container);
  }

  // Create toast element
  const toastEl = document.createElement('div');
  toastEl.style.cssText = `
    padding: 16px 20px;
    margin-bottom: 12px;
    border-radius: 8px;
    color: white;
    font-weight: 500;
    pointer-events: auto;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    max-width: 300px;
    word-wrap: break-word;
    ${type === 'success' ? 'background-color: #10b981;' : 'background-color: #ef4444;'}
  `;
  toastEl.textContent = message;

  container.appendChild(toastEl);

  // Animate in
  setTimeout(() => {
    toastEl.style.transform = 'translateX(0)';
  }, 100);

  // Remove after 4 seconds
  setTimeout(() => {
    toastEl.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (container.contains(toastEl)) {
        container.removeChild(toastEl);
      }
    }, 300);
  }, 4000);
}

// Export for use in other files
window.toast = toast;
