
import IconClose from '@material-ui/icons/Clear';

export const Snippet = ({ children, handleChange, remove }) => {
    return <span className="snippet" onClick={handleChange}>

        <span>{children}</span> {remove && <span className="close"><IconClose /></span>} </span>
}