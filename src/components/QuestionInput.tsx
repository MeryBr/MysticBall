import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
    onSubmit: (question: string) => void;
    disabled?: boolean;
}

export const QuestionInput = ({ onSubmit, disabled = false }: Props) => {
    const [question, setQuestion] = useState('');
    const { t } = useTranslation();
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setQuestion(e.target.value);
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (question.trim() === '' || disabled) return;
        onSubmit(question);
        setQuestion('');
        if (textareaRef.current) textareaRef.current.style.height = 'auto';
        textareaRef.current?.focus();
    };

    return (
        <form onSubmit={handleSubmit} className="input-row">
            <textarea
                ref={textareaRef}
                value={question}
                onChange={handleChange}
                className="input-magic textarea-magic"
                placeholder={t('placeholder') || "Ask your question..."}
                maxLength={240}
                rows={1}
                autoFocus
                disabled={disabled}
                style={{ resize: 'none', minHeight: '2.6em', overflow: 'hidden' }}
            />
            {question && !disabled && (
                <button
                    type="button"
                    className="btn-clear"
                    onClick={() => {
                        setQuestion('');
                        if (textareaRef.current) textareaRef.current.style.height = 'auto';
                    }}
                    tabIndex={-1}
                    aria-label={t('clear') || 'Clear'}
                >
                    <span>&times;</span>
                </button>
            )}
            <button
                type="submit"
                className="btn-magic"
                aria-label={t('ask') || "Ask"}
                disabled={disabled}
            >
                <svg viewBox="0 0 24 24" width="24" height="24" className="icon-wand" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 4V2" /><path d="M15 16v-2" /><path d="M8 9h2" /><path d="M20 9h2" /><path d="m17.8 11.8 1.4 1.4" /><path d="M15 9v1" /><path d="m12.2 7.8-1.4-1.4" /><path d="m20 20-9-9" /><path d="m21 21-1-1" /></svg>
                <span>{t('ask') || "Ask"}</span>
            </button>
        </form>
    );
};
