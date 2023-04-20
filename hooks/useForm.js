import { createContext, useContext, useState } from "react";

const FormContext = createContext();

/**
 * @example
 * ```js
 * const [data, setData] = useState({});
 * return (
 *  <FormProvider value={[data, setData]}>
 *   <Input label="姓名" field="name" />
 *  </FormProvider>
 * )
 * ```
 */
export const FormProvider = ({ value, children }) => {
  const contextValue = value || useState({});
  return (
    <FormContext.Provider value={contextValue}>{children}</FormContext.Provider>
  );
};

/**
 * Hook to access the FormContext
 * @example
 * ```js
 *  const [formData, setFormData] = useForm();
 * ```
 */
export const useForm = () => useContext(FormContext);
