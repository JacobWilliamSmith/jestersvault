import { useEffect } from "react";
import { useDispatch } from "react-redux";

import CharacterList from "./CharacterList";
import TopAppBar from "./TopAppBar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import BottomAppBar from "./BottomAppBar";
import "../css/App.css";
import { red } from "@mui/material/colors";

import { checkReducersForUpdates } from "../actions";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkReducersForUpdates());
  }, []);

  const theme = createTheme({
    palette: {
      primary: {
        main: red[900],
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <TopAppBar />
      <CharacterList />
      <BottomAppBar />
    </ThemeProvider>
  );
}

export default App;
