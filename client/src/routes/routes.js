import config from '../config';

import HeaderOnly from '~/layouts/HeaderOnly';

import Authentication from '~/pages/Authentication';
import Profile from '~/pages/Profile';
import Home from '~/pages/Home';

import Boss from '~/pages/Boss';
import Leader from '~/pages/Leader';
import Employee from '~/pages/Employee';
import Print from '~/pages/Print';
import StationLeaderManagement from '~/pages/StationLeaderManagement';
import OfficeLeaderManagement from '~/pages/OfficeLeaderManagement';
import EmployeeManagement from '~/pages/EmployeeManagement';
import officeManagement from '~/pages/OfficeManagement';
import StationManagement from '~/pages/StationManagement';
import OrderInManagement from '~/pages/OrderInManagement';
import OrderOutManagement from '~/pages/OrderOutManagement';
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
    { path: config.routes.stationLeaderManagement, component: StationLeaderManagement },
    { path: config.routes.officeLeaderManagement, component: OfficeLeaderManagement },
    { path: config.routes.employeeManagement, component: EmployeeManagement },
    { path: config.routes.stationManagement, component: StationManagement },
    { path: config.routes.officeManagement, component: officeManagement },
    { path: config.routes.orderInManagement, component: OrderInManagement },
    { path: config.routes.orderOutManagement, component: OrderOutManagement },
    { path: config.routes.orderInStatistic, component: OrderInStatistic },
    { path: config.routes.orderOutStatistic, component: OrderOutStatistic },
]

// Phải đăng nhập, nếu không đăng nhập -> nhảy sang login
const privateRoutes = [

]

export { publicRoutes, privateRoutes }