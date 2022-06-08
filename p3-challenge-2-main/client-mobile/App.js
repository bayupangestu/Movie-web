import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/screens/Home";
import Details from "./src/screens/Details";
import ProductsCategory from "./src/navigators/ProductsCategory";
import { ApolloProvider } from "@apollo/client";
import client from "./config/apollo";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Cartier" component={Home} />
          <Stack.Screen
            name="Products"
            component={ProductsCategory}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Details" component={Details} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}
