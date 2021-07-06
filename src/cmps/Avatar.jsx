export const  Avatar= ({name})=>{
    const splitName=name.split(' ')
    const initials = splitName.length>1? splitName[0].charAt(0) + splitName[1].charAt(0) : splitName[0].charAt(0)
    return <div className="avatar">
        <span>
        {initials.toUpperCase()}
        </span>
    </div>
}