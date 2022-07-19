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

function gerarCPF() {
    const num1 = aleatorio(); //aleatorio já devolve string, logo não precisa de toString
  const num2 = aleatorio();
  const num3 = aleatorio();

  const dig1 = dig(num1, num2, num3); //agora só uma função dig
  const dig2 = dig(num1, num2, num3, dig1); //mesma função dig aqui

  //aqui com interpolação de strings fica bem mais legivel
  return alert(`${num1}.${num2}.${num3}-${dig1}${dig2}`);
}

function dig(n1, n2, n3, n4) { 
  
    //as concatenações todas juntas uma vez que são curtas e legíveis
    const nums = n1.split("").concat(n2.split(""), n3.split(""));
    
    if (n4 !== undefined){ //se for o segundo digito coloca o n4 no sitio certo
      nums[9] = n4;
    }
    
    let x = 0;
     
    //o j é também iniciado e incrementado no for para aproveitar a própria sintaxe dele
    //o i tem inicios diferentes consoante é 1º ou 2º digito verificador
    for (let i = (n4 !== undefined ? 11:10), j = 0; i >= 2; i--, j++) {
      x += parseInt(nums[j]) * i;
    }
    
    const y = x % 11;
    //ternário aqui pois ambos os retornos são simples e continua legivel
    return y < 2 ? 0 : 11 - y; 
  }
  
  function aleatorio() {
    const aleat = Math.floor(Math.random() * 999);
   //o preenchimento dos zeros à esquerda é mais facil com a função padStart da string
    return ("" + aleat).padStart(3, '0'); 
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

document.getElementById('gerarCPF')
  .addEventListener('click', gerarCPF)