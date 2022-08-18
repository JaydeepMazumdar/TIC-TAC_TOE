if (localStorage.getItem("array") == null) localStorage.setItem("array", "[]");
let array = JSON.parse(localStorage.getItem("array"));

const displayBox = document.querySelector(".ScoreDisplay");

const rows = array.map((row) => {
  return `
  <tr>
  <td>${row.slno}</td>
  <td>${row.player1}        Vs        ${row.player2}</td>
  <td>${row.winner}</td>
  </tr>
    `;
});

displayBox.innerHTML = rows;
