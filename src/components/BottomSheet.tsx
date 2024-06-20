import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { CONSTANTS } from "../core/constants/constants";
import { Color } from "../core/utils/GlobalStyles";
import React from "react";

interface SearchResult {
  id: string;
  title: string;
  poster_path: string;
}

interface BottomSheetProps {
  searchResults: SearchResult[];
  onHideBottomSheet: () => void;
  bottomSheetTouchedRef: React.MutableRefObject<boolean>;
}

export const BottomSheet: React.FC<BottomSheetProps> = ({
  searchResults,
  onHideBottomSheet,
  bottomSheetTouchedRef,
}) => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const handlePress = (result: SearchResult) => {
    console.log(result);
    bottomSheetTouchedRef.current = false;
    navigation.navigate("ShowScreen", { MovieDetails: result });
    onHideBottomSheet();
  };

  const handleTouchStart = () => {
    bottomSheetTouchedRef.current = false;
  };

  return (
    <View style={styles.bottomSheet}>
      <ScrollView
        horizontal
        onTouchStart={handleTouchStart}
        keyboardShouldPersistTaps="always"
      >
        {searchResults.map((result) => (
          <TouchableOpacity
            key={result.id}
            style={styles.resultContainer}
            onPress={() => handlePress(result)}
          >
            <Text
              numberOfLines={7}
              ellipsizeMode="tail"
              style={styles.resultTitle}
            >
              {result.title}
            </Text>
            <Image
              style={styles.resultImage}
              resizeMode="contain"
              source={{
                uri: `${CONSTANTS.IMAGE}${result.poster_path}`,
              }}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomSheet: {
    bottom: -20,
    height: "50%",
    padding: 20,
  },
  resultContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    paddingHorizontal: 10,
    paddingVertical: 2,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderColor: Color.labelColorDarkPrimary,
    borderWidth: 0.5,
    borderRadius: 8,
    marginHorizontal: 5,
    width: 200,
    overflow: "hidden",
  },
  resultImage: {
    width: 90,
    height: 95,
    marginLeft: 5,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: Color.labelColorDarkPrimary,
    flex: 1,
    flexShrink: 1,
  },
});
