/**
 * StationComponent
 * Each station is represented with this component. 
 * It displays the available bikes and give the user the possibility
 * to rent or park their bike
 */

import DataService from '../../services/data.service.js';
import ManagementService from '../../services/management.service.js';
import './station.scss';

export default class StationComponent extends HTMLDivElement {
    stationData;
    bikeMovedEvt;
    
    constructor() {
        super();

        this.innerHTML = `
        <div class="bike-list">
            <h3>
                <i class="fas fa-map-marker-alt"></i>
                <span class="station-name"></span>
            </h3>
            <div class="bikes"></div>
        </div>
        `;
    }
    
    connectedCallback() {
        this.stationData = DataService.stations.find(s => s.id === this.id);
        
        this.className = 'station-ctn col col-12 col-sm-6 col-md-4';
        this.getElementsByClassName('station-name')[0].innerHTML = `Station ${this.stationData.name}`;

        this.bikeMovedEvt = new CustomEvent('bikeMovedEvt', {
            bubbles: true
        });
        this.addEventListener('reorganizeBikesEvt', this.reorganizeBikes);

        this.reorganizeBikes();
    }
    
    reorganizeBikes() {
        this.getElementsByClassName('bikes')[0].innerHTML = '';

        this.stationData.slots.forEach((slot, index) => {
            if (slot !== null) {
                this.addBikeInSlot(slot);
            } else {
                this.addFreeSlot(index);
            }
        });
    }
    
    addBikeInSlot(slot) {
        const bike = DataService.bikes.find(b => b.id === slot);
        let bikeElt = document.createElement('div');
        bikeElt.id = bike.id;
        bikeElt.innerHTML = `<i class="fas fa-bicycle fa-lg"></i> `;
        
        if (DataService.user && DataService.user.bikeId) {
            bikeElt.className = `bike-btn no-bike`;
            bikeElt.innerHTML += `<span>Slot unavalaible<span>`;
        } else {
            bikeElt.className = `bike-btn bike-${bike.color}`;
            bikeElt.innerHTML += `<span>Rent this bike!<span>`;
            
            bikeElt.onclick = e => this.rentThisBike(bike, this.id);
        }
        
        this.getElementsByTagName('div')[0].appendChild(bikeElt);
    }
    
    addFreeSlot(index) {
        let noBike = document.createElement('div');
        
        if (DataService.user && DataService.user.bikeId) {
            noBike.className = `bike-btn free-slot`;
            noBike.innerHTML = `<i class="far fa-check-circle fa-lg no-bike"></i> <span>Park my bike here<span>`;
            
            noBike.onclick = (e) => this.bikeIsBack(index);
        } else {
            noBike.className = `bike-btn no-bike`;
            noBike.innerHTML = `<i class="far fa-times-circle fa-lg"></i></i> <span>No bike<span>`;
        }
        
        this.getElementsByTagName('div')[0].appendChild(noBike);
    }
    
    rentThisBike (bike) {
        if (DataService.user && DataService.user.bikeId)
            return;
        
        const slotNb = this.stationData.slots.findIndex(slot => slot == bike.id);
        this.stationData.slots[slotNb] = null;
        DataService.user.rentingEnd = new Date().setMinutes(new Date().getMinutes() + 16);
        DataService.user.bikeId = bike.id;

        console.log(DataService.user)
        console.log(new Date().setMinutes(new Date().getMinutes() + 16))

        ManagementService.updateUser();

        this.dispatchEvent(this.bikeMovedEvt);
    }
    
    bikeIsBack (index) {
        if (DataService.user.bikeId) {
            let bike = DataService.bikes.find(b => b.id === DataService.user.bikeId);
            let station; let slot;
            
            if (index === null) {
                let {s, l} = ManagementService.findFreeSlot();
                station = s; slot = l;
            } else {
                station = this.stationData;
                slot = index;
            }
            
            station.slots[slot] = bike.id;
            DataService.user.bikeId = null;
            DataService.user.rentingEnd = null;

            ManagementService.updateUser();

            this.dispatchEvent(this.bikeMovedEvt);
        }
    }
        
}

customElements.define('station-component', StationComponent, { extends: "div" });
