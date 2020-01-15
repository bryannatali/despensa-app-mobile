import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Login from './pages/Login';
import List from './pages/List';
import MarketList from './pages/MarketList';
import NewItem from './pages/NewItem';
import NewCategory from './pages/NewCategory';
import NewMarketList from './pages/NewMarketList';

const Routes = createAppContainer(
    createSwitchNavigator({
        Login,
        List,
        MarketList,
        NewItem,
        NewCategory,
        NewMarketList,
    })
);

export default Routes;