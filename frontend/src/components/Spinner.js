import React from "react";

export default function Spinner() {
    return (
        <div style={styles.flexRow}>
            <div className="preloader-wrapper small active">
                <div style={{ borderColor: "black" }} className="spinner-layer">
                    <div className="circle-clipper left">
                        <div className="circle"></div>
                    </div>
                    <div className="gap-patch">
                        <div className="circle"></div>
                    </div>
                    <div className="circle-clipper right">
                        <div className="circle"></div>
                    </div>
                </div>
            </div>
            <span style={{ marginTop: "10px" }}>Loading grades</span>
        </div>
    );
}

const styles = {
    flexRow: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
};
