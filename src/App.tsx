import React from "react";
import { BreakpointProvider } from "react-socks";
import "shared/assets/scss/index.scss";
// import "animate.css";
import { Buffer } from "buffer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { Helmet, HelmetProvider } from "react-helmet-async";

// Pages
import  Farmer from "farmer/Farmer";
import DefaultLayout from "shared/layouts/DefaultLayout";
import Investor  from "investor/Investor";

// Contexts
import { MetamaskContextProvider } from "shared/context/MetamaskContext";

export const websiteName = "Metamask";


class ErrorBoundary extends React.Component<
  { children: any },
  { hasError: boolean }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    console.error(error);
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    // You can also log the error to an error reporting service
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <BreakpointProvider>
    <HelmetProvider>
      <BrowserRouter>
          <MetamaskContextProvider>
              <DefaultLayout>
                <App />
              </DefaultLayout>
          </MetamaskContextProvider>
      </BrowserRouter>
    </HelmetProvider>
  </BreakpointProvider>
);

export default function App() {
  return (
    <>
      <Routes>
        {/*<Route path="/" element={<Dashboard />} />*/}
        <Route path="/farmer" element={<Farmer />} />
        <Route path="/investor" element={<Investor />} />
      </Routes>
    </>
  );
}
