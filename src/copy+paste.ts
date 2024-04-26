// Global variable to store copied unit properties
let copiedUnit = null;

// Function to handle copying unit properties
function copyUnitProperties() {
  if (units.length > 0) {
    const selected = units.find((unit) => unit.style.boxShadow !== "none");
    if (selected) {
      // Copy all properties of the selected unit including its ID
      copiedUnit = {
        id: selected.id, // Include ID of the selected unit
        width: parseInt(selected.style.width),
        height: parseInt(selected.style.height),
        backgroundColor: selected.style.backgroundColor,
        startX: parseInt(selected.style.left),
        startY: parseInt(selected.style.top),
        widgetName: selected.dataset.widgetName // Include widget name of the selected unit
      };
      console.log("Copied: Unit properties copied. Widget Name:", copiedUnit.widgetName, "Unit ID:", selected.id);
    }
  }
}

// Function to handle pasting unit properties
function pasteUnitProperties() {
  if (copiedUnit) {
    const centerX = copiedUnit.startX + 20; // Offset for pasted unit
    const centerY = copiedUnit.startY + 20; // Offset for pasted unit
    createUnit(
      centerX,
      centerY,
      copiedUnit.width,
      copiedUnit.height,
      copiedUnit.backgroundColor,
      copiedUnit.widgetName // Pass widget name to createUnit function
    );
    console.log("Pasted: Unit properties pasted. Widget Name:", copiedUnit.widgetName, "Unit ID:", copiedUnit.id);
  }
}

// Listen for keydown events on the document
document.addEventListener("keydown", function (event) {
  if ((event.ctrlKey || event.metaKey) && (event.key === "c" || event.key === "C")) {
    // Ctrl+C or Command+C pressed
    copyUnitProperties();
  } else if ((event.ctrlKey || event.metaKey) && (event.key === "v" || event.key === "V")) {
    // Ctrl+V or Command+V pressed
    pasteUnitProperties();
  }
});

// Attach event listeners to the copy and paste buttons
document.getElementById("copyButton").addEventListener("click", copyUnitProperties);
document.getElementById("pasteButton").addEventListener("click", pasteUnitProperties);
