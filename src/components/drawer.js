import React, { Component } from "react";
import { menuStyles } from "../pages/main/styles";
import { slide as Menu } from "react-burger-menu";
import colors from "../colors";

const Drawer = (props) => {
  const {
    isOpen,
    handleToggleDrawer,
    handleToggleContactModal,
    handleToggleSiteNoticeModal,
    handleCloseModals,
  } = props;

  return (
    <Menu
      right
      styles={{ ...menuStyles }}
      isOpen={isOpen}
      onStateChange={(drawerState) => handleToggleDrawer(drawerState.isOpen)}
    >
      <MenuItem
        id={"menu-entry-contact-form"}
        name={"Kontakt"}
        onClick={() => {
          handleToggleContactModal(true);
          handleToggleDrawer(false);
        }}
      />
      <MenuItem
        id={"menu-entry-site-notice"}
        name={"Impressum"}
        onClick={() => {
          handleToggleSiteNoticeModal(true);
          handleToggleDrawer(false);
        }}
      />
    </Menu>
  );
};

class MenuItem extends Component {
  state = { isHovered: false };

  render() {
    const { id, name, onClick } = this.props;
    return (
      <div
        id={id}
        className="bm-item"
        onClick={onClick}
        style={{
          display: "flex",
          margin: "1rem",
          color: this.state.isHovered ? colors.colorD : colors.colorC,
          textDecoration: "none",
          cursor: "pointer",
        }}
        onMouseEnter={() => this.setState({ isHovered: true })}
        onMouseLeave={() => this.setState({ isHovered: false })}
      >
        {name}
      </div>
    );
  }
}

export default Drawer;
