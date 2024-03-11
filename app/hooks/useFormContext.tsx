import { useContext } from "react";
import ApplyFormContext from "../context/ApplyFormContext";

const useFormContext = () => {
  return useContext(ApplyFormContext);
};

export default useFormContext;
