import * as React from "react";
import { Text, StyleSheet, Image, View } from "react-native";
import { Color, FontSize, FontFamily } from "../core/utils/GlobalStyles";

type EternalsContainerProps = {
  title: string;
  overview: string;
  release_date: string;
  original_language: string;
  vote_average: number;
};

const EternalsContainer: React.FC<EternalsContainerProps> = ({
  title,
  overview,
  release_date,
  original_language,
  vote_average,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          Release Date: {release_date}
        </Text>
        <Image
          style={styles.dot}
          resizeMode="cover"
          source={require("../../assets/ellipse-226.png")}
        />
        <Text style={styles.infoText}>
          Language: {original_language}
        </Text>
        <Image
          style={styles.dot}
          resizeMode="cover"
          source={require("../../assets/ellipse-226.png")}
        />
        <Text style={styles.infoText}>
          Rating: {vote_average}
        </Text>
      </View>
      <Text style={styles.description}>{overview}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: FontSize.size_5xl,
    fontWeight: "700",
    fontFamily: FontFamily.openSansBold,
    color: Color.colorGray_200,
    textAlign: "center",
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    flexWrap: "wrap",
    justifyContent: "center",
  },
  infoText: {
    fontSize: FontSize.size_smi,
    fontFamily: FontFamily.openSansRegular,
    color: Color.colorGray_300,
    textAlign: "center",
    marginHorizontal: 5,
  },
  dot: {
    height: 4,
    width: 4,
    marginHorizontal: 2,
  },
  description: {
    fontSize: FontSize.size_sm,
    letterSpacing: 0.1,
    fontFamily: FontFamily.interRegular,
    color: Color.colorGray_300,
    textAlign: "center",
    marginTop: 20,
  },
});

export default EternalsContainer;
