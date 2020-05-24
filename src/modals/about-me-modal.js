import React from "react";
import Modal from "react-modal";
import colors from "../colors";
import constants from "../constants";

const AboutMeModal = ({ isOpen, handleClose }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={handleClose}>
      <div
        onClick={handleClose}
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          height: "100%",
          letterSpacing: 1,
        }}
      >
        <div>
          <h2>Über mich</h2>
          <img src={constants.PROFILE_PICTURE_URL} />
          <p>
            Ich werde immer wieder gefragt, welche Technik ich bevorzuge:
            <br />
            Gefesselt von der Leichtigkeit zugleich aber auch Schwierigkeit des
            Aquarells nimmt es eindeutig eine bevorzugte Stellung ein.
          </p>
          <p>
            Einfach gesagt: das Malen fasziniert mich und lässt mich nicht mehr
            los.
          </p>
        </div>
        <div
          style={{
            marginTop: "5rem",
            marginBottom: "5rem",
            fontStyle: "italic",
            color: colors.colorA,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div>
            <div
              style={{
                maxWidth: "max-content",
              }}
            >
              <q>
                Zeichnen ist Sprache für die Augen,
                <br />
                Sprache ist Malerei für das Ohr.
              </q>
            </div>
            <div>
              <p style={{ textAlign: "right", margin: "0.3rem" }}>
                &#8722; Joseph Joubert
              </p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AboutMeModal;
