import DataService from './services/data.service.js';
import ComponentService from './services/component.service.js';
import LoginComponent from './components/login/login.component.js';
import RentingComponent from './components/renting/renting.component.js';
import StationComponent from './components/station/station.component.js';
import AdminComponent from './components/admin/admin.component.js';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/js/all';
import './index.scss';

window.onload = () => {
  ComponentService.init(document.getElementById('main-content'));
}
