//é responsável por colocar na outra div
function Adicionar() {
  const checkboxes = document.querySelectorAll("#Div1 .checkbox");
  const destino = document.getElementById("Div2");
  checkboxes.forEach(checkbox => {
    if (checkbox.checked) {
      const label = checkbox.parentElement; 
      destino.appendChild(label);
      checkbox.checked = false; 
    }


     
  });
}
//retira os itens e manda de volta para a div anterior
function Remover() {
  const destino = document.getElementById("Div2");
  const origem = document.getElementById("Div1");
  const checkboxes = document.querySelectorAll("#Div2 .checkbox");
  checkboxes.forEach(checkbox => {
    const label = checkbox.parentElement;
    origem.appendChild(label);
    checkbox.checked = false; // opcional: desmarca após mover


    
  });
}
