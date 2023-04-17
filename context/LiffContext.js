import React from "react";

// const LiffContext = React.createContext(null);

import { createContext, useContext } from "react";

import { createElement, useEffect, useState } from "react";

const getLiff = async () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore: This is an issue of @line/liff
  return window.liff ?? (await import("@line/liff")).default;
};

const registerLiffPlugin = (liff, plugin) => {
  Array.isArray(plugin) ? liff.use(...plugin) : liff.use(plugin);
};

const getInitializedLiff = async ({
  plugins = [],
  callback = () => {},
  ...liffConfig
}) => {
  const liff = await getLiff();

  plugins.forEach((plugin) => registerLiffPlugin(liff, plugin));
  await liff.init(liffConfig);
  await callback(liff);

  return liff;
};

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
        try {
          setLiff(await getInitializedLiff(rest));
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
    liff: {},
  });
  context.displayName = "LiffContext";

  return {
    LiffConsumer: context.Consumer,
    LiffProvider: createLiffProvider(context),
    useLiff: () => useContext(context),
  };
};

const { LiffConsumer, LiffProvider, useLiff } = createLiffContext();

export { LiffConsumer, LiffProvider, useLiff };

// export default LiffContext;
