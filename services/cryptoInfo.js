require("dotenv").config();
var axios = require("axios").default;

const cryptoApiHeaders = {
  "x-rapidapi-host": process.env.CI_RAPIDAPI_HOST,
  "x-rapidapi-key": process.env.CI_RAPIDAPI_KEY,
};

//TODO: implement other crypto information calls

// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const baseUrl = "https://coinranking1.p.rapidapi.com";

// const createRequest = (url) => ({ url, headers: cryptoApiHeaders });

// export const cryptoApi = createApi({
//   reducerPath: "cryptoApi",
//   baseQuery: fetchBaseQuery({ baseUrl }),
//   endpoints: (builder) => ({
//     getCryptos: builder.query({
//       query: (count) => createRequest(`/coins?limit=${count}`),
//     }),
//     getCryptoDetails: builder.query({
//       query: (coinId) => createRequest(`/coin/${coinId}`),
//     }),
//     getCryptoHistory: builder.query({
//       query: ({ coinId, timeperiod }) =>
//         createRequest(`/coin/${coinId}/history?timeperiod=${timeperiod}`),
//     }),
//   }),
// });

// export const {
//   useGetCryptosQuery,
//   useGetCryptoDetailsQuery,
//   useGetCryptoHistoryQuery,
// } = cryptoApi;

//get crypto ranking information
const getCryptos = async (count) => {
  var options = {
    method: "GET",
    url: "https://coinranking1.p.rapidapi.com/coins",
    params: {
      limit: count,
    },
    headers: cryptoApiHeaders,
  };

  const response = await axios
    .request(options)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.error(error);
    });

  return response;
};

//get cryptocurrency details
const getCryptoDetails = async (coinId) => {
  var options = {
    method: "GET",
    url: `https://coinranking1.p.rapidapi.com/coin/${coinId}`,
    headers: cryptoApiHeaders,
  };

  const response = await axios
    .request(options)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.error(error);
    });

  return response;
};

const getCryptoHistory = async (coinId, timePeriod) => {
  var options = {
    method: "GET",
    url: `https://coinranking1.p.rapidapi.com/coin/${coinId}/history`,
    params: { timePeriod: timePeriod },
    headers: cryptoApiHeaders,
  };
  const response = await axios
    .request(options)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.error(error);
    });

  return response;
};

module.exports = { getCryptos, getCryptoDetails, getCryptoHistory };
