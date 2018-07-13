var str = "<b>Bob</b>, I'm <b>20</b> years old, I like <b>programming</b>.";

var result = str.match(/<b>(.*?)<\/b>/g).map(function(val){
   return val.replace(/<\/?b>/g,'');
});

console.log(result)