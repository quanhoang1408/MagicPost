const routes = {
    authentication: '/authentication',
    // profile: '/:nickname',
    profile: '/profile',
    home: '/',
    boss: '/boss',
    leader: '/leader',
    employee: '/employee',
    print: '/print',

    // Office
    officeCreateOrder: '/office_create_order',
    officeLeaderManagement: '/office_leader_management',
    officeManagement: '/office_management',
    officeOrderInManagement: '/office_order_in_management',
    officeOrderOutManagement: '/office_order_out_management',
    officeEmployeeManagement: '/office_employee_management',
    // Station
    stationLeaderManagement: '/station_leader_management',
    stationManagement: '/station_management',
    stationOrderManagement: '/station_order_management',
    stationEmployeeManagement: '/station_employee_management',

    orderInStatistic: '/order_in_statistic',
    orderOutStatistic: '/order_out_statistic',
};

export default routes;