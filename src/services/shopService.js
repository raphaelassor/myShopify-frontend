export const shopService={
    addTagsToEntities,
    removeTagsFromEntities,
}

function addTagsToEntities(tags,entities){
    tags.forEach(tagName=>{
        for (let key in entities){
            const tagInEntity=entities[key].tags[tagName]
            if(!tagInEntity) entities[key].tags[tagName]=tagName
        }
    })
} 
function removeTagsFromEntities(tags,entities){
    tags.forEach(tagName=>{
        for (let key in entities){
            const tagInEntity=entities[key].tags[tagName]
            if(tagInEntity) delete entities[key].tags[tagName]
        }
    })
}