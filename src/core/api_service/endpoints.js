import { CONSTANTS } from "../constants/constants";

export const BASE_URL = "https://api.themoviedb.org/3";

export const ENDPOINTS = {
  POPULAR: `${BASE_URL}/movie/popular?language=${CONSTANTS.LANGUAGE}&api_key=${CONSTANTS.APIKEY}`,
  SEARCH: `${BASE_URL}/search/movie?include_adult=false&?language=${CONSTANTS.LANGUAGE}&page=1&api_key=${CONSTANTS.APIKEY}`,
};
