// document.addEventListener("DOMContentLoaded", function () {
//   async function carregarAnuncio() {
//     const anuncioId = obterIdDaURL();

//     try {
//       const resultadoAnuncio = await requisitar(
//         "GET",
//         `/trevo-project/public/api/anuncio/${anuncioId}`,
//         null,
//         "json"
//       );

//       if (resultadoAnuncio.erro) {
//         mostrarErro("Não foi possível carregar os dados do anúncio");
//         return;
//       }

//       const resultadoUsuario = await requisitar(
//         "GET",
//         `/trevo-project/public/api/usuario/${resultadoAnuncio.dados.anun_user_id}`,
//         null,
//         "json"
//       );

//       if (resultadoUsuario.erro) {
//         console.error(
//           "Erro ao carregar dados do vendedor:",
//           resultadoUsuario.erro
//         );
//         resultadoUsuario.dados = { user_nome: "Vendedor não encontrado" };
//       }

//       let imagens = [];
//       try {
//         const resultadoImagens = await requisitar(
//           "GET",
//           `/trevo-project/public/api/anuncio/${anuncioId}/imagens`,
//           null,
//           "json"
//         );
//         imagens = resultadoImagens.dados || [];
//       } catch (error) {
//         console.error("Erro ao carregar imagens:", error);
//       }

//       preencherDadosAnuncio({
//         ...resultadoAnuncio.dados,
//         usuario: resultadoUsuario.dados,
//         imagens: imagens,
//       });
//     } catch (error) {
//       console.error("Erro na requisição:", error);
//       mostrarErro("Erro ao conectar com o servidor");
//     }
//   }

//   function preencherDadosAnuncio(anuncio) {
//     document.getElementById("anuncio-titulo").textContent =
//       anuncio.anun_titulo || "Sem título";
//     document.getElementById("anuncio-vendedor").textContent =
//       anuncio.usuario?.user_nome || "Anônimo";
//     document.getElementById("anuncio-preco").textContent = anuncio.anun_preco
//       ? `R$ ${anuncio.anun_preco.toFixed(2).replace(".", ",")}`
//       : "Preço não informado";
//     document.getElementById("anuncio-descricao").textContent =
//       anuncio.anun_descricao || "Sem descrição";

//     const imgPrincipal = document.getElementById("anuncio-imagem");
//     if (anuncio.imagens.length > 0) {
//       imgPrincipal.src = `/trevo-project/public/uploads/${anuncio.imagens[0].img_nome}`;
//       imgPrincipal.alt = `Capa do livro ${anuncio.anun_titulo}`;
//     }

//     const estadoElement = document.createElement("div");
//     estadoElement.className = "mt-2 text-sm text-gray-600";
//     estadoElement.innerHTML = `<span class="font-medium">Estado:</span> ${
//       anuncio.anun_estado || "Não informado"
//     }`;
//     document.getElementById("anuncio-descricao").after(estadoElement);
//   }

//   function obterIdDaURL() {
//     const path = window.location.pathname.split("/");
//     return path[path.length - 1];
//   }

//   function mostrarErro(mensagem) {
//     Swal.fire({
//       icon: "error",
//       title: "Erro",
//       text: mensagem,
//       confirmButtonColor: "#6F23D9",
//     });
//   }

//   document
//     .getElementById("botao-comprar")
//     .addEventListener("click", async function () {
//       const anuncioId = obterIdDaURL();

//       Swal.fire({
//         title: "Confirmar compra?",
//         html: `Deseja comprar <strong>"${
//           document.getElementById("anuncio-titulo").textContent
//         }"</strong> por 
//                   <strong>${
//                     document.getElementById("anuncio-preco").textContent
//                   }</strong>?`,
//         icon: "question",
//         showCancelButton: true,
//         confirmButtonColor: "#6F23D9",
//         cancelButtonColor: "#d33",
//         confirmButtonText: "Sim, comprar!",
//         cancelButtonText: "Cancelar",
//       }).then(async (result) => {
//         if (result.isConfirmed) {
//           try {
//             const resultado = await requisitar(
//               "POST",
//               "/trevo-project/public/api/comprar",
//               {
//                 anuncio_id: anuncioId,
//                 preco:
//                   document
//                     .getElementById("anuncio-preco")
//                     .textContent.replace(/\D/g, "") / 100,
//               },
//               "json"
//             );

//             if (resultado.erro) {
//               mostrarErro(resultado.erro);
//               return;
//             }

//             if (resultado.dados.sucesso) {
//               Swal.fire({
//                 icon: "success",
//                 title: "Compra realizada!",
//                 html: `Você comprou <strong>${
//                   document.getElementById("anuncio-titulo").textContent
//                 }</strong><br>
//                                   O vendedor será notificado para entrar em contato.`,
//                 confirmButtonColor: "#6F23D9",
//               });
//             } else {
//               mostrarErro(
//                 resultado.dados.mensagem || "Erro ao processar compra"
//               );
//             }
//           } catch (error) {
//             console.error("Erro na compra:", error);
//             mostrarErro("Erro ao conectar com o servidor");
//           }
//         }
//       });
//     });

//   carregarAnuncio();
// });

// async function requisitar(metodo, url, dados, tipo) {
//   const opcoes = {
//     method: metodo,
//     headers: {},
//   };

//   if (dados) {
//     if (tipo === "formdata") {
//       opcoes.body = dados;
//     } else {
//       opcoes.headers["Content-Type"] = "application/json";
//       opcoes.body = JSON.stringify(dados);
//     }
//   }

//   try {
//     const resposta = await fetch(url, opcoes);
//     const resultado = await resposta.json();

//     if (!resposta.ok) {
//       return { erro: resultado.mensagem || "Erro na requisição" };
//     }

//     return resultado;
//   } catch (error) {
//     return { erro: error.message };
//   }
// }
