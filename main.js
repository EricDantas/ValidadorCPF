'use strict'

const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => {
    clearFields()
    document.getElementById('modal').classList.remove('active')
}

//Interação com o layout

const clearFields = () => {
    const fields = document.querySelectorAll('.modal-field')
    fields.forEach(field => field.value = "")
    document.getElementById('cpf').dataset.index = 'new'
}


const validarCPF = (strCPF) => {
    var Soma;
    var Resto;
    Soma = 0;
    if (strCPF == "00000000000") return false;
    
    for (var i = 1; i <= 9; i++) {
        Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
        Resto = (Soma * 10) % 11;
    }
    
    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10))) return false;
    Soma = 0;
    for (var i = 1; i <= 10; i++) {
        Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
        Resto = (Soma * 10) % 11;
    }
    
    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11))) return false;
    return true;
}

const isValidFields = () => {
    return document.getElementById('form').reportValidity()
}

const mostrarResul = () => {
        if (isValidFields()){
        const strCPF = document.getElementById('cpf').value
        if(validarCPF(strCPF)) alert("CPF valido")
        else alert("CPF invalido")
    }
}

//Eventos
document.getElementById('validarCPF')
    .addEventListener('click', openModal)

document.getElementById('validar')
    .addEventListener('click', mostrarResul)

document.getElementById('cancelar')
    .addEventListener('click', closeModal)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)