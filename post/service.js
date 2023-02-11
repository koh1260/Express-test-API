function getListObjectValue(listObject){
    const data = []
    for(let i = 0; i < Object.keys(listObject).length; i++){
        const value = Object.values(listObject[i]);
        data.push(...value);
    }
    return data;
}


module.exports = {
    getListObjectValue,
}