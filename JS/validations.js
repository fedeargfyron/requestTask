const validateNameLength = (value) => value.length < 3 && "Debe tener al menos 3 letras";

const validateEmail = (value) => {
    let regex =  /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
    return !value.match(regex) && "Debe tener un formato de email válido.";
}

const validateEdad = (value) => {
    if(isNaN(value) || 1 > value || value > 99){
        return "Debe ser un número mayor a 0 y menor a 100";
    }
}

const validateMultipleOptions = (name) => {

    let inputs = Array.from(document.getElementsByName(name));
    
    if(!inputs.some(x => x.checked)){
        return `Debe tener al menos un casillero de ${name} seleccionado.`;
    }
}

const validatePais = (value) => !value && "Debe seleccionar un pais valido."

export { 
    validateNameLength,
    validateEmail,
    validateEdad,
    validateMultipleOptions,
    validatePais
}