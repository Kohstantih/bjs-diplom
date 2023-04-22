"use strict";

const userForm = new UserForm();
userForm.loginFormCallback = funcLogin;

function funcLogin(data) {     
    ApiConnector.login(data, response => {
        if(response.success === true) {
        return location.reload();
        };
        this.setLoginErrorMessage(response.error);
    });
};

userForm.registerFormCallback = funcRegister;

function funcRegister(data) {     
    ApiConnector.register(data, response => {
        if(response.success === true) {
        return location.reload();
        };
        this.setRegisterErrorMessage(response.error);
    });
};