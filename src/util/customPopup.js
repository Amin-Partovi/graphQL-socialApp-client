import { Popup } from "semantic-ui-react";

const CustomPopup = ({ content, children }) => (
  <Popup content={content} trigger={children} inverted></Popup>
);

export default CustomPopup;
