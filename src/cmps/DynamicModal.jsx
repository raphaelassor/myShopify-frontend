import { TagsEdit } from "./TagsEdit"

export const DynamicModal=(props)=>{

    switch(props.type){
        case 'TAGS_EDIT':
            return <TagsEdit {...props}/>
            default : return ''
    }
}