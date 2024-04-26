// Initialize canvas and context
const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

// Array to store units
let units: HTMLElement[] = [];

// Function to log unit movement
function logMovement(color: string, x: number, y: number) {
  console.log(`Unit color: ${color}, Position: ${x} and ${y}`);
}

// Function to generate a unique 4-digit number for unit IDs
function generateUniqueId(): string {
  let id: string;
  do {
    id = Math.floor(1000 + Math.random() * 9000).toString();
  } while (units.some((unit) => unit.id === id)); // Check if ID already exists
  return id;
}

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

  // Display widget name
  console.log("Widget Name:", unit.dataset.widgetName);

  // Display unit ID
  console.log("Unit ID:", unit.id);
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

// Function to handle unit drag
function handleDrag(this: HTMLElement, e: MouseEvent | TouchEvent) {
  if (!this.isDragging) return;

  const touch = e instanceof TouchEvent ? e.touches[0] : e;
  const offsetX = touch.clientX - this.startX;
  const offsetY = touch.clientY - this.startY;

  this.style.left = this.initialLeft + offsetX + "px";
  this.style.top = this.initialTop + offsetY + "px";
}

// Function to handle unit drag end
function handleDragEnd(this: HTMLElement, e: MouseEvent | TouchEvent) {
  this.isDragging = false;
  const rect = this.getBoundingClientRect();
  const x = rect.left - canvas.getBoundingClientRect().left;
  const y = rect.top - canvas.getBoundingClientRect().top;
  logMovement(this.style.backgroundColor!, x, y);
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

// Attach event listener for canvas click
canvas.addEventListener("click", handleCanvasClick);

// Function to initialize draggable unit
function createUnit(
  x: number,
  y: number,
  width: number,
  height: number,
  color: string,
  widgetName: string // Add widgetName parameter
) {
  const id = generateUniqueId(); // Generate unique ID
  const unit = document.createElement("div");
  unit.className = "unit";
  unit.style.width = `${width}px`;
  unit.style.height = `${height}px`;
  unit.style.backgroundColor = color;
  unit.style.position = "absolute";
  unit.style.left = `${x}px`; // Set x coordinate
  unit.style.top = `${y}px`; // Set y coordinate
  unit.style.cursor = "move";
  unit.startX = x;
  unit.startY = y;
  unit.color = color;
  unit.id = id; // Assign generated id

  // Set widget name as a data attribute
  unit.dataset.widgetName = widgetName;

  unit.addEventListener("mousedown", handleDragStart.bind(unit));
  unit.addEventListener("touchstart", handleDragStart.bind(unit), {
    passive: false
  });
  document.addEventListener("mousemove", handleDrag.bind(unit));
  document.addEventListener("touchmove", handleDrag.bind(unit), {
    passive: false
  });
  document.addEventListener("mouseup", handleDragEnd.bind(unit));
  document.addEventListener("touchend", handleDragEnd.bind(unit));

  canvas.parentNode!.appendChild(unit);
  units.push(unit);
  console.log("Unit spawned with ID:", id, "and Widget Name:", widgetName);
}

// Button click event handlers for spawning units
document
  .getElementById("spawnBaseUnit1Btn")!
  .addEventListener("click", () =>
    createUnit(50, 40, 100, 80, "#FFFEE7", "Base Unit 1")
  );
document
  .getElementById("spawnBaseUnit2Btn")!
  .addEventListener("click", () =>
    createUnit(31, 40, 62, 80, "#FFFEE7", "Base Unit 2")
  );
document
  .getElementById("spawnWallUnit1Btn")!
  .addEventListener("click", () =>
    createUnit(50, 40, 100, 80, "#E5EBF7", "Wall Unit 1")
  );
document
  .getElementById("spawnWallUnit2Btn")!
  .addEventListener("click", () =>
    createUnit(31, 40, 62, 80, "#E5EBF7", "Wall Unit 2")
  );
document
  .getElementById("spawnTowerUnit1Btn")!
  .addEventListener("click", () =>
    createUnit(50, 96, 100, 192, "#FCE5F1", "Tower Unit 1")
  );
document
  .getElementById("spawnTowerUnit2Btn")!
  .addEventListener("click", () =>
    createUnit(31, 96, 62, 192, "#FCE5F1", "Tower Unit 2")
  );
