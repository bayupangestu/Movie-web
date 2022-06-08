import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProductsAll from "../screens/ProductsAll";
import ProductsByCategory from "../screens/ProductsByCategory";

const Stack = createNativeStackNavigator();

export default function ProductsCategory() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="All" component={ProductsAll} />
      <Stack.Screen name="Bracelets" component={ProductsByCategory} />
      <Stack.Screen name="Rings" component={ProductsByCategory} />
      <Stack.Screen name="Watches" component={ProductsByCategory} />
      <Stack.Screen name="Bags" component={ProductsByCategory} />
      <Stack.Screen name="Belts" component={ProductsByCategory} />
      <Stack.Screen name="Sunglasses" component={ProductsByCategory} />
    </Stack.Navigator>
  );
}
