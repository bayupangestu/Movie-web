import React from "react";
import { Text, View, ScrollView, Image, ActivityIndicator } from "react-native";
import tw from "twrnc";
import { useQuery } from "@apollo/client";
import { FETCH_PRODUCT } from "../../config/queries";

export default function Details({ route }) {
  const { loading, error, data } = useQuery(FETCH_PRODUCT, {
    variables: { productId: route.params.id },
  });

  if (loading)
    return (
      <Text style={tw`mx-auto mt-[330px]`}>
        <ActivityIndicator size="small" color="#0000ff" />
      </Text>
    );
  if (error) return <Text>Error :(</Text>;

  return (
    <View>
      <ScrollView style={tw`h-full`}>
        <View style={tw`bg-gray-900 h-[103]`}>
          <Image
            source={{
              uri: data.product.mainImg,
            }}
            style={tw`h-full`}
          ></Image>
        </View>
        <View style={tw`flex flex-row justify-evenly h-34 p-1`}>
          <View style={tw` h-full w-1/3 mr-1`}>
            <Image
              source={{
                uri: data.product.Images[1].imgUrl,
              }}
              style={tw`h-full  border border-black`}
            ></Image>
          </View>
          <View style={tw`bg-gray-700 h-full w-1/3 mr-1`}>
            <Image
              source={{
                uri: data.product.Images[2].imgUrl,
              }}
              style={tw`h-full border border-black`}
            ></Image>
          </View>
          <View style={tw`bg-gray-900 h-full w-1/3`}>
            <Image
              source={{
                uri: data.product.Images[3].imgUrl,
              }}
              style={tw`h-full  border border-black`}
            ></Image>
          </View>
        </View>
        <View style={tw` p-5`}>
          <View style={tw`mt-2`}>
            <Text style={tw`text-4xl`}>{data.product.name}</Text>
          </View>
          <View style={tw`flex flex-row mt-1.5 h-5`}>
            <Text style={tw`text-xs mr-2`}>{data.product.Category.name}</Text>
            <Text style={tw`text-xs`}>by: </Text>
            <Text style={tw`text-xs`}>{data.product.User.username}</Text>
          </View>
          <Text style={tw`mt-1`}>$ {data.product.price}</Text>

          <View style={tw` h-10 mt-5 w-full border`}>
            <Text style={tw`m-auto font-semibold`}>Description</Text>
          </View>

          <Text style={tw`mt-5 text-base mb-5`}>{data.product.description}</Text>
        </View>
      </ScrollView>
    </View>
  );
}
