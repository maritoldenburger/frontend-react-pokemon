import "./Button.css"

function Button({text, clickHandler, disabled}) {
    return (
        <>
            <button
                type="button"
                onClick={clickHandler}
                disabled={disabled}
            >
                {text}
            </button>
        </>
    );
}

export default Button;