import { createContext, useContext, useState } from "react";

const FormContext = createContext();

export const FormProvider = ({ value, children }) => {
  const contextValue = value || useState({});
  return (
    <FormContext.Provider value={contextValue}>
      <form>{children}</form>
    </FormContext.Provider>
  );
};

export const useForm = () => useContext(FormContext);
