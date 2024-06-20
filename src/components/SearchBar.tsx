import React, { useState, useEffect, useRef } from "react";
import { Image, StyleSheet, TextInput, View, Keyboard } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { getRequest } from "../core/api_service/apiService";
import { ENDPOINTS } from "../core/api_service/endpoints";
import { useQuery } from "@tanstack/react-query";
import { retrieveData, storeData } from "../core/utils/Storage";
import { BottomSheet } from "./BottomSheet";

export type SearchBarProps = {
  onSearch?: (query: string) => void;
};

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [textInputValue, setTextInputValue] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const bottomSheetTouchedRef = useRef(false);

  const handleFocus = () => {
    setShowBottomSheet(true);
  };

  const handleBlur = () => {
    if (!bottomSheetTouchedRef.current) {
      setShowBottomSheet(false);
      Keyboard.dismiss();
    }
  };

  const handleInputChange = (text: string) => {
    setTextInputValue(text);
    if (onSearch) {
      onSearch(text);
    }
  };

  const handleCloseBottomSheet = () => {
    setShowBottomSheet(false);
    Keyboard.dismiss();
  };

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      handleCloseBottomSheet
    );

    return () => {
      keyboardDidHideListener.remove();
    };
  }, []);

  const { isLoading, isError, data } = useQuery({
    queryKey: ["search", textInputValue],
    queryFn: async () => {
      if (textInputValue.trim().length === 0) {
        return [];
      }
      const searchEndpoint = `${ENDPOINTS.SEARCH}&query=${textInputValue}`;
      const response = await getRequest(searchEndpoint);
      return response.results;
    },
    gcTime: 1000 * 3000,
  });

  useEffect(() => {
    if (data) {
      setSearchResults(data);
      storeData(data);
    }
  }, [data]);

  useEffect(() => {
    (async () => {
      const lastSearchResults = await retrieveData();
      setSearchResults(lastSearchResults);
    })();
  }, []);

  return (
    <>
      <LinearGradient
        colors={["rgba(255, 255, 255, 0.2)", "rgba(255, 255, 255, 0)"]}
        style={styles.container}
      >
        <Image
          style={styles.iconMagnifyingglass}
          resizeMode="cover"
          source={require("../../assets/icon--magnifyingglass.png")}
        />
        <TextInput
          style={styles.input}
          placeholder={"Search"}
          placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChangeText={handleInputChange}
          value={textInputValue}
        />
      </LinearGradient>

      {showBottomSheet && (
        <BottomSheet
          searchResults={searchResults}
          onHideBottomSheet={() => {
            setShowBottomSheet(false);
            Keyboard.dismiss();
          }}
          bottomSheetTouchedRef={bottomSheetTouchedRef}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    marginTop:10,
    width: "85%",
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    paddingHorizontal: 12,
  },
  iconMagnifyingglass: {
    width: 16,
    height: 16,
    marginRight: 16,
  },
  input: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    // flex: 1,
  },
});

export default SearchBar;
