import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Login from './pages/Login';
import List from './pages/List';
import MarketList from './pages/MarketList';

const Routes = createAppContainer(
    createSwitchNavigator({
        Login,
        List,
        MarketList,
    })
);

export default Routes;