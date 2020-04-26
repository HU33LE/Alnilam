const possibleChars = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789*|@#~€¬{[]}$.;-+-';

module.exports.random = (length = 64) =>{
    let result =  '';
    let totalLength = possibleChars.length;
    
    for(let i = 0; i < length;i++){
        let index = Math.floor(Math.random() * totalLength);
        result += possibleChars.charAt(index); 
    }

    return result;
};
