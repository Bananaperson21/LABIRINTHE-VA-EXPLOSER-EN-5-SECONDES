var KEYS = {
  list: ['1','2','3','4','5','6','7','8','9','0','q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l','z','x','c','v','b','n','m',' ','Escape','ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Enter'],
  '1': 					{pressed:false,ondown:undefined,onup:undefined},
  '2': 					{pressed:false,ondown:undefined,onup:undefined},
  '3': 					{pressed:false,ondown:undefined,onup:undefined},
  '4': 					{pressed:false,ondown:undefined,onup:undefined},
  '5': 					{pressed:false,ondown:undefined,onup:undefined},
  '6': 					{pressed:false,ondown:undefined,onup:undefined},
  '7': 					{pressed:false,ondown:undefined,onup:undefined},
  '8': 					{pressed:false,ondown:undefined,onup:undefined},
  '9': 					{pressed:false,ondown:undefined,onup:undefined},
  '0': 					{pressed:false,ondown:undefined,onup:undefined},
  'q': 					{pressed:false,ondown:undefined,onup:undefined},
  'w': 					{pressed:false,ondown:undefined,onup:undefined},
  'e': 					{pressed:false,ondown:undefined,onup:undefined},
  'r': 					{pressed:false,ondown:undefined,onup:undefined},
  't': 					{pressed:false,ondown:undefined,onup:undefined},
  'y': 					{pressed:false,ondown:undefined,onup:undefined},
  'u': 					{pressed:false,ondown:undefined,onup:undefined},
  'i': 					{pressed:false,ondown:undefined,onup:undefined},
  'o': 					{pressed:false,ondown:undefined,onup:undefined},
  'p': 					{pressed:false,ondown:undefined,onup:undefined},
  'a': 					{pressed:false,ondown:undefined,onup:undefined},
  's': 					{pressed:false,ondown:undefined,onup:undefined},
  'd': 					{pressed:false,ondown:undefined,onup:undefined},
  'f': 					{pressed:false,ondown:undefined,onup:undefined},
  'g': 					{pressed:false,ondown:undefined,onup:undefined},
  'h': 					{pressed:false,ondown:undefined,onup:undefined},
  'j': 					{pressed:false,ondown:undefined,onup:undefined},
  'k': 					{pressed:false,ondown:undefined,onup:undefined},
  'l': 					{pressed:false,ondown:undefined,onup:undefined},
  'z': 					{pressed:false,ondown:undefined,onup:undefined},
  'x': 					{pressed:false,ondown:undefined,onup:undefined},
  'c': 					{pressed:false,ondown:undefined,onup:undefined},
  'v': 					{pressed:false,ondown:undefined,onup:undefined},
  'b': 					{pressed:false,ondown:undefined,onup:undefined},
  'n': 					{pressed:false,ondown:undefined,onup:undefined},
  'm': 					{pressed:false,ondown:undefined,onup:undefined},
  ' ': 					{pressed:false,ondown:undefined,onup:undefined},
  'Escape':     {pressed:false,ondown:undefined,onup:undefined},
  'ArrowUp':    {pressed:false,ondown:undefined,onup:undefined},
  'ArrowDown':  {pressed:false,ondown:undefined,onup:undefined},
  'ArrowLeft':  {pressed:false,ondown:undefined,onup:undefined},
  'ArrowRight': {pressed:false,ondown:undefined,onup:undefined},
  'Enter':      {pressed:false,ondown:undefined,onup:undefined},
};
document.body.addEventListener('keydown', function(event){
  let k = event.key;
	if(KEYS[''+k+'']===undefined){KEYS[''+k+'']={pressed:true,ondown:undefined,onup:undefined};KEYS.list.push(''+k+'');}
	if(KEYS[''+k+'']!=undefined){KEYS[''+k+''].pressed = true;if(KEYS[''+k+''].ondown!=undefined){KEYS[''+k+''].ondown();}}
});
document.body.addEventListener('keyup', function(event){
  let k = event.key;
	if(KEYS[''+k+'']===undefined){KEYS[''+k+'']={pressed:false,ondown:undefined,onup:undefined};}
	if(KEYS[''+k+'']!=undefined){KEYS[''+k+''].pressed = false;if(KEYS[''+k+''].onup!=undefined){KEYS[''+k+''].onup();}}
});