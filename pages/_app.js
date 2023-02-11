import "../styles/globals.css";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import Layout from "../components/layout/Layout";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
  typography: {
    fontSize: 10,
    fontWeightMedium: 500,
  },
});

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);

  return (
    <ThemeProvider theme={darkTheme}>
      {getLayout(<Component {...pageProps} />)}
    </ThemeProvider>
  );
}
