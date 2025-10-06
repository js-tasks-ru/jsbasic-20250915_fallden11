function makeDiagonalRed(table) {
  let rows = table.rows;

  for (let i = 0; i < rows.length; i++) {
    let cells = rows[i].cells;

    if (cells[i]) {
      cells[i].style.backgroundColor = "red";
    }
  }
}
