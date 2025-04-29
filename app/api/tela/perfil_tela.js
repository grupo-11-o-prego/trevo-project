window.onload = async function () {
    if (document.getElementById('posts-container')) {
      await requisitar('GET', 'api/perfil')
        .then(result => {
          if (result.erro) {
            console.error('Erro:', result.erro);
            alert('Ocorreu um erro ao buscar o perfil. Tente novamente.');
          } else {
            const container = document.getElementById('posts-container');
            console.log(result.dados);
  
            if (result.dados.user && result.dados.user.sucesso && result.dados.user.result) {
              result.dados.user.result.forEach(post => {
                // Aqui adicionamos a condição para mostrar só o usuário "theo"
                
                const card = document.createElement('div');
                card.className = 'max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-md mb-6';

                const infoDiv = document.createElement('div');
                infoDiv.className = 'flex items-center gap-6 mb-6';

                const imagem = document.createElement('img');
                imagem.className = 'w-24 h-24 rounded-full object-cover border-4 border-purple-500';
                imagem.alt = 'Foto do usuário';
                // imagem.src = post.user_img_id || '../views/assets/img/user-default.png';

                const dadosDiv = document.createElement('div');

                const nome = document.createElement('h2');
                nome.className = 'text-2xl font-bold';
                nome.textContent = post.user_nome; // continua mostrando o nome real do "theo"

                const email = document.createElement('p');
                email.className = 'text-gray-600';
                email.textContent = post.user_email || 'E-mail não informado';

                const telefone = document.createElement('p');
                telefone.className = 'text-gray-600';
                telefone.textContent = post.user_contato || 'Telefone não informado';

                const dataNascimento = document.createElement('p');
                dataNascimento.className = 'text-gray-600';
                dataNascimento.textContent = post.user_data_nasc || 'Data de nascimento não informada';

                dadosDiv.appendChild(nome);
                dadosDiv.appendChild(email);
                dadosDiv.appendChild(telefone);
                dadosDiv.appendChild(dataNascimento);

                infoDiv.appendChild(imagem);
                infoDiv.appendChild(dadosDiv);

                const botoesDiv = document.createElement('div');
                botoesDiv.className = 'flex justify-end';

                const editarBtn = document.createElement('button');
                editarBtn.className = 'bg-[#6F23D9] hover:bg-[#4f179c] cursor-pointer text-white font-semibold px-6 py-2 rounded-lg transition duration-300';
                editarBtn.textContent = 'Editar Perfil';

                botoesDiv.appendChild(editarBtn);

                card.appendChild(infoDiv);
                card.appendChild(botoesDiv);

                container.appendChild(card);
                
                // Caso contrário, não cria o card para outros usuários
              });
            } else {
              console.error("Erro: Não há dados de anúncios disponíveis.");
            }
          }
        });
    }
  }
  