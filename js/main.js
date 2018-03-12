"use strict";

function Validator(data) {

    const DOMElements = {
        email : document.querySelector("#inputEmail"),
        password : document.querySelector("#inputPassword"),
        submitBtn : document.querySelector("#submitBtn"),
        alertMsg : document.querySelector("#alert-massage1"),
        personPage : document.querySelector("#persone"),
        form : document.querySelector("#myForm"),
        backBtn : document.querySelector("#reload"),
        togglePasswordBtn : document.querySelector("#eye"),
        personNameField : document.querySelector("#person-email"),
        personPasswordField : document.querySelector("#person-password")
        }; 
    let showPassStatus = 0;


    
    function togglePasswordOutput(){
        if(showPassStatus === 0){
            showPassStatus = 1;
            service.showHidePass(DOMElements.personPasswordField , "text");
            DOMElements.togglePasswordBtn.innerText = "Скрыть пароль";
        } else {
            showPassStatus = 0;
            service.showHidePass(DOMElements.personPasswordField , "password");
            DOMElements.togglePasswordBtn.innerText = "Показать пароль";
        }
    }
    
    function initValidation(event){
        if(event.keyCode == 13) {
            validate();
        }
    }

    function fillInputs(inp , pass){
        DOMElements.personNameField.value = inp;    //в продублированные поля копируем значения из инпутов 
        DOMElements.personPasswordField.value = pass;
    }
    function validate() {
        let validEmail = DOMElements.email.value,
        validPassword = DOMElements.password.value;
        if(validEmail && validPassword &&            
            service.checkEmail(validEmail) &&                            
            service.checkUser(validEmail, validPassword)){ 
                service.showHide(DOMElements.personPage,"show");
                service.showHide(DOMElements.form , "hide");
                service.showHide(DOMElements.alertMsg , "hide");
                fillInputs(validEmail , validPassword);
                service.print("success");
		} else {
            service.showHide(DOMElements.alertMsg,"show");
		}
		//event.preventDefault();
    }
    function goBack() {
        service.showHide(DOMElements.personPage,"hide");
        service.showHide(DOMElements.form,"show");
        DOMElements.email.value = "";
        DOMElements.password.value = "";
    }
    
    function initTooltips(){
        $('[data-toggle="tooltip"]').tooltip(); 
    }

    function initListeners() {
        DOMElements.form.addEventListener("keypress", initValidation.bind(this));
        DOMElements.submitBtn.addEventListener("click", validate.bind(this));	
        DOMElements.backBtn.addEventListener("click", goBack.bind(this));	
        DOMElements.togglePasswordBtn.addEventListener("click", togglePasswordOutput.bind(this));
        document.addEventListener("load",initTooltips.bind(this));
    }

//************************PUBLIC_METHODS**************************

    this.setLogAndPass = function(obj) {
        
        if((typeof obj == "object") &&  obj["email"] && obj["password"]){
            localStorage.email = obj.email;
            localStorage.password = obj.password;
        }else {
            console.log("Local storage : incorrect data")
        }
    }
    this.initComponent = function() {     
        initListeners();
        initTooltips();
    }
};

let service = new Service();
let validator = new Validator();


validator.setLogAndPass({email:"ddd@gmail.com", password:"12345"});
validator.initComponent();


console.log(validator.showPassStatus);  //проверка
console.log(validator.DOMElements);  //проверка
console.log(Validator.showPassStatus); //проверка



//         DOMElements.form.addEventListener("keypress", initValidation.bind(this));

/*
this.setLogAndPass = function(obj) {
        
        if((typeof obj == "object") &&  obj["email"] && obj["password"]){
            localStorage.email = obj.email;
            localStorage.password = obj.password;
        }else {
            console.log("Local storage : incorrect data")
        }
    }
*/

// так и не понял как подключать иконки бутстрап и скрипты jquery внедрять в модуль  -


// попробовать вынести в файл сервис часть программы          +

//доделать верстку                                            +
//кнопка вернутся не релоадит а прячет и показывает блоки     +
// кнопка показать пароль - на странице с табличкой           +
// кнопку отобр пароля разместить сбоку                       +
//добавить блоки ссо смысловым отображением ошибки            -(нет смысла)








/*

"use strict";

function Validator(data) {
   
    let DOMElements = data; 
    let showPassStatus = 0;
    
    function checkEmail(email) {                                                 // to servise
        let reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return reg.test(email);
    }
    function checkUser(email, password) {                                         // to servise
        if(email === localStorage.email && password === localStorage.password) {
            print("itsok");
            return true;
        } else {
            print("incorrect");
            return false;
        }
    }
    function showHide(elem, action){                                              // to servise
        elem.classList.remove("show");
        elem.classList.remove("hide");
        elem.classList.add(action);
    }
    function showHidePass(elem, type){                                           // to servise
        elem.setAttribute('type', type);
    }
    function print (data) {                                                     // to servise
        console.log(data);
    }
    function togglePasswordOutput(event){
        if(showPassStatus === 0){
            showPassStatus = 1;
            showHidePass(DOMElements.personPasswordField , "text");
            DOMElements.togglePasswordBtn.innerText = "Скрыть пароль";
        } else {
            showPassStatus = 0;
            showHidePass(DOMElements.personPasswordField , "password");
            DOMElements.togglePasswordBtn.innerText = "Показать пароль";
        }
    }
    function validate() {
        if(DOMElements.email.value && DOMElements.password.value &&            //check if fields are filled 
            checkEmail(DOMElements.email.value) &&                            //check login format
            checkUser(DOMElements.email.value, DOMElements.password.value)){ //check corresponding to data in base
                showHide(DOMElements.personPage,"show");
                showHide(DOMElements.form , "hide");
                showHide(DOMElements.alertMsg , "hide");
                DOMElements.personNameField.value = DOMElements.email.value;    //в продублированные поля копируем значения из инпутов 
                DOMElements.personPasswordField.value = DOMElements.password.value;
                print("success");
		} else {
				showHide(DOMElements.alertMsg,"show");
		}
		event.preventDefault();
    }
    function goBack() {
        showHide(DOMElements.personPage,"hide");
        showHide(DOMElements.form,"show");
        DOMElements.email.value = null;
        DOMElements.password.value = null;
    }

    function initListeners() {
        DOMElements.submitBtn.addEventListener("click", validate.bind(this));	
        DOMElements.backBtn.addEventListener("click", goBack.bind(this));	
        DOMElements.togglePasswordBtn.addEventListener("click", togglePasswordOutput.bind(this));
    }

//************************PUBLIC_METHODS**************************

    this.setLogAndPass = function(obj) {
        localStorage.email = obj.email;
        localStorage.password = obj.password;
    }
    this.initComponent = function() {     
        initListeners();
    }
                                        
};

let validator = new Validator({
    email:document.querySelector("#inputEmail"),
    password:document.querySelector("#inputPassword"),
    submitBtn:document.querySelector("#submitBtn"),
    alertMsg:document.querySelector("#alert-massage1"),
    personPage:document.querySelector("#persone"),
    form:document.querySelector("#myForm"),
    main: document.querySelector("#main"),
    backBtn:document.querySelector("#reload"),
    togglePasswordBtn: document.querySelector("#eye"),
    personNameField:document.querySelector("#person-email"),
    personPasswordField:document.querySelector("#person-password")
    });

validator.setLogAndPass({email:"ddd@gmail.com", password:"12345"});
validator.initComponent();

console.log(validator.showPassStatus);  //проверка
console.log(validator.DOMElements);  //проверка
console.log(Validator.showPassStatus); //проверка


*/

