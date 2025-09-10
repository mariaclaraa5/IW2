$(document).ready(function(){
    //valida o email
$.validator.addMethod("emailvalide", function (value, element) {
    return this.optional(element) || /^[a-zA-Z0-9._%+-]+@(gmail|hotmail)\.com$/.test(value);
  }, "O e-mail deve ser do tipo @gmail.com ou @hotmail.com");
   //valida o cpf 
   $("#cpf").mask("000.000.000-00");
   $.validator.addMethod("cpfvalide", function(value, element) {
  var campo = value.replace(/\D/g, ''); // remove caracteres não numéricos
  return campo.length === 11 ;
}, "Digite um CPF (11 dígitos) válido.");

  var linhaEditando = null; // variável para controlar a linha que está sendo editada
  var validator = $("#formValidar").bind("invalid-form.validate", function(){
    $("#msg").html("Este formulário tem " + validator.numberOfInvalids() + " erro(s)");
  }).validate({
    errorElement: "label",
    errorPlacement: function(error, element){
      element.after(error);
    },
   
    submitHandler: function(form){
      console.log("Formulário enviado");
      var nome = $("#nome").val();
      var sobrenome = $("#sobrenome").val();
      var email = $("#email").val();
      var cpf = $("#cpf").val();
      var cidade = $("#cidade").val();
      var estado = $("#estado").val();

      if (linhaEditando) {
        linhaEditando.find("td:eq(1)").text(nome);
        linhaEditando.find("td:eq(2)").text(sobrenome);
        linhaEditando.find("td:eq(3)").text(email);
        linhaEditando.find("td:eq(4)").text(cpf);
        linhaEditando.find("td:eq(5)").text(cidade);
        linhaEditando.find("td:eq(6)").text(estado);
        linhaEditando = null; // limpa o estado de edição
      } else {
        var id = $("#tabelaDados tbody tr").length + 1;
        var novaLinha = `
          <tr>
            <td>${id}</td>
            <td>${nome}</td>
            <td>${sobrenome}</td>
            <td>${email}</td>
            <td>${cpf}</td>
            <td>${cidade}</td>
            <td>${estado}</td>
            <td>
              <button type="button" class="btn btn-warning btnEditar">Editar</button>
              <button type="button" class="btn btn-danger btnExcluir">Excluir</button>
            </td>
          </tr>
        `;
        $("#tabelaDados tbody").append(novaLinha);
      }

      form.reset();
      $("#msg").html(""); // limpa mensagem de erro após envio
    },

    rules: {
      nome: { required: true, maxlength: 25 },
      sobrenome: { required: true },
      email: {required: true, emailvalide: true },
      cpf: { required: true, cpfvalide: true},
      cidade: { required: true },
      estado: { required: true }
    },

    messages: {
      nome: {
        required: "Esse campo não pode ser vazio!",
        maxlength: "Apenas 25 caracteres"
      },
      sobrenome: { required: "Esse campo não pode ser vazio!" },
      email: { 
        required: "O campo e-mail é obrigatório",
        emailvalide: "Somente e-mails @gmail.com ou @hotmail.com são permitidos"
      },
      cpf: {
      required: "Esse campo não pode ser vazio!",
      cpfvalide: "Digite um CPF com 11 dígitos."
    },

      cidade: { required: "Esse campo não pode ser vazio!" },
      estado: { required: "Esse campo não pode ser vazio!" }
    }
  });

  // excluir
  $("#tabelaDados").on("click", ".btnExcluir", function(){
    $(this).closest("tr").remove();
    // atualiza os IDs após exclusão
    $("#tabelaDados tbody tr").each(function(index){
      $(this).find("td:eq(0)").text(index + 1);
    });
  });

  // editar
  $("#tabelaDados").on("click", ".btnEditar", function(){
    linhaEditando = $(this).closest("tr");
    $("#nome").val(linhaEditando.find("td:eq(1)").text());
    $("#sobrenome").val(linhaEditando.find("td:eq(2)").text());
    $("#email").val(linhaEditando.find("td:eq(3)").text());
    $("#cpf").val(linhaEditando.find("td:eq(4)").text());
    $("#cidade").val(linhaEditando.find("td:eq(5)").text());
    $("#estado").val(linhaEditando.find("td:eq(6)").text());
  });

  // filtra por nome
  $("#myInput").on("keyup", function(){
  var value = $(this).val().toLowerCase();
  $("#tabelaDados tbody tr").filter(function(){
    var nome = $(this).find("td:eq(1)").text().toLowerCase();
    $(this).toggle(nome.indexOf(value) > -1);
  });
});
});
