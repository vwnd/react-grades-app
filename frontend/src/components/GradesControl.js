import React from "react";
import Action from "./Action";

export default function GradesControl(props) {
    const { grades, onDelete, onPersist } = props;

    const tableGrades = [];
    let currentStudent = grades[0].student;
    let currentSubject = grades[0].subject;
    let currentGrades = [];
    let id = 1;

    // isolating grades by disciplines
    grades.forEach((grade) => {
        if (grade.subject !== currentSubject) {
            tableGrades.push({
                id: id++,
                student: currentStudent,
                subject: currentSubject,
                grades: currentGrades,
            });

            currentSubject = grade.subject;
            currentGrades = [];
        }

        if (grade.student !== currentStudent) {
            currentStudent = grade.student;
        }
        currentGrades.push(grade);
    });

    tableGrades.push({
        id: id++,
        student: currentStudent,
        subjec: currentSubject,
        grades: currentGrades,
    });

    const handleActionClick = (id, type) => {
        const grade = grades.find((grade) => grade.id === id);

        if (type === "delete") {
            onDelete(id);
            return;
        }

        if (type === "add" || type === "edit") {
            onPersist(grade);
            return;
        }
    };

    return (
        <div className="container center">
            {tableGrades.map((tableGrade) => {
                const finalGrade = tableGrade.grades.reduce(
                    (acc, curr) => acc + curr.value,
                    0
                );

                const gradeStyle =
                    finalGrade >= 70 ? styles.goodGrade : styles.badGrade;

                return (
                    <table
                        style={styles.table}
                        className="striped center"
                        key={tableGrade.id}
                    >
                        <thead>
                            <tr>
                                <th style={{ width: "20%" }}>Student</th>
                                <th style={{ width: "20%" }}>Course</th>
                                <th style={{ width: "20%" }}>Type</th>
                                <th style={{ width: "20%" }}>Grade</th>
                                <th style={{ width: "20%" }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableGrade.grades.map(
                                ({
                                    id,
                                    subject,
                                    student,
                                    type,
                                    value,
                                    isDeleted,
                                }) => {
                                    return (
                                        <tr key={id}>
                                            <td>{student}</td>
                                            <td>{subject}</td>
                                            <td>{type}</td>
                                            <td>{isDeleted ? "N/A" : value}</td>
                                            <td>
                                                <div>
                                                    <Action
                                                        onActionClick={
                                                            handleActionClick
                                                        }
                                                        id={id}
                                                        type={
                                                            isDeleted
                                                                ? "add"
                                                                : "edit"
                                                        }
                                                    />
                                                    {!isDeleted && (
                                                        <Action
                                                            onActionClick={
                                                                handleActionClick
                                                            }
                                                            id={id}
                                                            type="delete"
                                                        />
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                }
                            )}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td style={{ textAlign: "right" }}>
                                    <strong>Total</strong>
                                </td>
                                <td>
                                    <span style={gradeStyle}>{finalGrade}</span>
                                </td>
                                <td>&nbsp;</td>
                            </tr>
                        </tfoot>
                    </table>
                );
            })}
        </div>
    );
}

const styles = {
    goodGrade: {
        fontWeight: "bold",
        color: "green",
    },
    badGrade: {
        fontWeight: "bold",
        color: "red",
    },
    table: {
        margin: "20px",
        padding: "10px",
    },
};
