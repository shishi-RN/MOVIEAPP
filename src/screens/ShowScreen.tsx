import * as React from "react";
import { Image, StyleSheet, View, TouchableOpacity, Text, ScrollView } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/Ionicons";
import EternalsContainer from "../components/EternalsContainer";
import { Padding, Color, Border } from "../core/utils/GlobalStyles";
import { useRoute, RouteProp, useNavigation, ParamListBase } from "@react-navigation/native";
import { CONSTANTS } from "../core/constants/constants";
import { StackNavigationProp } from "@react-navigation/stack";

type ShowScreenRouteParams = {
  MovieDetails: {
    adult: boolean;
    backdrop_path: string | null;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
  };
};

type ShowScreenRouteProp = RouteProp<
  { ShowScreen: ShowScreenRouteParams },
  "ShowScreen"
>;

const ShowScreen: React.FC = () => {
  const route = useRoute<ShowScreenRouteProp>();
  const { MovieDetails } = route.params;
  const {
    poster_path,
    title,
    overview,
    release_date,
    original_language,
    vote_average,
  } = MovieDetails;
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  return (
    <LinearGradient
      style={styles.lineargradient}
      locations={[0, 1]}
      colors={["#000", "#19191b"]}
      useAngle={true}
      angle={180}
    >
      
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.imageWrapper}>
          <Image
            style={styles.child}
            resizeMode="cover"
            source={
              poster_path
                ? { uri: `${CONSTANTS.IMAGE}${poster_path}` }
                : require("../../assets/group-1.png")
            }
          />
          <View style={styles.navigationButton}>
            <TouchableOpacity onPress={()=>navigation.goBack()}
              style={[styles.arrowLeftButton, styles.buttonBorder]}
            >
              <Icon
                name="arrow-back"
                size={24}
                color={Color.labelColorDarkPrimary}
              />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.menuButton, styles.buttonBorder]} >
              <Icon name="menu" size={24} color={Color.labelColorDarkPrimary} />
            </TouchableOpacity>
          </View>
          <View style={styles.playButtonWrapper}>
            <Image
              style={styles.lightingIcon}
              resizeMode="cover"
              source={require("../../assets/lighting1.png")}
            />
            <TouchableOpacity style={styles.playButton}>
              <Icon name="play" size={24} color={Color.labelColorDarkPrimary} />
            </TouchableOpacity>
          </View>
        </View>
        <EternalsContainer 
          title={title}
          overview={overview}
          release_date={release_date}
          original_language={original_language}
          vote_average={vote_average}
        />
        <View style={styles.item} />
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  buttonBorder: {
    padding: Padding.p_3xs,
    borderWidth: 0.5,
    borderStyle: "solid",
    backgroundColor: Color.colorGray_400,
    borderRadius: Border.br_31xl,
    alignItems: "center",
    justifyContent: "center",
  },
  imageWrapper: {
    position: "relative",
  },
  child: {
    width: "100%",
    height: 402,
  },
  item: {
    marginVertical: 20,
    width: "80%",
    height: 2,
    backgroundColor: Color.colorGray_400,
    alignSelf: "center",
  },
  arrowLeftButton: {
    borderColor: Color.labelColorDarkPrimary,
    borderWidth: 0.3,
    position: "absolute",
    top: 10,
    left: 10,
  },
  menuButton: {
    borderColor: Color.labelColorDarkPrimary,
    position: "absolute",
    top: 10,
    right: 10,
  },
  navigationButton: {
    position: "absolute",
    top: 0,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  playButtonWrapper: {
    position: "absolute",
    top: "70%",
    left: "50%",
    transform: [{ translateX: -30 }, { translateY: -30 }],
    alignItems: "center",
  },
  lightingIcon: {
    position: "absolute",
    width: 60,
    height: 60,
  },
  playButton: {
    shadowColor: "rgba(11, 251, 211, 0.25)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
    elevation: 4,
    shadowOpacity: 1,
    borderColor: Color.labelColorDarkPrimary,
    alignItems: "center",
    justifyContent: "center",
    padding: Padding.p_3xs,
    borderWidth: 0.5,
    borderStyle: "solid",
    backgroundColor: Color.colorGray_400,
    borderRadius: Border.br_31xl,
    width: 60,
    height: 60,
  },
  lineargradient: {
    flex: 1,
    width: "100%",
    height: "100%",
    overflow: "hidden",
    backgroundColor: "transparent",
  },
});

export default ShowScreen;
