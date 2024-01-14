import "overlayscrollbars/overlayscrollbars.css";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";

const Scroll = ({ children }: { children: React.ReactNode }) => {
  return (
    <OverlayScrollbarsComponent
      className="overlayscrollbars-react"
      options={{
        scrollbars: {
          theme: "ssn-theme",
          autoHide: "scroll",
          autoHideDelay: 5000,
          dragScroll: true,
        },
      }}
      defer
    >
      {children}
    </OverlayScrollbarsComponent>
  );
};

export default Scroll;
