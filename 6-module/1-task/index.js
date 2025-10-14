/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this.rows = rows;
    this.elem = this.#createTable();
  }

  #createTable() {
    const table = document.createElement("table");
    const thead = document.createElement("thead");

    thead.innerHTML = `
    <tr>
        <th>Имя</th>
        <th>Возраст</th>
        <th>Зарплата</th>
        <th>Город</th>
        <th></th>
      </tr>
    `;

    table.appendChild(thead);
    const tbody = document.createElement("tbody");

    for (let row of this.rows) {
      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td>${row.name}</td>
        <td>${row.age}</td>
        <td>${row.salary}</td>
        <td>${row.city}</td>
        <td><button>X</button></td>
      `;

      tr.querySelector("button").addEventListener("click", () => {
        tr.remove();
      });

      tbody.appendChild(tr);
    }

    table.appendChild(tbody);
    return table;
  }
}
