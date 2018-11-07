/**
 * ComponentService
 * This service create and inventories the different elements of the app
 * It permits to show/hide them on a centralized basis
 */

import initAppData from '../data/initApp.js';
import DataService from '../services/data.service.js';

class _ComponentService {

    mainElement;
    errorElt;
    presentationElt;
    elements = {};

    constructor () {}

    init(mainComp) {
        initAppData(() => {
            this.mainElement = mainComp;

            this.elements.login = document.createElement('div',  {is: 'login-component' });

            this.elements.renting = document.createElement('div',  {is: 'renting-component' });
            this.hide(this.elements.renting);

            this.elements.admin = document.createElement('div',  {is: 'admin-component' });
            this.hide(this.elements.admin);

            this.presentationElt = document.getElementById('presentationElt');
            this.errorElt = document.getElementById('errorElt');
            
            this.mainElement.appendChild(this.elements.login);
            this.mainElement.appendChild(this.elements.renting);
            this.mainElement.appendChild(this.elements.admin);
        });
    }
    
    hide(elt) {
        elt.classList.remove('visible');
        elt.style.display = 'none';
    }
    
    show(elt) {
        elt.style.display = '';
        elt.classList.add('visible');
    }
    
    resetError() {
        this.errorElt.innerHTML = '';
    }

    loggedIn() {
        if (!DataService.adminUser) {
            this.show(this.elements.renting);
        }
        else {
            this.elements.admin.refresh = true;
            this.show(this.elements.admin);
        }
        
        this.hide(this.presentationElt);
    }

    index() {
        DataService.resetUser();
        
        this.resetError();

        this.hide(this.elements.renting);
        this.hide(this.elements.admin);
        this.show(this.presentationElt);
    }

    showError(msg) {
        this.errorElt.innerHTML = msg;
        this.errorElt.classList.add('visible');
    }

    resetError() {
        this.errorElt.innerHTML = '';
        this.errorElt.classList.remove('visible');
    }
}

const ComponentService = new _ComponentService();
export default ComponentService;