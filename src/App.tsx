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

  const handleQuestion = (q: string) => {
    setQuestion(q);
    setAnswer('');
    setTimeout(() => {
      if (Math.random() < 0.25) {
        const glitches = t('glitches', { returnObjects: true }) as string[];
        const glitchAnswer = glitches[Math.floor(Math.random() * glitches.length)];
        setAnswer(glitchAnswer);
        const brokenWords = t('brokenWords', { returnObjects: true }) as string[];
        const normalized = glitchAnswer.toLowerCase();
        if (brokenWords.some(w => normalized.includes(w.toLowerCase()))) {
          setBroken(true);
        }
        return;
      }
      const possibleAnswers = t('answers', { returnObjects: true }) as string[];
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

  return (
    <>
      <VantaCloudsBackground />
      <StarryFogCursor />
      <main
        className="app"
        style={{
          position: 'relative',
          minHeight: '100vh',
          overflow: 'visible',
          paddingTop: 4
        }}
      >
        <div className="lang-switcher-mystic">
          {['en', 'es', 'fr'].map(lng => (
            <button
              key={lng}
              onClick={() => i18n.changeLanguage(lng)}
              className={`btn-lang-mystic ${i18n.language === lng ? 'active' : ''}`}
              aria-label={lng}
            >
              {lng.toUpperCase()}
            </button>
          ))}
        </div>
        <div className="header-mystic">
          <h1 className="title">MysticBall</h1>
        </div>
        <MagicSphere answer={answer} broken={broken} />
        <div className="content">
          {broken ? (
            <button className="btn-restore" onClick={handleRestore}>
              {t('restoreBall')}
            </button>
          ) : (
            <>
              <QuestionInput onSubmit={handleQuestion} disabled={broken} />
              {question && (
                <p className="question-label">
                  {t('askLabel')} «{question}»
                </p>
              )}
            </>
          )}
        </div>
      </main>
    </>
  );
}

export default App;
