require("dotenv").config();

//get crypto news
const getCryptoNews = async (category, count) => {
  var axios = require("axios").default;

  var options = {
    method: "GET",
    url: "https://bing-news-search1.p.rapidapi.com/news/search",
    params: {
      q: category,
      freshness: "Day",
      textFormat: "Raw",
      safeSearch: "Off",
      count: count,
    },
    headers: {
      "x-bingapis-sdk": "true",
      "x-rapidapi-host": process.env.CN_RAPIDAPI_HOST,
      "x-rapidapi-key": process.env.CN_RAPIDAPI_KEY,
    },
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

module.exports = { getCryptoNews };
