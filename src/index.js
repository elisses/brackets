module.exports = function check(str, bracketsConfig) {

    const mappedConfig = new Map();
      for(let i = 0; i < bracketsConfig.length; i++){
        let par = bracketsConfig[i];
        mappedConfig.set(par[0],par[1]);
      } 

    let string = str.split('');
    let stackOfKeys = [];

    for(let i = 0; i < string.length; i++){
      let topOfStack = stackOfKeys[stackOfKeys.length-1];      
      const currentChar = string[i];
      //Checks if we have key and value as equals. Ex: ['|','|']
      if(topOfStack == currentChar && currentChar == mappedConfig.get(currentChar)) {
        stackOfKeys.pop();
        //Checks if char is key on map
      } else if(mappedConfig.has(currentChar)){
        stackOfKeys.push(currentChar);
        //checks if we are closing a value from the key on top of the stack
      }else if(mappedConfig.get(topOfStack) == currentChar ) {
        stackOfKeys.pop();
        //if we are trying to close a key with a different value, then it's false. Ex: (]
      }else if(Array.from(mappedConfig.values()).includes(currentChar)){
          return false;   
      }      
    }
    return stackOfKeys.length == 0 ? true : false;    
}
