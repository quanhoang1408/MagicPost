import config from '../config';

import HeaderOnly from '~/layouts/HeaderOnly';

import Authentication from '~/pages/Authentication';
import Profile from '~/pages/Profile';
import Home from '~/pages/Home';

import Boss from '~/pages/Boss';
import Leader from '~/pages/Leader';
import Employee from '~/pages/Employee';
import Print from '~/pages/Print';
// Office
import OfficeCreateOrder from '~/pages/Office/OfficeCreateOrder';
import OfficeLeaderManagement from '~/pages/Office/OfficeLeaderManagement';
import OfficeManagement from '~/pages/Office/OfficeManagement';
import OfficeOrderInManagement from '~/pages/Office/OfficeOrderInManagement';
import OfficeOrderOutManagement from '~/pages/Office/OfficeOrderOutManagement';
import OfficeEmployeeManagement from '~/pages/Office/OfficeEmployeeManagement';
// Station
import StationLeaderManagement from '~/pages/Station/StationLeaderManagement';
import StationManagement from '~/pages/Station/StationManagement';
import StationOrderManagement from '~/pages/Station/StationOrderManagement';
import StationEmployeeManagement from '~/pages/Station/StationEmployeeManagement';

import OrderInStatistic from '~/pages/OrderInStatistic';
import OrderOutStatistic from '~/pages/OrderOutStatistic';

// Không cần đăng nhập
const publicRoutes = [
    { path: config.routes.authentication, component: Authentication, layout: null },
    { path: config.routes.profile, component: Profile },
    { path: config.routes.home, component: Home, layout: HeaderOnly },
    { path: config.routes.boss, component: Boss },
    { path: config.routes.leader, component: Leader },
    { path: config.routes.employee, component: Employee },
    { path: config.routes.print, component: Print },
    // Office
    { path: config.routes.officeCreateOrder, component: OfficeCreateOrder },
    { path: config.routes.officeLeaderManagement, component: OfficeLeaderManagement },
    { path: config.routes.officeManagement, component: OfficeManagement },
    { path: config.routes.officeOrderInManagement, component: OfficeOrderInManagement },
    { path: config.routes.officeOrderOutManagement, component: OfficeOrderOutManagement },
    { path: config.routes.officeEmployeeManagement, component: OfficeEmployeeManagement },
    // Station
    { path: config.routes.stationLeaderManagement, component: StationLeaderManagement },
    { path: config.routes.stationManagement, component: StationManagement },
    { path: config.routes.stationOrderManagement, component: StationOrderManagement },
    { path: config.routes.stationEmployeeManagement, component: StationEmployeeManagement },

    { path: config.routes.orderInStatistic, component: OrderInStatistic },
    { path: config.routes.orderOutStatistic, component: OrderOutStatistic },
]

// Phải đăng nhập, nếu không đăng nhập -> nhảy sang login
const privateRoutes = [

]

export { publicRoutes, privateRoutes }