import { useState } from 'react';
import { BottomNavigation } from 'react-native-paper';

// Tabs
import HomeTab from "./Tabs/Home"
import MyEventsTab from "./Tabs/MyEvents"
import OtherTab from './Tabs/Other';

const Main = () => {
  const [index, setIndex] = useState(0);

  const [routes] = useState([
    { key: 'home', title: 'Home', focusedIcon: 'home', unfocusedIcon: 'home-outline' },
    { key: 'my_events', title: 'My Events', focusedIcon: 'ticket-confirmation', unfocusedIcon: 'ticket-confirmation-outline' },
    { key: 'others', title: 'Others', focusedIcon: 'compass', unfocusedIcon: 'compass-outline' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeTab,
    my_events: MyEventsTab,
    others: OtherTab,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default Main;