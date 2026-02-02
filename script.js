document.addEventListener("DOMContentLoaded", function () {

    const resultados = document.getElementById("resultados");
    const botaoSalvar = document.getElementById("botaoSalvar");
    const mensagem = document.getElementById("mensagem");
    let listaDeTarefas = [];



    function salvarDados() {
        let entrada = document.getElementById("entrada").value.trim();

        if (entrada === "") {
            mensagem.textContent = "";
            mensagem.style.display = "none";
            return;
        }

        if (listaDeTarefas.some(
            tarefa => tarefa.toLowerCase() === entrada.toLowerCase()
        )) {
            mensagem.textContent = "Essa tarefa já existe!";
            mensagem.style.display = "block";
            return;
        }

        listaDeTarefas.push(entrada);
        salvarNoStorage();
        mostrarDados();

        mensagem.textContent = "";
        mensagem.style.display = "none";
        document.getElementById("entrada").value = "";
    }

    botaoSalvar.addEventListener("click", salvarDados);

    function mostrarDados() {
        resultados.innerHTML = "";

        listaDeTarefas.forEach(tarefa => {
            const p = document.createElement("p");
            p.textContent = tarefa;

            const botao = document.createElement("button");
            botao.textContent = "Excluir";

            botao.addEventListener("click", function () {
                listaDeTarefas = listaDeTarefas.filter(t => t !== tarefa);
                salvarNoStorage();
                p.remove();
            });

            p.appendChild(botao);
            resultados.appendChild(p);
        });
    }

    function salvarNoStorage() {
        localStorage.setItem("tarefas", JSON.stringify(listaDeTarefas));
    }

    function carregarDoStorage() {
        const dados = localStorage.getItem("tarefas");
        if (dados) {
            listaDeTarefas = JSON.parse(dados);
            mostrarDados();
        }
    }

    carregarDoStorage();
});
