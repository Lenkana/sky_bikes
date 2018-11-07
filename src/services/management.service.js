/**
 * ManagementService
 * This service is used for the management of bike stations
 * and user bans
 */


import DataService from './data.service';

class _ManagementService {

    findFreeSlot() {
        let slot;
        let station = DataService.stations.find(s => s.slots.some((sl, index) => {
            if (sl === null)
                slot = index;
            return sl === null;
        }));
        return {station, slot};
    }

    formatRemainingTime(endTime) {
        let remainingTime = endTime - new Date();
        return this.getHMS(remainingTime);
    }

    getHMS(milliseconds) {
        let seconds = Math.floor(milliseconds / 1000);

        let hours = this.addLeadingZero(Math.floor(seconds / 3600));
        seconds  -= hours * 3600;
        let minutes = this.addLeadingZero(Math.floor(seconds / 60));
        seconds  -= minutes * 60;
        seconds = this.addLeadingZero(seconds);
        
        return {hours, minutes, seconds};
    }

    addLeadingZero(number) {
        return number.toString().length < 2 ? `0${number}` : `${number}`;
    }

    updateUser() {
        const index = DataService.accounts.findIndex(u => u.email == DataService.user.email);
        DataService.accounts[index] = DataService.user;
        DataService.saveData('accounts');
        DataService.saveData('user');
        DataService.saveData('stations');
    }

    checkBannedUser(user) {
        const endTime = new Date(user.rentingEnd);
        if (endTime - new Date() < 0) {
            this.banUserFromAdmin(user);
        }
    }

    banUser() {
        const bikeId = DataService.user.bikeId;
        let {station, slot} = this.findFreeSlot();
        
        station.slots[slot] = bikeId;
        DataService.user.banned = true;
        DataService.user.rentingEnd = null;
        DataService.user.bikeId = null;
        this.updateUser();
    }

    banUserFromAdmin(user) {
        const bikeId = user.bikeId;
        let {station, slot} = this.findFreeSlot();
        
        station.slots[slot] = bikeId;
        user.banned = true;
        user.rentingEnd = null;
        user.bikeId = null;
        
        const index = DataService.accounts.findIndex(u => u.email == user.email);
        DataService.accounts[index] = user;
        DataService.saveData('accounts');
        DataService.saveData('stations');
    }

}

const ManagementService = new _ManagementService();
export default ManagementService;