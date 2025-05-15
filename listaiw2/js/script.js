
function Adicionar() {
  const checkboxes = document.querySelectorAll("#Div1 .checkbox");
  const destino = document.getElementById("Div2");
  checkboxes.forEach(checkbox => {
    if (checkbox.checked) {
      const label = checkbox.parentElement; // mover o label junto
      destino.appendChild(label);
      checkbox.checked = false; // desmarca após mover
    }


     
  });
}
function Remover() {
  const destino = document.getElementById("Div2");
  const origem = document.getElementById("Div1");
  const checkboxes = document.querySelectorAll("#Div2 .checkbox");
  checkboxes.forEach(checkbox => {
    const label = checkbox.parentElement; // mover o label junto
    origem.appendChild(label);
    checkbox.checked = false; // opcional: desmarca após mover


    
  });
}