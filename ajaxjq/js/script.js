$(document).ready(function(){
//exemplo de código com ajax e jquery
  // formata cpf
  $("#cpf").mask("000.000.000-00");

  // validação de cpf
  $.validator.addMethod("cpfValido", function(value, element) {
    var cpf = value.replace(/[^\d]+/g,'');
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    // validação dos dígitos verificadores
    var soma = 0, resto;

    // primeiro dígito
    for (var i = 1; i <= 9; i++)
      soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;

    // segundo dígito
    soma = 0;
    for (i = 1; i <= 10; i++)
      soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) return false;

    return true;
  }, "Digite um CPF válido.");

  var linhaEditando = null;

  var validator = $("#formValidar").bind("invalid-form.validate", function(){
    $("#msg").html("Este formulário tem " + validator.numberOfInvalids() + " erro(s)");
  }).validate({
    errorElement: "label",
    errorPlacement: function(error, element){
      element.after(error);
    },

    submitHandler: function(form){
    // coleta os dados do formulário
    var dadosFormulario = {
    nome: $("#nome").val(),
    sobrenome: $("#sobrenome").val(),
    email: $("#email").val(),
    cpf: $("#cpf").val(),
    cidade: $("#cidade").val(),
    estado: $("#estado").val()
  };

  $.ajax({
    url: "backend/dados.php", //ele está enviando para o arquivo que vai receber os dados e processar eles no front end
    method: "POST",//envia via post
    contentType: "application/json",
    data: JSON.stringify(dadosFormulario),
    success: function(resposta){
      // atualiza a interface com a resposta
      console.log("Dados enviados com sucesso:", resposta);
      $("#msg").html("Cadastro realizado com sucesso!");

      
      var id = $("#tabelaDados tbody tr").length + 1;
      
      var novaLinha = 
      `<tr>
          <td>${id}</td>
          <td>${dadosFormulario.nome}</td>
          <td>${dadosFormulario.sobrenome}</td>
          <td>${dadosFormulario.email}</td>
          <td>${dadosFormulario.cpf}</td>
          <td>${dadosFormulario.cidade}</td>
          <td>${dadosFormulario.estado}</td>
          <td>
            <button type="button" class="btn btn-warning btnEditar">Editar</button>
            <button type="button" class="btn btn-danger btnExcluir">Excluir</button>
          </td>
        </tr>
      `;//adiciona o registro na tabela com os dados do formulario
      $("#tabelaDados tbody").append(novaLinha);
      form.reset();//limpa o formulario
    },
    error: function(erro){
      console.error("Erro ao enviar dados:", erro);
      //se acontecer algum erro na excução do ajax ele mostra essa mensagem
      $("#msg").html("Erro ao enviar os dados. Tente novamente.");
    }
  });
},//coloquei o ajax aqui ele faz o envio e depois adiciona na tabela


    rules: {
      nome: { required: true, maxlength: 25 },
      sobrenome: { required: true },
      email: { required: true, emailvalide: true },
      cpf: { required: true, cpfValido: true },
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
        required: "O campo CPF é obrigatório.",
        cpfValido: "Digite um CPF válido."
      },
      cidade: { required: "Esse campo não pode ser vazio!" },
      estado: { required: "Esse campo não pode ser vazio!" }
    }
  });

  // excluir
  $("#tabelaDados").on("click", ".btnExcluir", function(){
    $(this).closest("tr").remove();
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

  // filtro
  $("#myInput").on("keyup", function(){
    var value = $(this).val().toLowerCase();
    $("#tabelaDados tbody tr").filter(function(){
      var nome = $(this).find("td:eq(1)").text().toLowerCase();
      $(this).toggle(nome.indexOf(value) > -1);
    });
  });

  // validador de e-mail 
  $.validator.addMethod("emailvalide", function (value, element) {
    return this.optional(element) || /^[a-zA-Z0-9._%+-]+@(gmail|hotmail)\.com$/.test(value);
  }, "O e-mail deve ser do tipo @gmail.com ou @hotmail.com");

});
