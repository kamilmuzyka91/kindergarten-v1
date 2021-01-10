import React from "react";

import Navigation from "../Navigation";

const iframeStyle = {
  border: 0,
  width: 800,
  height: 600,
  frameborder: 0,
};

const Callendar = () => (
  <>
    <Navigation />
    <div className="callendar">
      <iframe
        src="https://calendar.google.com/calendar/embed?height=600&amp;wkst=2&amp;bgcolor=%237CB342&amp;ctz=Europe%2FWarsaw&amp;src=cHJ6ZWRzemtvbGV3cm9ibG93aWNlQGdtYWlsLmNvbQ&amp;src=cGwucG9saXNoI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&amp;color=%23039BE5&amp;color=%230B8043&amp;showNav=1&amp;showTabs=1&amp;showCalendars=0&amp;showTz=1&amp;title=Akacjowe%20Przedszkole"
        title="kalendarz"
        style={iframeStyle}
      ></iframe>
    </div>
  </>
);

export default Callendar;
