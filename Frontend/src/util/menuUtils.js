export const openMenu = () => {
  document.body.style.overflow = "hidden";
  document.documentElement.style.setProperty("--SideNavigation-slideIn", 1);
};

export const closeMenu = () => {
  document.documentElement.style.removeProperty("--SideNavigation-slideIn");
  document.body.style.removeProperty("overflow");
};

export const toggleMenu = () => {
      const slideIn = window
        .getComputedStyle(document.documentElement)
        .getPropertyValue('--SideNavigation-slideIn');
      if (slideIn) {
        closeMenu();
      } else {
        openMenu();
      }
  };