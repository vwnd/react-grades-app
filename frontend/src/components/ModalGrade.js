import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Modal from "react-modal";

import * as api from "../api/apiService";

Modal.setAppElement("#root");

export default function ModalGrade({ onSave, onClose, selectedGrade }) {
    const { id, student, subject, type } = selectedGrade;
    const [gradeValue, setGradeValue] = useState(selectedGrade.value);
    const [gradeValidation, setGradedValidation] = useState({});
    const [errorMessage, setErrorMessage] = useState("Teste");

    useEffect(() => {
        async function getValidation() {
            const validation = await api.getValidationFromGradeType(type);
            setGradedValidation(validation);
        }
        getValidation();
    }, [type]);

    useEffect(() => {
        const { minValue, maxValue } = gradeValidation;

        if (gradeValue < minValue || gradeValue > maxValue) {
            setErrorMessage(
                `Grade value is out of range. Min: ${minValue} / Max: ${maxValue}.`
            );
            return;
        }
        setErrorMessage("");
    }, [gradeValue, gradeValidation]);

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    });

    const handleKeyDown = (event) => {
        if (event.key === "Escape") {
            onClose(null);
        }
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();

        const formData = {
            id,
            newValue: gradeValue,
        };
        onSave(formData);
    };
    const handleGradeChange = (event) => {
        setGradeValue(+event.target.value);
    };

    const handleModalClose = (event) => {
        onClose(null);
    };

    return (
        <div>
            <Modal isOpen={true}>
                <div style={styles.flexRow}>
                    <span style={styles.title}>Edit</span>
                    <button
                        className="waves-effect waves-light btn-small red dark-4"
                        onClick={handleModalClose}
                    >
                        Close
                    </button>
                </div>
                <form onSubmit={handleFormSubmit}>
                    <div className="input-field">
                        <input
                            id="inputName"
                            type="text"
                            value={student}
                            readOnly
                        />
                        <label className="active" htmlFor="inputName">
                            Student name:
                        </label>
                    </div>
                    <div className="input-field">
                        <input
                            id="inputSubject"
                            type="text"
                            value={subject}
                            readOnly
                        />
                        <label className="active" htmlFor="inputSubject">
                            Subject:
                        </label>
                    </div>
                    <div className="input-field">
                        <input
                            id="inputType"
                            type="text"
                            value={type}
                            readOnly
                        />
                        <label className="active" htmlFor="inputType">
                            Type:
                        </label>
                    </div>

                    <div className="input-field">
                        <input
                            id="inputGrade"
                            type="number"
                            min={gradeValidation.minValue}
                            max={gradeValidation.maxValue}
                            step="1"
                            autoFocus
                            value={gradeValue}
                            onChange={handleGradeChange}
                        ></input>
                        <label className="active" htmlFor="inputGrade">
                            Grade:
                        </label>
                    </div>
                    <div style={styles.flexRow}>
                        <button
                            className="waves-effect waves-light btn"
                            disabled={errorMessage.trim() !== ""}
                        >
                            Save
                        </button>
                        <span style={styles.errorMessage}>{errorMessage}</span>
                    </div>
                </form>
            </Modal>
        </div>
    );
}

const styles = {
    flexRow: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "40px",
    },
    errorMessage: {
        color: "red",
    },
    title: {
        fontSize: "1.3rem",
        fontWeight: "bold",
    },
};
