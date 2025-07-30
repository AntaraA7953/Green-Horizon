import { useEffect } from "react";

const Wasteless = () => {
  useEffect(() => {
    // Replace current page with external site
    window.location.replace("https://trash-vision-classify-it.vercel.app/");
  }, []);

  
};

export default Wasteless;
