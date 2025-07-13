import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
export const QuestionInput = ({ onSubmit, disabled = false }) => {
    const [question, setQuestion] = useState('');
    const { t } = useTranslation();
    const textareaRef = useRef(null);
    const handleChange = (e) => {
        setQuestion(e.target.value);
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (question.trim() === '' || disabled)
            return;
        onSubmit(question);
        setQuestion('');
        if (textareaRef.current)
            textareaRef.current.style.height = 'auto';
        textareaRef.current?.focus();
    };
    return (_jsxs("form", { onSubmit: handleSubmit, className: "input-row", children: [_jsx("textarea", { ref: textareaRef, value: question, onChange: handleChange, className: "input-magic textarea-magic", placeholder: t('placeholder') || "Ask your question...", maxLength: 240, rows: 1, autoFocus: true, disabled: disabled, style: { resize: 'none', minHeight: '2.6em', overflow: 'hidden' } }), question && !disabled && (_jsx("button", { type: "button", className: "btn-clear", onClick: () => {
                    setQuestion('');
                    if (textareaRef.current)
                        textareaRef.current.style.height = 'auto';
                }, tabIndex: -1, "aria-label": t('clear') || 'Clear', children: _jsx("span", { children: "\u00D7" }) })), _jsxs("button", { type: "submit", className: "btn-magic", "aria-label": t('ask') || "Ask", disabled: disabled, children: [_jsxs("svg", { viewBox: "0 0 24 24", width: "24", height: "24", className: "icon-wand", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [_jsx("path", { d: "M15 4V2" }), _jsx("path", { d: "M15 16v-2" }), _jsx("path", { d: "M8 9h2" }), _jsx("path", { d: "M20 9h2" }), _jsx("path", { d: "m17.8 11.8 1.4 1.4" }), _jsx("path", { d: "M15 9v1" }), _jsx("path", { d: "m12.2 7.8-1.4-1.4" }), _jsx("path", { d: "m20 20-9-9" }), _jsx("path", { d: "m21 21-1-1" })] }), _jsx("span", { children: t('ask') || "Ask" })] })] }));
};
