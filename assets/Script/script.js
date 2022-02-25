const tarefaNova = document.querySelector(".input-nova-tarefa");
const btnAdicionar = document.querySelector(".btn-adcTarefa");
const tarefasLista = document.querySelector(".tarefas")

function adcElementos(tarefaNova) {
    
    let li = document.createElement('li');
    tarefasLista.appendChild(li);
    li.innerHTML = tarefaNova;
    limpaInput();
    botaoApagar(li);
    salvarTarefa();
}

btnAdicionar.addEventListener(`click`, function(){
    if (!tarefaNova.value) return;
    adcElementos(tarefaNova.value);
})

function botaoApagar(li){

    li.innerHTML += ` `
    const botao = document.createElement(`button`);
    botao.innerText = "Apagar";
    botao.setAttribute(`class`, `apagar`)
    li.appendChild(botao);
}

function limpaInput(){
    tarefaNova.value = ""
    tarefaNova.focus();  
}

document.addEventListener(`click`, function(e){
    const el = e.target;
    if(el.classList.contains(`apagar`)){
        el.parentElement.remove();
        salvarTarefa();
    };
});

function salvarTarefa(){
    const liTarefas = tarefasLista.querySelectorAll(`li`);
    let listaTarefas = [];

    for(let tare of liTarefas){
        let tarefaTexto = tare.innerText;
        tarefaTexto = tarefaTexto.replace(`Apagar`, ` `);
        console.log(tarefaTexto);
        listaTarefas.push(tarefaTexto);
    };

    const tarefaJSON = JSON.stringify(listaTarefas);
    localStorage.setItem(`tarefasLista`, tarefaJSON)
};

function adcTarefasSalvas(){
    const tarefasLista = localStorage.getItem(`tarefasLista`);
    const listaTarefas = JSON.parse(tarefasLista)
    for(let tare of listaTarefas){
        adcElementos(tare);
    }
}
adcTarefasSalvas();

tarefaNova.addEventListener(`keypress`, function(e){
    if(e.keyCode === 13){
        adcElementos();
    }
});

