// Function to handle unit selection
function selectedUnit(unit: HTMLElement) {
  // Deselect all other units
  units.forEach((u) => {
    if (u !== unit) {
      deselectedUnit(u);
    }
  });

  // Apply shadow effect to the selected unit
  unit.style.boxShadow = "0 0 0 3px rgba(255, 0, 0, 0.5)";
  
  // Log the widget name
  console.log("Widget Name:", unit.dataset.widgetName);
}

// Function to handle unit deselection
function deselectedUnit(unit: HTMLElement) {
  // Remove shadow effect
  unit.style.boxShadow = "none";
}

// Function to handle unit drag start
function handleDragStart(this: HTMLElement, e: MouseEvent | TouchEvent) {
  e.preventDefault(); // Prevent default behavior (e.g., text selection)

  const touch = e instanceof TouchEvent ? e.touches[0] : e;
  this.startX = touch.clientX;
  this.startY = touch.clientY;
  this.initialLeft = parseInt(this.style.left!);
  this.initialTop = parseInt(this.style.top!);
  this.isDragging = true;

  // Select the unit when dragging starts
  selectedUnit(this);
}

// Function to handle unit drag end
function handleDragEnd(this: HTMLElement, e: MouseEvent | TouchEvent) {
  if (!this.isDragging) return;

  const touch = e instanceof TouchEvent ? e.changedTouches[0] : e;
  const mouseX = touch.clientX - canvas.getBoundingClientRect().left;
  const mouseY = touch.clientY - canvas.getBoundingClientRect().top;

  logMovement(this.style.backgroundColor!, mouseX, mouseY);

  this.isDragging = false;
}

// Function to handle canvas click for deselection
function handleCanvasClick(e: MouseEvent) {
  // Deselect the currently selected unit if the click is not on any unit
  const clickedElement = e.target as HTMLElement;
  if (!clickedElement.classList.contains("unit")) {
    units.forEach((unit) => {
      deselectedUnit(unit);
    });
  }
}

// Attach event listeners
canvas.addEventListener("click", handleCanvasClick);
