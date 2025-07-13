import { jsx as _jsx } from "react/jsx-runtime";
export const AnswerDisplay = ({ answer }) => {
    if (!answer)
        return null;
    return (_jsx("div", { className: "answer-mystic-simple", children: _jsx("p", { className: "answer-text-simple", children: answer }) }));
};
