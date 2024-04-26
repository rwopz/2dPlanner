document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector<HTMLInputElement>("#menuToggle input");
  const menu = document.querySelector<HTMLUListElement>("#menu");

  menuToggle.addEventListener("change", function (this: HTMLInputElement) {
    if (this.checked) {
      document.body.classList.add("menu-open");
      menu.style.transform = "translate(0)";
    } else {
      document.body.classList.remove("menu-open");
      menu.style.transform = "translate(-100%, 0)";
    }
  });

  // Close the menu when clicking outside of it
  document.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
    if (!target.closest("#menuToggle") && !target.closest("#menu")) {
      menuToggle.checked = false;
      document.body.classList.remove("menu-open");
      menu.style.transform = "translate(-100%, 0)";
    }
  });

  // Toggle submenu visibility when clicking on menu items with submenus
  const menuItemsWithSubmenu = document.querySelectorAll(".has-submenu");
  menuItemsWithSubmenu.forEach((menuItem) => {
    menuItem.addEventListener("click", () => {
      const submenu = menuItem.querySelector<HTMLUListElement>(".submenu");
      if (submenu) {
        submenu.classList.toggle("show");
      }
    });
  });

  // Prevent the default behavior of buttons to stop propagation
  const spawnButtons = document.querySelectorAll<HTMLAnchorElement>("#spawnUnit1Btn, #spawnUnit2Btn");
  spawnButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault(); // Prevent default behavior (i.e., navigating to the href)
      event.stopPropagation(); // Stop event propagation to prevent closing the menu
      // Add your spawning logic here
    });
  });

  // Prevent menu from closing when clicking spawn buttons
  const spawnMenuItems = document.querySelectorAll<HTMLLIElement>(".sub-submenu li");
  spawnMenuItems.forEach((item) => {
    item.addEventListener("click", (event) => {
      event.stopPropagation(); // Stop event propagation to prevent closing the menu
    });
  });
});
