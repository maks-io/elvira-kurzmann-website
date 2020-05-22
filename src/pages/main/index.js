import React, { Component } from "react";
import axios from "axios";
import _ from "lodash";
import Modal from "react-modal";
import Picture from "../../components/picture";
import { slide as Menu } from "react-burger-menu";
import { menuStyles } from "./styles";
import colors from "../../colors";
import config from "../../config";
import CONSTANTS from "../../constants";
import { preparePictures } from "../../services/prepare-pictures";
import FocusedPicture from "../../components/focused-picture";
import { getInstagramUrl } from "../../services/get-instagram-url";
import ContactForm from "../../components/contact-form";

class MenuItem extends Component {
  state = { isHovered: false };

  render() {
    const { id, name, onClick, closeMenu } = this.props;
    return (
      <div
        id={id}
        className="bm-item"
        onClick={() => {
          onClick();
          closeMenu();
        }}
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

class FilterTag extends Component {
  render() {
    const { name, title, active, onClick, color } = this.props;
    return (
      <div
        title={title}
        onClick={onClick}
        style={{
          fontSize: 11,
          fontWeight: "bold",
          padding: "3px 6px",
          margin: 5,
          backgroundColor: color,
          color: colors.colorC,
          opacity: !active && 0.4,
          cursor: "pointer",
        }}
      >
        {name}
      </div>
    );
  }
}

class Main extends Component {
  state = {
    menuOpen: false,
    pictures: [],
    focusedPicture: undefined,
    impressumIsOpen: false,
    kontaktIsOpen: false,
    paintingSubjectFilter: undefined,
    availablePaintingSubjects: [],
  };

  componentDidMount = async () => {
    const url = getInstagramUrl(config.userId, config.limit);
    const fetchedPictureData = await axios.get(url);
    const pictures = preparePictures(fetchedPictureData);
    const availablePaintingSubjects = Object.keys(
      _.countBy(pictures, "parsedDescription.paintingSubject")
    ).map((ps) => ps.toUpperCase()).sort();
    this.setState({
      pictures,
      availablePaintingSubjects,
    });

    Modal.setAppElement("#outer-container");
  };

  handleStateChange(state) {
    this.setState({ menuOpen: state.isOpen });
  }

  closeMenu = () => {
    this.setState({ menuOpen: false });
  };

  toggleMenu() {
    this.setState((state) => ({ menuOpen: !state.menuOpen }));
  }

  setFocus = (pictureId) => {
    this.setState({ focusedPicture: pictureId });
  };

  closeModals = () => {
    this.setState({ impressumIsOpen: false, kontaktIsOpen: false });
  };

  render() {
    const filter = this.state.focusedPicture && "blur(6px)";
    const focusedPictureData =
      this.state.focusedPicture &&
      this.state.pictures.filter((p) => p.id === this.state.focusedPicture)[0];

    const filteredPictures = this.state.pictures.filter(
      (ps) =>
        !this.state.paintingSubjectFilter ||
        ps.parsedDescription.paintingSubject.toUpperCase() ===
          this.state.paintingSubjectFilter
    );

    return (
      <React.Fragment>
        <div
          id="outer-container"
          style={{
            fontFamily: "Roboto Slab",
            backgroundImage: `linear-gradient(to right bottom, ${colors.colorC}, ${colors.colorB}), url("/assets/background/bg2.jpg")`,
            backgroundBlendMode: "hue",
            backgroundPosition: "center center",
            backgroundSize: "cover",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            filter,
          }}
          onClick={() => {
            if (this.state.focusedPicture) {
              this.setState({ focusedPicture: undefined });
            }
          }}
        >
          <Menu
            right
            styles={{ ...menuStyles }}
            isOpen={this.state.menuOpen}
            onStateChange={(state) => this.handleStateChange(state)}
          >
            <MenuItem
              id={"start"}
              name={"Startseite"}
              onClick={this.closeModals}
              closeMenu={this.closeMenu}
            />
            <MenuItem
              id={"kontakt"}
              name={"Kontakt"}
              onClick={() => this.setState({ kontaktIsOpen: true })}
              closeMenu={this.closeMenu}
            />
            <MenuItem
              id={"impressum"}
              name={"Impressum"}
              onClick={() => this.setState({ impressumIsOpen: true })}
              closeMenu={this.closeMenu}
            />
          </Menu>
          <main
            id="page-wrap"
            style={{
              height: "100vh",
              display: "flex",
              flexDirection: "column",
              width: "80vw",
            }}
          >
            <div
              className={"title"}
              style={{
                display: "flex",
                textAlign: "center",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: 500,
                fontSize: "3rem",
                color: colors.colorB,
                flexDirection: "column",
                marginTop: "2rem",
              }}
            >
              <div
                style={{
                  margin: "0 1rem",
                  lineHeight: "2rem",
                  opacity: 0.65,
                  filter: "drop-shadow(0px 0px 45px black)",
                }}
              >
                Elvira Kurzmann
              </div>
              <div
                style={{
                  margin: "0.3rem 0.2rem",
                  fontSize: "1rem",
                  opacity: 1.0,
                  filter: "drop-shadow(0px 0px 45px black)",
                }}
              >
                Malen und Kunst aus Stockerau
              </div>
              <style>
                {`
                   .title {
                       animation: moveTitle 4s forwards;
                   }
                   
                   @keyframes moveTitle {
                     0% {
                       opacity: 0;
                       height: ${window.innerHeight}px;
                     }
                     50% {
                       opacity: 1;
                       height: ${window.innerHeight}px;
                     }
                     100% {
                       height: 8rem;
                     }
                   }
              `}
              </style>
            </div>
            <div
              className={"filters"}
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                pointerEvents: focusedPictureData && "none",
                marginBottom: "2rem",
              }}
            >
              {["ALLE THEMEN", ...this.state.availablePaintingSubjects].map(
                (ps, index) => (
                  <FilterTag
                    name={ps}
                    color={colors.colorF}
                    active={
                      index === 0
                        ? !this.state.paintingSubjectFilter
                        : !this.state.paintingSubjectFilter ||
                          this.state.paintingSubjectFilter === ps
                    }
                    onClick={() => {
                      if (this.state.paintingSubjectFilter === ps) {
                        this.setState({ paintingSubjectFilter: undefined });
                      } else {
                        this.setState({
                          paintingSubjectFilter: index === 0 ? undefined : ps,
                        });
                      }
                    }}
                  />
                )
              )}
            </div>
            <style>
              {`
                   .filters {
                       animation: fadeFilters 7s forwards;
                   }
                   
                   @keyframes fadeFilters {
                     0% {
                       opacity: 0;
                     }
                     50% {
                       opacity: 0;
                     }
                     100% {
                       opacity: 1;
                     }
                   }
              `}
            </style>
            <div
              className={"gallery"}
              style={{
                display: "flex",
                flex: 1,
                flexWrap: "wrap",
                justifyContent: "center",
                maxHeight: "min-content",
                overflowX: "hidden",
                pointerEvents: focusedPictureData && "none",
              }}
            >
              {filteredPictures.map((p, index) => (
                <Picture
                  key={`picture-${index}`}
                  data={p}
                  setFocus={this.setFocus}
                />
              ))}
            </div>
            <style>
              {`
                   .gallery {
                       animation: galleryFadeIn 5s forwards;
                   }
                   
                   @keyframes galleryFadeIn {
                     0% {
                       opacity: 0;
                     }
                     50% {
                       opacity: 0;
                     }
                     100% {
                       opacity: 1;
                     }
                   }
              `}
            </style>
          </main>
        </div>
        <FocusedPicture
          data={focusedPictureData}
          onClick={() => this.setState({ focusedPicture: undefined })}
        />
        <Modal
          isOpen={this.state.kontaktIsOpen}
          onRequestClose={this.closeModals}
        >
          <ContactForm handleClose={this.closeModals} />
        </Modal>
        <Modal
          isOpen={this.state.impressumIsOpen}
          onRequestClose={this.closeModals}
        >
          <div
            onClick={this.closeModals}
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              height: "100%",
            }}
          >
            <h2>Impressum</h2>
            <h3>Elvira Kurzmann</h3>
            <h4>Malen und Kunst aus Stockerau</h4>
            <p>
              Theodor Körner-Straße 6<br />
              2000 Stockerau
            </p>
          </div>
        </Modal>
        <style>
          {`
                      .ReactModal__Overlay {
                        z-index: 9999;
                      }
                    `}
        </style>
      </React.Fragment>
    );
  }
}

export default Main;
