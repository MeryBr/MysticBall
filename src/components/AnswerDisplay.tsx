interface Props {
    answer: string;
}

export const AnswerDisplay = ({ answer }: Props) => {
    if (!answer) return null;
    return (
        <div className="answer-mystic-simple">
            <p className="answer-text-simple">{answer}</p>
        </div>
    );
};
