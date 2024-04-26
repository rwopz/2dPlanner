// Function to delete the selected unit
function deleteSelectedUnit() {
  const selected = units.find((unit) => unit.style.boxShadow !== "none");
  if (selected) {
    selected.parentNode!.removeChild(selected);
    const index = units.indexOf(selected);
    if (index !== -1) {
      units.splice(index, 1);
      console.log("Selected unit deleted.");
    }
  }
}

// Event listener for Backspace key press
document.addEventListener("keydown", (e: KeyboardEvent) => {
  if (e.key === "Backspace") {
    deleteSelectedUnit();
  }
});

// Event listener for delete button click (assuming you have a button with id "deleteButton")
const deleteButton = document.getElementById("deleteButton");
if (deleteButton) {
  deleteButton.addEventListener("click", () => {
    deleteSelectedUnit();
  });
}
