import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Border,
  FontFamily,
  Color,
  FontSize,
} from "../core/utils/GlobalStyles";

type FrameProps = {
  navigation: StackNavigationProp<ParamListBase>;
};

const { width, height } = Dimensions.get("window");

const SignUpScreen: React.FC<FrameProps> = ({ navigation }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const loggedIn = await AsyncStorage.getItem("isLoggedIn");
      setIsLoading(false);
      setIsLoggedIn(loggedIn === "true");
    };
    checkLoginStatus();
  }, []);
  
//Handle Login
  const handleLogin = async () => {
    await AsyncStorage.setItem("isLoggedIn", "true");
    navigation.replace("Dashboard");
  };

  if (isLoading) {
    return (
      <LinearGradient
        colors={["#000000", "#000000"]}
        style={styles.loadingScreen}
      ></LinearGradient>
    );
  }
  if (isLoggedIn) {
    navigation.replace("Dashboard");
    return null;
  }
  return (
    <View style={styles.view}>
      <Image
        style={styles.avatarIcon}
        resizeMode="contain"
        source={require("../../assets/avatar.png")}
      />
      <View style={styles.watchMoviesInVirtualRealitParent}>
        <Text style={styles.watchMoviesIn}>
          Watch movies in Virtual Reality
        </Text>
        <Text style={styles.downloadAndWatch}>
          Download and watch offline wherever you are
        </Text>
        <TouchableOpacity
          style={styles.signUpButton}
          onPress={() => handleLogin()}
          activeOpacity={0.7}
        >
          <LinearGradient
            style={styles.signUpButtonChild}
            locations={[0, 1]}
            colors={["rgba(254, 83, 187, 0.5)", "rgba(9, 251, 211, 0.5)"]}
            useAngle={true}
            angle={104.74}
          >
            <Text style={styles.signUp}>Sign up</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarIcon: {
    width: width * 0.8,
    height: height * 0.5,
    justifyContent: "center",
    alignSelf: "center",
  },
  watchMoviesIn: {
    fontSize: width * 0.09,
    fontWeight: "700",
    fontFamily: FontFamily.openSansBold,
    color: Color.colorGray_200,
    width: width * 0.8,
    textAlign: "center",
    letterSpacing: 0,
  },
  downloadAndWatch: {
    fontSize: width * 0.04,
    color: Color.colorGray_300,
    width: width * 0.7,
    marginTop: 30,
    fontFamily: FontFamily.openSansRegular,
    textAlign: "center",
    letterSpacing: 0,
  },
  signUpButtonChild: {
    height: "100%",
    width: "100%",
    borderRadius: Border.br_xl,
    justifyContent: "center",
    alignItems: "center",
  },
  signUp: {
    fontSize: FontSize.size_sm,
    color: Color.labelColorDarkPrimary,
    fontFamily: FontFamily.openSansRegular,
    textAlign: "center",
  },
  signUpButton: {
    height: height * 0.05,
    width: width * 0.4,
    marginTop: 30,
    borderRadius: Border.br_xl,
    overflow: "hidden",
  },
  watchMoviesInVirtualRealitParent: {
    alignItems: "center",
    justifyContent: "center",
  },
  view: {
    backgroundColor: Color.colorGray_100,
    flex: 1,
  },
});

export default SignUpScreen;
