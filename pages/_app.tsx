import "../styles/globals.css";
import type { AppProps } from "next/app";
import { TimerProvider } from "../components/TimerProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <TimerProvider>
      <Component {...pageProps} />
    </TimerProvider>
  );
}
export default MyApp;
