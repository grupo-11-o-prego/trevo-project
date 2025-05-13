function handleSubmitModoVendedor() {
    const form = document.getElementById("modo-vendedor-form");
    
    const formData = new FormData(form);
    var cpf = formData.get('cpf');
    
    var ok = "";
    requisitar('POST', '/trevo-project/public/api/user/modovendedor', formData, 'formdata')
        .then(result => {
            console.log(result)
            if (result.erro) {
                console.log('ERRO', result);
                console.error('Erro:', result.erro);
                alert('Ocorreu um erro ao enviar os dados. Tente a.');
                ok = false;
            } else {
                console.log(result);
                if (result.dados.sucesso) {
                    Swal.fire({
                        icon: "success",
                        title: "Modo vendedor ativado!",
                        showConfirmButton: false,
                        timer: 1500,
                        timerProgressBar: true,
                         willClose: () => {
                           window.location.href = "/trevo-project/public/perfil"; // URL desejada para redirecionamento
                        }
                      });
                } else {
                    alert(result.dados.message);
                }
            }
            // window.location.reload();
        });
}