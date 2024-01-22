import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga4";

const withPageTracking = (WrappedComponent: any) => {
  return (props: any) => {
    const location = useLocation();

    useEffect(() => {
      // Gửi dữ liệu theo dõi Google Analytics khi route thay đổi
      ReactGA.send({
        hitType: "pageview",
        page: location.pathname + location.search,
      });
    }, [location]);

    return <WrappedComponent {...props} />;
  };
};

export default withPageTracking;
