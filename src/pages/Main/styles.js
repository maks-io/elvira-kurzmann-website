import colors from "../../colors";

export const menuStyles = {
  bmBurgerButton: {
    position: "fixed",
    width: "36px",
    height: "30px",
    right: "36px",
    top: "36px",
    opacity: 0.7,
  },
  bmBurgerBars: {
    background: colors.colorB,
  },
  bmBurgerBarsHover: {
    background: "#a90000",
  },
  bmCrossButton: {
    height: "24px",
    width: "24px",
  },
  bmCross: {
    background: colors.colorB,
  },
  bmMenuWrap: {
    display: "flex",
    fontSize: "1.8rem",
    textDecoration: "none",
  },
  bmMenu: {
    background: colors.colorB,
    padding: "2.5em 1.5em 0",
    fontSize: "1.15em",
    flex: 1,
    display: "flex",
    height: "initial",
  },
  bmMorphShape: {
    background: colors.colorB,
  },
  bmItemList: {
    color: "#b8b7ad",
    padding: "0.8em",
    display: "flex",
    flexDirection: "column",
    flex: 1,
    alignItems: "flex-end",
    height: "initial",
  },
  bmItem: {},
  bmOverlay: {
    background: "rgba(0, 0, 0, 0.3)",
    left: 0,
  },
};
