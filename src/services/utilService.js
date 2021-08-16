import queryString from 'query-string'
export const utilService = {
    delay,
    getRandomInt,
    makeId,
    buildQueryStr,
}

function delay(ms = 1500) {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}

function getRandomInt(min=0, max=10) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}
function buildQueryStr(criteria){
    const trimmedCriteria=trimEmptyVals(criteria)
    let str='?';
    str+=queryString.stringify(trimmedCriteria)
    return str
}
function trimEmptyVals(obj){
    const trimmed={}
     for (let [key,value] of Object.entries(obj)){
        if(Array.isArray(value)&&value.length)trimmed[key]=value 
        else if(value||value===0)trimmed[key]=value  
    }
    return trimmed
}
