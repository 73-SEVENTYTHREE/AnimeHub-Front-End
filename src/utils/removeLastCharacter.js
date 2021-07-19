const removeLastCharacter = str => {
    if(str[str.length-1]==='"') return str.substring(0, str.length - 1);
    else return str;
}

export default removeLastCharacter;