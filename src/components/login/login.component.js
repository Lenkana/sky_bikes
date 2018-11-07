/**
 * LoginComponent
 * Here you'll find the header and the login/signin form
 */

import DataService from '../../services/data.service.js';
import ComponentService from '../../services/component.service.js';
import './login.scss';

export default class LoginComponent extends HTMLDivElement {
    
    //properties
    loginElt;
    logoutElt;
    createAccountElt;
    loggedAsElt;
    usernameElt;

    constructor() {
        super();
        
        this.innerHTML = `
        <header class="row">
            <h1><i class="fas fa-bicycle"></i>SkyBikes</h1>
            
            <div id="login-content" class="login-ctn">
                <form id="loginElt">
                    <div class="form-row">
                        <input type="text" id="usernameElt" class="form-control col">
                        <button id="loginBtn" type="button" class="btn btn-outline-light"><i class="fas fa-sign-in-alt"></i></button><br />
                        </div>
                    <span id="createAccountBtn">Create your account</span>
                </form>
                
                <div id="logoutElt" style="display: none;">
                    <span id="loggedAsElt"></span>
                    <button id="logoutBtn" type="button" class="btn btn-outline-light"><i class="fas fa-sign-out-alt"></i></button>
                </div>
                
                <form style="display: none;" id="createAccountElt" name="createAccountForm" class="form-group">
                    <button id="createAccountCloseBtn" type="button" class="close" aria-label="Close" onclick="closeForm">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <input required type="text" placeholder="First Name" name="firstname" class="form-control">
                    <input required type="text" placeholder="Last Name" name="lastname" class="form-control">
                    <input required type="text" placeholder="Phone number" name="phonenumber" class="form-control">
                    <input required type="email" placeholder="E-mail address" name="email" class="form-control">
                    <button id="createAccountSubmit" type="button" class="btn btn-primary">Create</button>
                </form>
            </div>
        </header>
        `;
    }
    
    connectedCallback() {
        this.loginElt = document.getElementById('loginElt');
        this.logoutElt = document.getElementById('logoutElt');
        this.createAccountElt = document.getElementById('createAccountElt');
        this.loggedAsElt = document.getElementById('loggedAsElt');
        this.usernameElt = document.getElementById('usernameElt');
        this.createAccountCloseBtn = document.getElementById('createAccountCloseBtn');
        
        document.getElementById('loginBtn').onclick = e => this.login();
        document.getElementById('logoutBtn').onclick = e => this.logout();
        document.getElementById('createAccountBtn').onclick = e => this.createAccount();
        document.getElementById('createAccountSubmit').onclick = e => this.validateAccount(e);
        document.getElementById('createAccountCloseBtn').onclick = e => this.closeForm();
        
        if (DataService.user || DataService.adminUser) {
            this.proceedLogin();
        }
    }
    
    checkAccountExistence () {
        ComponentService.resetError()
        
        let idx = DataService.accounts.find(a => a.email === document.getElementsByName('email')[0].value);
        
        if (idx) {
            ComponentService.showError('An account with this e-mail address already exists.');
            return;
        }
        
        this.addAccount();
    }
    
    addAccount () {
        const inputs = Array.from(createAccountElt.elements);
        let newAcc = {};
        
        inputs.forEach(elt => {
            if(newAcc && elt.nodeName === 'INPUT') {
                if (elt.value) {
                    newAcc[elt.name] = elt.value;
                } else {
                    ComponentService.showError(`The field ${elt.placeholder.toLowerCase()} is missing`);
                    newAcc = null;
                    return;
                }
            }
        });
        
        if (newAcc) {
            DataService.addAccount(newAcc);
            this.proceedLogin(newAcc);
        }
    }
    
    createAccount () {
        this.createAccountElt.className = 'visible';
        ComponentService.show(this.createAccountElt);
    }
    
    validateAccount (evt) {
        evt.preventDefault();
        this.checkAccountExistence();
    }
    
    login () {
        ComponentService.resetError()

        if (this.usernameElt.value.trim() === 'admin') {
            DataService.setAdmin();
            this.proceedLogin();
            return;
        }
        
        if (this.usernameElt.value.trim() === '' || !this.usernameElt.value) {
            ComponentService.showError('No e-mail address provided...');
            return;
        }
        
        DataService.user = DataService.accounts.find(a => a.email === this.usernameElt.value);
        
        if (!DataService.user) {
            ComponentService.showError('The e-mail address is not registered');
            return;
        }
        
        this.proceedLogin();
    }
    
    proceedLogin () {
        let name;

        if (DataService.adminUser) {
            DataService.setAdmin();
            name = 'admin';
        } else {
            name = `${DataService.user.firstname} ${DataService.user.lastname}`
        }

        this.loggedAsElt.innerHTML = `Welcome ${name}`;
        this.resetForms();
    }
    
    resetForms () {
        ComponentService.hide(this.loginElt);
        ComponentService.hide(this.createAccountElt);
        ComponentService.show(this.logoutElt);
        
        const inputs = Array.from(createAccountElt.elements);
        inputs.forEach(elt => {
            if(elt.nodeName === 'INPUT') {
                elt.value = null;
            }
        });
        
        this.usernameElt.value = null;
        
        ComponentService.resetError()
        ComponentService.loggedIn();
    }
    
    logout () {
        ComponentService.hide(this.logoutElt);
        ComponentService.show(this.loginElt);
        ComponentService.index();
    }

    closeForm() {
        ComponentService.hide(this.createAccountElt);
    }
}

customElements.define('login-component', LoginComponent, { extends: "div" });
