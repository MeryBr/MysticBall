import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { QuestionInput } from './components/QuestionInput';
import { VantaCloudsBackground } from './components/MysticFogBackground';
import { StarryFogCursor } from './components/StarryFogCursor';
import MagicSphere from './components/MagicSphere';
function App() {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [broken, setBroken] = useState(false);
    const { t, i18n } = useTranslation();
    const handleQuestion = (q) => {
        setQuestion(q);
        setAnswer('');
        setTimeout(() => {
            if (Math.random() < 0.25) {
                const glitches = t('glitches', { returnObjects: true });
                const glitchAnswer = glitches[Math.floor(Math.random() * glitches.length)];
                setAnswer(glitchAnswer);
                const brokenWords = t('brokenWords', { returnObjects: true });
                const normalized = glitchAnswer.toLowerCase();
                if (brokenWords.some(w => normalized.includes(w.toLowerCase()))) {
                    setBroken(true);
                }
                return;
            }
            const possibleAnswers = t('answers', { returnObjects: true });
            const classicAnswer = possibleAnswers[Math.floor(Math.random() * possibleAnswers.length)];
            setAnswer(classicAnswer);
            setBroken(false);
        }, 1200);
    };
    const handleRestore = () => {
        setBroken(false);
        setAnswer('');
        setQuestion('');
    };
    return (_jsxs(_Fragment, { children: [_jsx(VantaCloudsBackground, {}), _jsx(StarryFogCursor, {}), _jsxs("main", { className: "app", style: {
                    position: 'relative',
                    minHeight: '100vh',
                    overflow: 'visible',
                    paddingTop: 4
                }, children: [_jsx("div", { className: "lang-switcher-mystic", children: ['en', 'es', 'fr'].map(lng => (_jsx("button", { onClick: () => i18n.changeLanguage(lng), className: `btn-lang-mystic ${i18n.language === lng ? 'active' : ''}`, "aria-label": lng, children: lng.toUpperCase() }, lng))) }), _jsx("div", { className: "header-mystic", children: _jsx("h1", { className: "title", children: "MysticBall" }) }), _jsx(MagicSphere, { answer: answer, broken: broken }), _jsx("div", { className: "content", children: broken ? (_jsx("button", { className: "btn-restore", onClick: handleRestore, children: t('restoreBall') })) : (_jsxs(_Fragment, { children: [_jsx(QuestionInput, { onSubmit: handleQuestion, disabled: broken }), question && (_jsxs("p", { className: "question-label", children: [t('askLabel'), " \u00AB", question, "\u00BB"] }))] })) })] })] }));
}
export default App;
