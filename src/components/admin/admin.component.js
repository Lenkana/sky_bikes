/**
 * AdminComponent
 * This element shows a table of the user, their personal information,
 * their rented bike and remaining time, and ban status
 */

import DataService from '../../services/data.service.js';
import ManagementService from '../../services/management.service.js';
import './admin.scss';

export default class AdminComponent extends HTMLDivElement {
    userListTable;

    constructor() {
        super();
        
        this.innerHTML = `
        <div id="adminElt" class="admin-ctn row">
            <div class="col col-12">
                <table id="userListTable" class="user-table table table-striped">
                    <tr>
                        <th>Name</th>
                        <th>Member e-mail</th>
                        <th>Color of the rented bike</th>
                        <th>Remaining time</th>
                        <th>Active / Banned</th>
                    </tr>
                </table>
            </div>
        </div>
        `;
    }

    connectedCallback() {
        this.userListTable = document.getElementById('userListTable');
        this.displayUsers();
    }

    displayUsers() {

        DataService.accounts.forEach(u => {
            ManagementService.checkBannedUser(u);

            let tr = document.createElement('tr');
            let bikeColor, formattedTime, bikeColorIcon;

            if (u.bikeId) {
                formattedTime = ManagementService.formatRemainingTime(new Date(u.rentingEnd));
                bikeColor = DataService.bikes.find(b => b.id === u.bikeId).color;
                bikeColorIcon = bikeColor ?
                    `<span class="bike-${bikeColor}"><i class="fas fa-bicycle"></i><span> ${bikeColor}` :
                    '';
            }

            const status = u.banned ?
                '<i class="fa fa-ban"><i>' :
                '<i class="fa fa-check"><i>';
            const remainingTime = formattedTime ?
                `${formattedTime.hours}:${formattedTime.minutes}:${formattedTime.seconds}` :
                '';

            tr.innerHTML = `
                <td>${u.firstname} ${u.lastname}</td>
                <td>${u.email}</td>
                <td>${bikeColorIcon || ''}</td>
                <td>${remainingTime}</td>
                <td class="user-status">${status}</td>
            `;

            this.userListTable.appendChild(tr);
        });
    }
}

customElements.define('admin-component', AdminComponent, { extends: "div" });

