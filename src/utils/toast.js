
// Toast notification system

class ToastManager {
  constructor() {
    this.container = null;
    this.init();
  }

  init() {
    // Create toast container if it doesn't exist
    if (!document.querySelector('.toast-container')) {
      this.container = document.createElement('div');
      this.container.className = 'toast-container';
      this.container.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1000;
        pointer-events: none;
      `;
      document.body.appendChild(this.container);
    } else {
      this.container = document.querySelector('.toast-container');
    }
  }

  show(message, type = 'info', duration = 5000) {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.style.cssText = `
      background: white;
      border-radius: 12px;
      padding: 16px 20px;
      margin-bottom: 12px;
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
      border-left: 4px solid;
      max-width: 350px;
      opacity: 0;
      transform: translateX(100%);
      transition: all 0.3s ease;
      pointer-events: auto;
      font-weight: 500;
    `;

    // Set colors based on type
    const colors = {
      success: '#10b981',
      error: '#ef4444',
      warning: '#f59e0b',
      info: '#3b82f6'
    };

    toast.style.borderLeftColor = colors[type] || colors.info;
    toast.style.color = type === 'error' ? '#991b1b' : '#374151';

    toast.textContent = message;
    this.container.appendChild(toast);

    // Animate in
    setTimeout(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateX(0)';
    }, 10);

    // Auto remove
    setTimeout(() => {
      this.remove(toast);
    }, duration);

    // Add click to dismiss
    toast.addEventListener('click', () => {
      this.remove(toast);
    });

    return toast;
  }

  remove(toast) {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }

  success(message, duration) {
    return this.show(message, 'success', duration);
  }

  error(message, duration) {
    return this.show(message, 'error', duration);
  }

  warning(message, duration) {
    return this.show(message, 'warning', duration);
  }

  info(message, duration) {
    return this.show(message, 'info', duration);
  }
}

// Create global instance
window.toast = new ToastManager();
