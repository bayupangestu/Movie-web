import React from "react";
import { Text, View, ScrollView, TextInput, TouchableOpacity, Image } from "react-native";
import tw from "twrnc";

export default function Home({ navigation }) {
  return (
    <>
      <ScrollView style={tw`h-96`}>
        <Image
          source={{
            uri: "https://media.matchesfashion.com/prehome/aw21/mens-hero-large.jpg?quality=60",
          }}
          style={tw`h-96 `}
        ></Image>
        <View style={tw`flex flex-row justify-evenly  h-10`}>
          <View style={tw` h-full w-1/3 border`}>
            <Text style={tw`m-auto`}>DESIGNERS</Text>
          </View>
          <View style={tw` h-full w-1/3 border`}>
            <Text style={tw`m-auto`}>WISHLIST</Text>
          </View>
          <View style={tw`h-full w-1/3 border`}>
            <Text style={tw`m-auto`}>MY ACCOUNT</Text>
          </View>
        </View>
        <View>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Products", { screen: "All", params: { category: "All" } })
            }
            style={tw`bg-white mt-10 h-35 mx-4`}
          >
            <Image
              source={{
                uri: "https://media.matchesfashion.com/prehome/aw21/mens-category-stories.jpg?width=500&quality=65",
              }}
              style={tw`h-full`}
            ></Image>
            <Text style={tw` ml-3 -mt-6 text-white`}>All Products</Text>
          </TouchableOpacity>
        </View>
        <View style={tw`flex flex-row justify-evenly h-35 mt-4`}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Products", {
                screen: "Bracelets",
                params: { category: "Bracelets" },
              })
            }
            style={tw`bg-white w-[44%]`}
          >
            <Image
              source={{
                uri: "https://media.matchesfashion.com/prehome/aw21/womens-category-stories.jpg?width=500&quality=65",
              }}
              style={tw`h-full`}
            ></Image>
            <Text style={tw`ml-2 -mt-6 text-white`}>Bracelets</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Products", { screen: "Rings", params: { category: "Rings" } })
            }
            style={tw`bg-white w-[44%]`}
          >
            <Image
              source={{
                uri: "https://media.matchesfashion.com/prehome/aw21/mens-category-shoes.jpg?width=500&quality=65",
              }}
              style={tw`h-full`}
            ></Image>
            <Text style={tw`ml-2 -mt-6 text-white`}>Rings</Text>
          </TouchableOpacity>
        </View>
        <View style={tw`flex flex-row justify-evenly h-35 mt-4`}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Products", {
                screen: "Watches",
                params: { category: "Watches" },
              })
            }
            style={tw`bg-white w-[44%]`}
          >
            <Image
              source={{
                uri: "https://media.matchesfashion.com/prehome/aw21/mens-category-clothing.jpg?width=500&quality=65",
              }}
              style={tw`h-full`}
            ></Image>
            <Text style={tw`ml-2 -mt-6 text-white`}>Watches</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Products", { screen: "Bags", params: { category: "Bags" } })
            }
            style={tw`bg-white w-[44%]`}
          >
            <Image
              source={{
                uri: "https://media.matchesfashion.com/prehome/aw21/mens-category-bags.jpg?width=500&quality=65",
              }}
              style={tw`h-full`}
            ></Image>
            <Text style={tw`ml-2 -mt-6 text-white`}>Bags</Text>
          </TouchableOpacity>
        </View>
        <View style={tw`flex flex-row justify-evenly h-35 mt-4 mb-2`}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Products", { screen: "Belts", params: { category: "Belts" } })
            }
            style={tw`bg-white w-[44%]`}
          >
            <Image
              source={{
                uri: "https://media.matchesfashion.com/prehome/aw21/mens-category-just-in.jpg?width=500&quality=65",
              }}
              style={tw`h-full`}
            ></Image>
            <Text style={tw`ml-2 -mt-6 text-white`}>Belts</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Products", {
                screen: "Sunglasses",
                params: { category: "Sunglasses" },
              })
            }
            style={tw`bg-white w-[44%]`}
          >
            <Image
              source={{
                uri: "https://media.matchesfashion.com/prehome/aw21/mens-category-accessories.jpg?width=500&quality=65",
              }}
              style={tw`h-full`}
            ></Image>
            <Text style={tw`ml-2 -mt-6 text-white`}>Sunglasses</Text>
          </TouchableOpacity>
        </View>
        <View style={tw`h-60 `}>
          <View style={tw`h-20 `}>
            <Text style={tw`mt-8 mx-auto font-bold text-xl`}>WANT STYLE UPDATES?</Text>
          </View>
          <View style={tw`h-20 mx-2  border-t`}>
            <View style={tw`mt-6 flex flex-row justify-center`}>
              <TextInput
                style={tw`border w-[70%] p-1 pl-2`}
                // onChangeText={onChangeNumber}
                // value={email}
                placeholder="Sign up to our emails"
                keyboardType="email-address"
              />
              <View style={tw`bg-black border`}>
                <Text style={tw`text-white my-auto mx-2`}>SIGN UP</Text>
              </View>
            </View>
          </View>
          <Text style={tw`mx-auto`}>Copyright 2022</Text>
          <Text style={tw`mx-auto mt-2`}>PRAJOGOFASHION</Text>
        </View>
      </ScrollView>
    </>
  );
}
