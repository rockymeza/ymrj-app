import { ThemeProvider, Styled } from "theme-ui";

import theme from "../utils/theme";
import { AuthProvider } from "../utils/useAuth";

const MyApp = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <Styled.root>
          <Component {...pageProps} />
        </Styled.root>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default MyApp;
