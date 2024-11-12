import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Registration from '../Screens/Registration';
import Signup from '../Screens/Signup';
import Login from '../Screens/Login';
import Dashboard from '../Screens/Dashboard';
import SeeAll from '../Screens/SeeAll';
import Kinka from '../Screens/Kinka';
import Order from '../Screens/Order';
import Menu from '../Screens/Menu';
import Cart from '../Screens/Cart';
import Location from '../Screens/Location';

const Stack = createStackNavigator();

const StackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>

      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="SeeAll" component={SeeAll} />
        <Stack.Screen name="Kinka" component={Kinka} />
        <Stack.Screen name="Order" component={Order} />  
        <Stack.Screen name="Menu" component={Menu} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="Location" component={Location} />


      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;