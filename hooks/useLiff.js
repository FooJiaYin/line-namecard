// const LiffContext = React.createContext(null);

import { createContext, useContext } from "react";
import { createElement, useEffect, useState } from "react";
import liff, { initLiff } from "../utils/liff";

export const useLoginStateManager = (liff) => {
  const {
    isLoggedIn = () => false,
    login = () => {},
    logout = () => {},
    ...rest
  } = liff ?? {};
  const [loginState, setLoginState] = useState(false);

  useEffect(() => {
    setLoginState(isLoggedIn());
  }, [isLoggedIn]);

  const customLogin = (...args) => {
    login(...args);
    setLoginState(isLoggedIn());
  };
  const customLogout = () => {
    logout();
    setLoginState(isLoggedIn());
  };

  return [
    loginState,
    { ...rest, isLoggedIn, login: customLogin, logout: customLogout },
  ];
};

const createLiffProvider = (context) => {
  const LiffProvider = ({ children, ...rest }) => {
    const [error, setError] = useState();
    const [isReady, setIsReady] = useState(false);

    const [originalLiff, setLiff] = useState();
    const [isLoggedIn, liff] = useLoginStateManager(originalLiff);

    useEffect(() => {
      (async () => {
        if (navigator.userAgent.includes("Line/")) {
          window.open(window.location.href.replace(process.env.DOMAIN_URL, process.env.LIFF_URL), "_blank");
        }
        try {
          setLiff(await initLiff(rest));
          setIsReady(true);
        } catch (e) {
          setError(e);
        }
      })();
    }, [rest]);

    return createElement(
      context.Provider,
      { value: { error, isLoggedIn, isReady, liff } },
      children
    );
  };

  return LiffProvider;
};

export const createLiffContext = () => {
  const context = createContext({
    isLoggedIn: false,
    isReady: false,
    liff: liff,
  });
  context.displayName = "LiffContext";

  return {
    LiffConsumer: context.Consumer,
    LiffProvider: createLiffProvider(context),
    useLiff: () => useContext(context),
  };
};

export const { LiffConsumer, LiffProvider, useLiff } = createLiffContext();

// export default LiffContext;
