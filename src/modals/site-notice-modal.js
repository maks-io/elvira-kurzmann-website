import React from "react";
import Modal from "react-modal";

const SiteNoticeModal = ({isOpen,handleClose}) => {

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={handleClose}
        >
            <div
                onClick={handleClose}
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
    );
}

export default SiteNoticeModal
