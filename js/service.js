"use strict";

function Service() {

   this.checkEmail =  function (email) {                                                 
        let reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return reg.test(email);
    }
    this.checkUser = function(email, password) {                                         
        if(email === localStorage.email && password === localStorage.password) {
            this.print("itsok");
            return true;
        } else {
            this.print("incorrect");
            return false;
        }
    }

        this.showHide = function(elem, action){                                              
            elem.classList.remove("show", "hide");
            elem.classList.add(action);
        }
    this.showHidePass = function(elem, type){                                          
        elem.setAttribute('type', type);
    }
    this.print = function(data) {                                                    
        console.log(data);
    }
};






