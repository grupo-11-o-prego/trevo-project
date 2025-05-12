document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    var email = formData.get('email');
    var senha = formData.get('senha');
    // alert(email)

    var ok = "";
    
    requisitar('POST', '/trevo-project/public/api/login', formData, 'formdata') 
        .then(result => {
            if (result.erro) {
                console.log(result);
                console.error('Erro:', result.erro);
                alert('Ocorreu um erro ao enviar os dados. Tente novamente.');
				ok = false;
            } else {
                console.log(result);
                if (result.dados.sucesso) {
                    Swal.fire({
                        icon: "success",
                        title: "Login feito com sucesso!",
                        showConfirmButton: false,
                        timer: 1100,
                        timerProgressBar: true,
                        willClose: () => {
                          window.location.href = "/trevo-project/public"; // URL desejada para redirecionamento
                        }
                      });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Dados Inválidos!",
                        showConfirmButton: false,
                        timer: 1100,
                        timerProgressBar: true,
                        // willClose: () => {
                        //   window.location.href = "/trevo-project/public"; // URL desejada para redirecionamento
                        // }
                      });
                }
            }
            // window.location.reload();
        });
});