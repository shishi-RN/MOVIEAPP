import * as React from "react";
import {
  Image,
  StyleSheet,
  Pressable,
  View,
  Text,
  ImageBackground,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ParamListBase } from "@react-navigation/native";
import DarkModeFalseTypeDefault from "../components/SearchBar";

import { FontFamily, FontSize, Color } from "../core/utils/GlobalStyles";
import { ENDPOINTS } from "../core/api_service/endpoints";
import { getRequest } from "../core/api_service/apiService";
import { CONSTANTS } from "../core/constants/constants";

type FrameProps = {
  navigation: StackNavigationProp<ParamListBase>;
};

const Dashboard: React.FC<FrameProps> = ({ navigation }) => {
  const [page, setPage] = React.useState(1);
  const [data, setData] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isFetchingMore, setIsFetchingMore] = React.useState(false);

//Fetching Popular Movies
  const fetchData = async (page: number) => {
    const popularEndpoint = `${ENDPOINTS.POPULAR}&page=${page}`;
    const response = await getRequest(popularEndpoint);
    return response.results;
  };

  const loadInitialData = async () => {
    setIsLoading(true);
    const initialData = await fetchData(1);
    setData(initialData);
    setIsLoading(false);
  };

//Handle pagination
  const loadMoreData = async () => {
    setIsFetchingMore(true);
    const newData = await fetchData(page + 1);
    setData((prevData) => [...prevData, ...newData]);
    setPage(page + 1);
    setIsFetchingMore(false);
  };

  React.useEffect(() => {
    loadInitialData();
  }, []);

  const renderItem = ({ item }: { item: any }) => (
    <Pressable
      key={item.id}
      style={styles.movieCard}
      onPress={() => navigation.navigate("ShowScreen", { MovieDetails: item })}
    >
      <Image
        style={styles.icon}
        resizeMode="contain"
        source={{ uri: `${CONSTANTS.IMAGE}${item.poster_path}` }}
      />
    </Pressable>
  );

  const renderFooter = () => {
    if (!isFetchingMore) return null;
    return <ActivityIndicator style={styles.loadingIndicator} />;
  };

  return (
    <View style={styles.view}>
      <ImageBackground
        style={styles.backgroundIcon}
        resizeMode="cover"
        source={require("../../assets/background1.png")}
      >
        <Text style={styles.headerText}>What would you like to watch?</Text>
        <DarkModeFalseTypeDefault />
        <Text style={styles.moviesTypo}>Popular Movies</Text>
        <View style={{ paddingVertical: 10 }}>
          {isLoading ? (
            <ActivityIndicator style={styles.loadingIndicator} />
          ) : (
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              numColumns={3}
              contentContainerStyle={styles.flatListContent}
              onEndReached={loadMoreData}
              onEndReachedThreshold={0.5}
              ListFooterComponent={renderFooter}
            />
          )}
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  flatListContent: {
    marginTop: "2%",
    paddingHorizontal: "2%",
  },
  moviesTypo: {
    fontFamily: FontFamily.openSansRegular,
    fontSize: FontSize.defaultRegularBody_size,
    left: "5%",
    textAlign: "left",
    color: Color.labelColorDarkPrimary,
    letterSpacing: 0,
    marginTop: "5%",
  },
  backgroundIcon: {
    width: "100%",
    height: "100%",
  },
  icon: {
    height: "100%",
    width: "100%",
  },
  movieCard: {
    width: "33%",
    height: 150,
    padding: 5,
  },

  headerText: {
    marginTop: "12%",
    fontSize: 28,
    fontWeight: "700",
    fontFamily: FontFamily.openSansBold,
    textAlign: "center",
    color: Color.labelColorDarkPrimary,
    letterSpacing: 0,
  },

  view: {
    backgroundColor: Color.colorGray_100,
    flex: 1,
    width: "100%",
  },
  loadingIndicator: {
    marginVertical: 20,
  },
});

export default Dashboard;
