
import IconClose from '@material-ui/icons/Clear';

export const TagPreview=({tag,handleChange,remove})=>{

    return <span className="tag-preview" onClick={()=>handleChange(tag)}>

        <span>{tag}</span> {remove&&<span className="close"><IconClose/></span>} </span>
}