document.getElementById('forum-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    // var senha = formData.get('tipo');
    // alert(senha)
    var ok = "";
    requisitar('POST', '/trevo-project/public/api/forum/criarforum', formData, 'formdata')
        .then(result => {
            console.log(result)
            if (result.erro) {
                // console.log('ERRO', result);
                console.error('Erro:', result.erro);
                alert('Ocorreu um erro ao enviar os dados. Tente ss.');
				ok = false;
            } else {
                console.log(result);
                if (result.dados.sucesso) {
                    Swal.fire({
                        icon: "success",
                        title: "Forum Criado!",
                        showConfirmButton: false,
                        timer: 1500,
                        timerProgressBar: true,
                        willClose: () => {
                          window.location.href = "/trevo-project/public/forum"; 
                        }
                      });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Erro ao criar forum.",
                        showConfirmButton: true,
                        confirmButtonColor: '#6F23D9',
                        willClose: () => {
                          window.location.href = "/trevo-project/public/forum"; 
                        }
                      });
                }
            }
            // window.location.reload();
        });
});