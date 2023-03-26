import { useEffect, useState } from "react";
import { getShortenedURL } from "../../services/BitlyApi";
import Alert from "@mui/material/Alert";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Sheet,
  Typography,
} from "@mui/joy";

const URLShortenerCard = () => {
  const [url, setURL] = useState("");
  const [shortURL, setShortURL] = useState("");
  const [errorDescription, setErrorDescription] = useState();

  const handleClick = async () => {
    const data = await getShortenedURL(url);

    if (data.link === undefined) {
      setErrorDescription(data.response.data.description);
      setShortURL("");
    } else {
      setErrorDescription(undefined);
      setShortURL(data.link);
    }
  };

  const handleChange = async (event) => {
    setURL(event.target.value);
  };

  useEffect(() => {
    console.log("Vous souhaitez générer ce lien: " + url);
    /*
     *  Je ne voyais pas l'utilité d'utiliser un useEffect dans ce projet (je sais l'utiliser 🙂). Je serai ravi d'en discuter avec vous lors de notre entretien !
     */
  }, [url]);

  return (
    <Sheet
      sx={{
        width: 300,
        mx: "auto",
        my: "15%",
        py: 3, // padding top & bottom
        px: 2, // padding left & right
        display: "flex",
        flexDirection: "column",
        gap: 2,
        borderRadius: "sm",
        boxShadow: "md",
      }}
      variant="outlined"
    >
      <Typography level="h4" component="h1">
        <b>URL Shortener</b>
      </Typography>
      {shortURL && (
        <Alert variant="outlined" severity="success">
          {shortURL}
        </Alert>
      )}
      {errorDescription && (
        <Alert variant="outlined" severity="error">
          {errorDescription}
        </Alert>
      )}
      <FormControl>
        <FormLabel>Url to short</FormLabel>
        <Input
          name="url"
          type="url"
          placeholder="https://google.fr"
          onChange={handleChange}
        />
      </FormControl>
      <Button sx={{ mt: 1 }} onClick={handleClick}>
        Short it!
      </Button>
    </Sheet>
  );
};

export default URLShortenerCard;
