
//console.log(module);
exports.getDate = function() {
const date = new Date();
const options = {
     year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  };
  
 
  return date.toLocaleDateString('en-US', options);
 
}


exports.getDay = function (){
const date = new Date();
const options = {  
    weekday: 'long'
  };
  
 
  return date.toLocaleDateString('en-US', options);
  
}
console.log(module.exports);