import "../styles/globals.css";

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
      <Provider store={store}>
        {getLayout(<Component {...pageProps} />)}
      </Provider>
    </ThemeProvider>
  );
}

export default App;
