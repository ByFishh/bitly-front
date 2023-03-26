import axios from "axios";

const getShortenedURL = (url) => {
  const endpoint = "https://api-ssl.bitly.com/v4/shorten";
  return axios
    .post(
      endpoint,
      { long_url: url },
      {
        headers: {
          Authorization: "Bearer " + process.env.REACT_APP_BITLY_TOKEN,
        },
      }
    )
    .then((response) => response.data)
    .catch((response) => response);
};

export { getShortenedURL };
