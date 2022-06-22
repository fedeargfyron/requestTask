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

const validations = (e, values) => {
    let alertValue = fieldsValidations[e.id](e.value);
    if(alertValue) 
        createLabel(e, alertValue);
    
    if(values){
        values[e.id] = e.value;
    }
}

const validationsListener = (e) => {
    validations(e.target);
}

const validateAll = (makeRequest) => {
    let values = {};
    let inputs = document.querySelectorAll("input[type=text]");
    inputs.forEach(x => validations(x, values));
    let selectPais = document.getElementById("pais");
    validations(selectPais, values);
    validations({ id: "sexo"});
    validations({ id: "intereses"});

    if(document.getElementsByClassName("error").length > 0){
        return;
    }
    makeRequest(values);
}

const makeRequest = (values) => {
    const httpRequest = new XMLHttpRequest();
    let parameters = Object.keys(values).map(key => `${key}=${values[key]}`).join('&');
    
    const url = `http://curso-dev-2021.herokuapp.com/newsletter?${parameters}`;
    httpRequest.open("GET", url);
    httpRequest.send();
    httpRequest.onreadystatechange = () => {
        if(httpRequest.readyState === XMLHttpRequest.DONE && httpRequest.status === 200){
            document.getElementById("modal-body").innerHTML = httpRequest.responseText;
            document.getElementById("modal").style.display = "flex";
        }
    }
}

const submit = (e) => {
    e.preventDefault();
    validateAll(makeRequest);
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