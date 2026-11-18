let navigateRef = null;

export const setNavigate = (navigate) => {
  navigateRef = navigate;
};

export const navigateTo = (path, options = {}) => {
  navigateRef?.(path, options);
};
