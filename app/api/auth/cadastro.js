document.getElementById('cadastro-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    var nome = formData.get('nome');
    var email = formData.get('email');
    var data_nasc = formData.get('data_nasc');
    var contato = formData.get('contato');
    var senha = formData.get('senha');
    var senha_confirmation = formData.get('senha_confirmation');
    // alert(email)
    if (!email || !senha){
        alert('Por favor, preencha t os campos!');
        return;
    } 

    if (senha != senha_confirmation) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Senhas imcompatíveis!",
          });
        return;
    }
    
    var ok = "";
    // Faz a requisição POST com os dados capturados do formulário
    requisitar('POST', '/trevo-project/public/api/cadastro', formData, 'formdata')
        .then(result => {
            console.log(result)
            if (result.erro) {
                console.log('ERRO', result);
                console.error('Erro:', result.erro);
                alert('Ocorreu um erro ao enviar os dados. Tente .');
				ok = false;
            } else {
                console.log(result);
                if (result.dados.sucesso) {
                    Swal.fire({
                        icon: "success",
                        title: "Cadastro realizado!",
                        showConfirmButton: false,
                        timer: 1500,
                        timerProgressBar: true,
                        willClose: () => {
                          window.location.href = "/trevo-project/views/login"; // URL desejada para redirecionamento
                        }
                      });
                } else {
                    alert(result.dados.message);
                }
            }
            // window.location.reload();
        });
});