import { 
    validateNameLength,
    validateEmail,
    validateEdad,
    validatePais,
    validateMultipleOptions
} from './validations.js';

const fieldsValidations = {
    "name": (value) => validateNameLength(value),
    "apellido": (value) => validateNameLength(value),
    "email": (value) => validateEmail(value),
    "edad": (value) => validateEdad(value),
    "pais": (value) => validatePais(value),
    "sexo": () => validateMultipleOptions("sexo"),
    "intereses": () => validateMultipleOptions("intereses")
}

const createLabel = (e, message) => {
    let label = document.getElementById(`lbl${e.id}`);
    label.innerHTML = message;
    label.classList.add("visible");
    if(e.classList)
        e.classList.add("error");
}

const removeLabel = (e) => {
    let element = document.getElementById(e.target.id);
    element.classList.remove("error");

    let label = document.getElementById(`lbl${e.target.id}`);
    label.classList.remove("visible");
}

const removeLabelOptions = (e) => {
    let label = document.getElementById(`lbl${e.target.name}`);
    label.classList.remove("visible");
}

const validations = (e) => {
    let alertValue = fieldsValidations[e.id](e.value);
    if(alertValue) 
        createLabel(e, alertValue);
}

const validationsListener = (e) => {
    validations(e.target);
}

const validateAll = () => {
    let inputs = document.querySelectorAll("input[type=text]");
    inputs.forEach(x => validations(x));

    let selectPais = document.getElementById("pais");
    validations(selectPais);
    validations({ id: "sexo"});
    validations({ id: "intereses"});
}

const submit = (e) => {
    e.preventDefault();
    validateAll();
    if(document.getElementsByClassName("error").length > 0){
        return;
    }

    document.getElementById("modal").style.display = "flex";
}

window.onload = () => {
    document.getElementById("submitBtn").addEventListener("click", submit);
    let inputs = document.querySelectorAll("input[type=text]");
    inputs.forEach(x => x.addEventListener("blur", validationsListener));
    inputs.forEach(x => x.addEventListener("focus", removeLabel));

    let radioInputs = document.getElementsByName("sexo");
    radioInputs.forEach(x => x.addEventListener("click", removeLabelOptions));

    let checkboxInputs = document.getElementsByName("intereses");
    checkboxInputs.forEach(x => x.addEventListener("click", removeLabelOptions));

    document.getElementById("pais").addEventListener("focus", removeLabel);

    document.getElementById("close").addEventListener("click", () => {
        document.getElementById("modal").style.display = "none";
    })
}