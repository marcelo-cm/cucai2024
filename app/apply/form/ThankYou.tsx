import React, { useEffect } from "react";

const ThankYou = () => {
  useEffect(() => {
    setTimeout(() => {
      window.location.href = "/dashboard/delegate";
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
