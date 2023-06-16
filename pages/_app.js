import "../styles/globals.css";

import { CssBaseline } from "@mui/material";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Provider } from "react-redux";

import Layout from "../components/layout/Layout";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

import store from "../store/";

function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);

  return (
    <ThemeProvider theme={darkTheme}>
      {/* <CssBaseline /> */}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Provider store={store}>
          {getLayout(<Component {...pageProps} />)}
        </Provider>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
