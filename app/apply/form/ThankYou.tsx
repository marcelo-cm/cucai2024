import React, { useEffect } from "react";

/**
 * The thank you page after submitting the application that redirects you to the dashboard
 * @returns The thank you page after submitting the application
 */
const ThankYou = () => {
  useEffect(() => {
    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 3000);
  }, []);

  return (
    <div>
      Your application has been submitted successfully. You will be redirected
      to the dashboard in a couple of seconds.
    </div>
  );
};

export default ThankYou;
