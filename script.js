document.addEventListener("DOMContentLoaded", function () {
  const table = document.getElementById("chemicalTable");
  const addRowButton = document.getElementById("add-row");
  const deleteRowButton = document.getElementById("delete-row");
  const editRowButton = document.getElementById("edit-row");
  const saveButton = document.getElementById("save");
  const moveUpButton = document.getElementById("move-up");
  const moveDownButton = document.getElementById("move-down");

  // Sorting functionality
  const headers = document.querySelectorAll("thead th");
  let sortDirection = true;

  headers.forEach((header) => {
    header.addEventListener("click", () => {
      const index = Array.prototype.indexOf.call(
        header.parentElement.children,
        header
      );
      sortTable(index, sortDirection);
      sortDirection = !sortDirection; // Toggle direction
    });
  });

  function sortTable(index, ascending) {
    const rows = Array.from(table.querySelectorAll("tbody tr"));
    rows.sort((a, b) => {
      const cellA = a.cells[index].textContent;
      const cellB = b.cells[index].textContent;
      return ascending
        ? cellA.localeCompare(cellB)
        : cellB.localeCompare(cellA);
    });

    rows.forEach((row) => table.querySelector("tbody").appendChild(row));
  }

  // Add Row functionality with prompt
  addRowButton.addEventListener("click", function () {
    const newRow = table.insertRow();
    const checkboxCell = newRow.insertCell(0);
    checkboxCell.innerHTML = '<input type="checkbox" class="row-check">';

    // Prompt user for each value and add it to the new row
    const prompts = [
      "Chemical Name",
      "Vendor",
      "Density (g/m³)",
      "Viscosity (m²/s)",
      "Packaging",
      "Pack Size",
      "Unit",
      "Quantity",
    ];
    prompts.forEach((promptText) => {
      const newCell = newRow.insertCell();
      const userInput = prompt(`Enter ${promptText}:`);
      newCell.textContent = userInput;
    });
  });

  // Edit the selected row (allow user to modify the row)
  editRowButton.addEventListener("click", function () {
    const selectedRows = document.querySelectorAll(".row-check:checked");
    selectedRows.forEach((checkbox) => {
      const row = checkbox.closest("tr");
      row.querySelectorAll("td").forEach((cell, index) => {
        if (index > 0) {
          // Skip the checkbox
          cell.contentEditable = "true";
          cell.style.border = "1px solid #007bff"; // Add border for editable state
        }
      });
    });
  });

  // Delete selected rows
  deleteRowButton.addEventListener("click", function () {
    const checkboxes = document.querySelectorAll(".row-check:checked");
    checkboxes.forEach((checkbox) => {
      const row = checkbox.closest("tr");
      row.remove();
    });
  });

  // Save table data (console log the content for now)
  saveButton.addEventListener("click", function () {
    const tableData = [];
    const rows = table.querySelectorAll("tbody tr");
    rows.forEach((row) => {
      const rowData = [];
      row.querySelectorAll("td").forEach((cell, index) => {
        if (index > 0) {
          rowData.push(cell.innerText);
        }
      });
      tableData.push(rowData);
    });
    console.log("Saved Data:", tableData);
  });

  // Move row up
  moveUpButton.addEventListener("click", function () {
    const selectedRow = document.querySelector(".row-check:checked");
    if (selectedRow) {
      const row = selectedRow.closest("tr");
      if (row.previousElementSibling) {
        row.parentNode.insertBefore(row, row.previousElementSibling);
      }
    }
  });

  // Move row down
  moveDownButton.addEventListener("click", function () {
    const selectedRow = document.querySelector(".row-check:checked");
    if (selectedRow) {
      const row = selectedRow.closest("tr");
      if (row.nextElementSibling) {
        row.parentNode.insertBefore(row.nextElementSibling, row);
      }
    }
  });
});
