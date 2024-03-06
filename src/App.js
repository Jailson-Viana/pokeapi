import { ThemeProvider } from "./contexts";
import { AppRoute } from "./route";
import { GlobalStyle } from "./services/reset-global";

function App() {
  return (
    <>
      <ThemeProvider>
        <GlobalStyle />
        <AppRoute />
      </ThemeProvider>
    </>
  )
}

export default App;
