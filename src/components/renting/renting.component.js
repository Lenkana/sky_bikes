/**
 * RentingComponent
 * This component displays all the stations for the city
 * When the user is renting a bike, a timer is displayed
 * When the time is over, the user is automatically banned 
 * and their bike parked to the first free place in the stations.
 */

import DataService from '../../services/data.service.js';
import ComponentService from '../../services/component.service.js';
import ManagementService from '../../services/management.service.js';
import './renting.scss';

export default class RentingComponent extends HTMLDivElement {

    // elements
    allStationsElt;
    rentingTimer;
    
    // data
    user;
    stations;
    bikes;
    
    timer;
    reorganizeBikesEvt;
    
    constructor() {
        super();
        
        this.innerHTML = `
        <div id="rentingElt" class="renting-ctn">
            <div id="rentingTimer" class="alert alert-primary" role="alert"></div>

            <div id="allStationsElt" class="row"></div>
        </div>
        `;

        this.addEventListener('bikeMovedEvt', this.organizeStations);
    }
    
    connectedCallback() {
        this.allStationsElt = document.getElementById('allStationsElt');
        this.rentingTimer = document.getElementById('rentingTimer');
        
        this.organizeStations();
    }
    
    organizeStations() {
        this.allStationsElt.innerHTML = null;
        
        DataService.stations.forEach(s => {
            let stationCmp = document.createElement('div', {is: 'station-component'});
            stationCmp.id = s.id;
            
            this.allStationsElt.appendChild(stationCmp);
        });
        
        if (DataService.user) {
            if (DataService.user.rentingEnd) {
                this.getRemainingRentingTime();
            } else if (this.timer) {
                clearInterval(this.timer);
                this.timer = null;
                this.rentingTimer.classList.remove('visible');
            }
            
            if (DataService.user.banned)  {
                ComponentService.hide(this.allStationsElt)
                ComponentService.showError('You have been banned from this service. You are not allowed to rent a bike.');
            }
        }
    }
    
    getRemainingRentingTime() {
        if (DataService.user.rentingEnd && !this.timer) {
            let end = new Date(DataService.user.rentingEnd);
            
            this.timer = setInterval(() => {
                if (end < Date.now()) {
                    this.banUser();
                    return;
                }

                let {hours, minutes, seconds} = ManagementService.formatRemainingTime(end);
                this.rentingTimer.innerHTML = `Remaining time: ${hours}:${minutes}:${seconds}`;
            }, 1000);

            this.rentingTimer.classList.add('visible');
        }
    }

    banUser() {
        clearInterval(this.timer);
        ComponentService.hide(this.allStationsElt);
        ComponentService.showError('You have been banned from this service. You are not allowed to rent a bike.');
        
        ManagementService.banUser();
    }
}

customElements.define('renting-component', RentingComponent, { extends: "div" });
