
import IconClose from '@mui/icons-material/Clear';

export const Snippet = ({ children, handleChange, remove }) => {
    return <span className="snippet" onClick={handleChange}>

        <span>{children}</span> {remove && <span className="close"><IconClose /></span>} </span>
}