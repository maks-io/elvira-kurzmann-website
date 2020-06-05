import React, { Component } from "react";
import axios from "axios";
import _ from "lodash";
import Modal from "react-modal";
import colors from "../../colors";
import config from "../../config";
import { preparePictures } from "../../services/prepare-pictures";
import FocusedPicture from "../../components/focused-picture";
import { getInstagramUrl } from "../../services/get-instagram-url";
import ContactFormModal from "../../modals/contact-form-modal";
import SiteNoticeModal from "../../modals/site-notice-modal";
import TitleSection from "../../components/title-section";
import FilterSection from "../../components/filter-section";
import GallerySection from "../../components/gallery-section";
import Drawer from "../../components/drawer";
import AboutMeModal from "../../modals/about-me-modal";

class Main extends Component {
  state = {
    drawerIsOpen: false,
    aboutMeModalIsOpen: false,
    contactModalIsOpen: false,
    siteNoticeModalIsOpen: false,
    pictures: [],
    focusedPicture: undefined,
    paintingSubjectFilter: undefined,
    availablePaintingSubjects: [],
  };

  componentDidMount = async () => {
    const url = getInstagramUrl(config.userId, config.limit);
    const fetchedPictureData = await axios.get(url);
    const pictures = preparePictures(fetchedPictureData);
    const availablePaintingSubjects = Object.keys(
      _.countBy(pictures, "parsedDescription.paintingSubject")
    )
      .map((ps) => ps.toUpperCase())
      .sort();
    this.setState({
      pictures,
      availablePaintingSubjects,
    });

    Modal.setAppElement("#outer-container");
  };

  handleToggleDrawer = (isOpen = !this.state.drawerIsOpen) => {
    this.setState({ drawerIsOpen: isOpen });
  };

  handleToggleAboutMeModal = (isOpen = !this.state.aboutMeModalIsOpen) => {
    this.setState({
      aboutMeModalIsOpen: isOpen,
    });
  };

  handleToggleContactModal = (isOpen = !this.state.contactModalIsOpen) => {
    this.setState({
      contactModalIsOpen: isOpen,
    });
  };

  handleToggleSiteNoticeModal = (
    isOpen = !this.state.siteNoticeModalIsOpen
  ) => {
    this.setState({
      siteNoticeModalIsOpen: isOpen,
    });
  };

  closeModals = () => {
    this.setState({
      aboutMeModalIsOpen: false,
      contactModalIsOpen: false,
      siteNoticeModalIsOpen: false,
    });
  };

  setFocus = (pictureId) => {
    this.setState({ focusedPicture: pictureId });
  };

  setPaintingSubjectFilter = (paintingSubject, index) => {
    if (this.state.paintingSubjectFilter === paintingSubject) {
      this.setState({ paintingSubjectFilter: undefined });
    } else {
      this.setState({
        paintingSubjectFilter: index === 0 ? undefined : paintingSubject,
      });
    }
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
          <Drawer
            isOpen={this.state.drawerIsOpen}
            handleToggleDrawer={this.handleToggleDrawer}
            handleToggleAboutMeModal={this.handleToggleAboutMeModal}
            handleToggleContactModal={this.handleToggleContactModal}
            handleToggleSiteNoticeModal={this.handleToggleSiteNoticeModal}
            handleCloseModals={this.closeModals}
          />
          <main
            id="page-wrap"
            style={{
              height: "100vh",
              display: "flex",
              flexDirection: "column",
              width: "80vw",
            }}
          >
            <TitleSection>
            <FilterSection
              focusedPictureData={focusedPictureData}
              paintingSubjectFilter={this.state.paintingSubjectFilter}
              setPaintingSubjectFilter={this.setPaintingSubjectFilter}
              availablePaintingSubjects={this.state.availablePaintingSubjects}
            /></TitleSection>
            <GallerySection
              focusedPictureData={focusedPictureData}
              filteredPictures={filteredPictures}
              setFocus={this.setFocus}
            />
          </main>
        </div>
        <FocusedPicture
          data={focusedPictureData}
          onClick={() => this.setState({ focusedPicture: undefined })}
        />
        <AboutMeModal
          isOpen={this.state.aboutMeModalIsOpen}
          handleClose={this.closeModals}
        />
        <ContactFormModal
          isOpen={this.state.contactModalIsOpen}
          handleClose={this.closeModals}
        />
        <SiteNoticeModal
          isOpen={this.state.siteNoticeModalIsOpen}
          handleClose={this.closeModals}
        />
      </React.Fragment>
    );
  }
}

export default Main;
