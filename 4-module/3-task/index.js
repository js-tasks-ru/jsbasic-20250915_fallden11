function highlight(table) {
  const rows = table.querySelectorAll("tbody tr");
  rows.forEach((row) => {
    const cells = row.querySelectorAll("td");

    const statusCell = cells[3];
    if (statusCell.hasAttribute("data-available")) {
      const isAvailable = statusCell.getAttribute("data-available") === "true";
      row.classList.add(isAvailable ? "available" : "unavailable");
    } else {
      row.setAttribute("hidden", true);
    }

    const genderCell = cells[2];
    if (genderCell.textContent.trim() === "m") {
      row.classList.add("male");
    } else if (genderCell.textContent.trim() === "f") {
      row.classList.add("female");
    }

    const ageCell = cells[1];
    if (parseInt(ageCell.textContent) < 18) {
      row.style.textDecoration = "line-through";
    }
  });
}
