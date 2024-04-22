import { useContext } from "react";
import ApplyFormContext from "../context/ApplyFormContext";

/**
 * @returns The context of the application form
 */
const useFormContext = () => {
  return useContext(ApplyFormContext);
};

export default useFormContext;
