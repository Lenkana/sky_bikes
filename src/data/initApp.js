import DataService from '../services/data.service';

export default function initAppData (callback) {
    const initLoad = {
        bikes: [
            {
                id: 'bike-1',
                color: 'purple'
            },
            {
                id: 'bike-2',
                color: 'violet'
            },
            {
                id: 'bike-3',
                color: 'blue'
            },
            {
                id: 'bike-4',
                color: 'green'
            },
            {
                id: 'bike-5',
                color: 'yellow'
            },
            {
                id: 'bike-6',
                color: 'orange'
            },
            {
                id: 'bike-7',
                color: 'red'
            },
            {
                id: 'bike-8',
                color: 'purple'
            },
            {
                id: 'bike-9',
                color: 'violet'
            },
            {
                id: 'bike-10',
                color: 'blue'
            },
            {
                id: 'bike-11',
                color: 'green'
            },
            {
                id: 'bike-12',
                color: 'yellow'
            },
            {
                id: 'bike-13',
                color: 'orange'
            },
            {
                id: 'bike-14',
                color: 'red'
            },
            {
                id: 'bike-15',
                color: 'purple'
            },
            {
                id: 'bike-16',
                color: 'violet'
            },
            {
                id: 'bike-17',
                color: 'blue'
            },
            {
                id: 'bike-18',
                color: 'green'
            },
            {
                id: 'bike-19',
                color: 'yellow'
            },
            {
                id: 'bike-20',
                color: 'orange'
            },
            {
                id: 'bike-21',
                color: 'red'
            }
        ],
        stations: [
        {
                id: 'station-1',
                lat: 12.5,
                long: 13.8,
                name: 'Riponne',
                slots: ['bike-1', 'bike-2', 'bike-3', 'bike-4', 'bike-5', 'bike-6', 'bike-7', null, null, null]
            },
            {
                id: 'station-2',
                lat: 12.5,
                long: 13.8,
                name: 'Bel-Air',
                slots: ['bike-8', 'bike-9', 'bike-10', 'bike-11', 'bike-12', 'bike-13', 'bike-14', null, null, null]
            },
            {
                id: 'station-3',
                lat: 12.5,
                long: 13.8,
                name: 'Gare',
                slots: ['bike-15', 'bike-16', 'bike-17', 'bike-18', 'bike-19', 'bike-20', 'bike-21', null, null, null]
            }
        ],
        accounts: [
            {
                email: "test@gmail.com",
                firstname: "rez",
                lastname: "rez",
                phonenumber: "01.02.03.04.05",
            },
            {
                email: "user@gmail.com",
                firstname: "rez",
                lastname: "rez",
                phonenumber: "01.02.03.04.05",
            }
        ],
        user: null,
        adminUser: false
    };
    
    for (let key in initLoad) {
        var raw = DataService.getStorage(key);
        
        if (raw === null) {
            DataService[key] = initLoad[key];
        }
    }

    callback();
}
