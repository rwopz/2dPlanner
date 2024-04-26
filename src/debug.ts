// Function to handle unit selection
function selectedUnit(unit: HTMLElement, e: MouseEvent | KeyboardEvent) {
  // Check if CMD/CTRL key is pressed and if '.' key is pressed
  if (
    (e instanceof KeyboardEvent &&
      (e.metaKey || (e.ctrlKey && navigator.platform.includes("Mac")))) ||
    (e instanceof MouseEvent && (e.ctrlKey || e.metaKey))//ctrl not working
  ) {
    if (e instanceof KeyboardEvent && e.key !== ".") return; // If key is not '.'

    // Deselect all other units
    units.forEach((u) => {
      if (u !== unit) {
        deselectedUnit(u);
      }
    });

    // Apply shadow effect to the selected unit
    unit.style.boxShadow = "0 0 0 3px rgba(255, 0, 0, 0.5)";

    // Log the information of the selected unit
    const widgetName = unit.dataset.widgetName;
    console.log("Widget Name:", widgetName ? widgetName : "Unknown");
    console.log("Unit Id:", unit.id);
    console.log("Unit Colour or Hexcode:", unit.style.backgroundColor);
    console.log(
      "Unit Dimensions (Height and Width):",
      unit.offsetWidth,
      "x",
      unit.offsetHeight
    );

    return;
  }

  // Deselect all other units
  units.forEach((u) => {
    if (u !== unit) {
      deselectedUnit(u);
    }
  });

  // Apply shadow effect to the selected unit
  unit.style.boxShadow = "0 0 0 3px rgba(255, 0, 0, 0.5)";
}

// Function to handle unit deselection
function deselectedUnit(unit: HTMLElement) {
  // Remove shadow effect
  unit.style.boxShadow = "none";
}

// Function to handle unit click event
function handleUnitClick(e: MouseEvent) {
  const clickedUnit = e.target as HTMLElement;
  selectedUnit(clickedUnit, e);
}

// Attach event listener for unit clicks
document.querySelectorAll(".unit").forEach((unit) => {
  unit.addEventListener("click", handleUnitClick);
});

// Attach event listener for CMD/CTRL + '.' key press
document.addEventListener("keydown", function (e) {
  if (
    e instanceof KeyboardEvent &&
    (e.metaKey || (e.ctrlKey && navigator.platform.includes("Mac"))) &&
    e.key === "."
  ) {
    const selectedUnit = units.find((unit) => unit.style.boxShadow !== "none");
    if (selectedUnit) {
      console.log("Widget Name:", selectedUnit.dataset.widgetName);
      console.log("Unit Id:", selectedUnit.id);
      console.log(
        "Unit Colour or Hexcode:",
        selectedUnit.style.backgroundColor
      );
      console.log(
        "Unit Dimensions (Height and Width):",
        selectedUnit.offsetWidth,
        "x",
        selectedUnit.offsetHeight
      );
    }
  }
});
