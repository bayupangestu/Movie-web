import React from "react";
import { View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import tw from "twrnc";
import { useQuery } from "@apollo/client";
import { FETCH_PRODUCTS } from "../../config/queries";

export default function Products({ navigation }) {
  const { loading, error, data } = useQuery(FETCH_PRODUCTS);

  if (loading)
    return (
      <Text style={tw`mx-auto mt-[330px]`}>
        <ActivityIndicator size="small" color="#0000ff" />
      </Text>
    );
  if (error) return <Text>Error :(</Text>;

  return (
    <>
      <ScrollView style={tw``}>
        <View style={tw`flex flex-row flex-wrap justify-center h-full mt-2`}>
          {data.products &&
            data.products.map((el) => {
              return (
                <TouchableOpacity
                  onPress={() => navigation.navigate("Details", { id: el.id })}
                  key={el.id}
                  style={tw` my-2 w-[44%] mx-1.3 h-76.5 bg-slate-50 p-2`}
                >
                  <Image
                    style={tw`h-[58%] w-full`}
                    source={{
                      uri: el.mainImg,
                    }}
                  ></Image>
                  <Text style={tw`text-base my-3 font-semibold`}>{el.name}</Text>
                  <Text style={tw`text-sm font-semibold`}>${el.price}</Text>
                </TouchableOpacity>
              );
            })}
        </View>
      </ScrollView>
    </>
  );
}
