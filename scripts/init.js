//initialising the canvas
var CANVAS = {};
CANVAS.canvas = document.createElement('canvas');
CANVAS.context = CANVAS.canvas.getContext('2d');

CANVAS.width = CANVAS.canvas.width = /*WIDTH*/500/*WIDTH*/;
CANVAS.height = CANVAS.canvas.height = /*HEIGHT*/500/*WIDTH*/;

CANVAS.background = CANVAS.canvas.style.backgroundColor = 'rgb(20,25,25)';
CANVAS.imgSmoothing = CANVAS.context.imageSmoothingEnabled = /*SMOOTH*/false/*SMOOTH*/;

CANVAS.scale = 1;
CANVAS.zoom = /*ZOOM*/1/*ZOOM*/;

CANVAS.camera = {
  x: 100,
  y: 100,
};

//resize function
CANVAS.resize = function (){
  var wW_ratio = innerWidth/CANVAS.width;
  var hH_ratio = innerHeight/CANVAS.height;
  
  if(wW_ratio >= hH_ratio){
    CANVAS.canvas.width = hH_ratio*CANVAS.width;
    CANVAS.canvas.height = innerHeight;
    CANVAS.scale = hH_ratio;
  }else{
    CANVAS.canvas.height = wW_ratio*CANVAS.height;
    CANVAS.canvas.width = innerWidth;
    CANVAS.scale = wW_ratio;
  }
};

//render options
CANVAS.drawImage = function (src,x,y,w,h){
  var zooom = CANVAS.scale*CANVAS.zoom;
  if(CANVAS.imgSmoothing === false){CANVAS.context.imageSmoothingEnabled = false;}
  if(src.length === 1){CANVAS.context.drawImage(src[0],(x-CANVAS.camera.x)*zooom,(y-CANVAS.camera.y)*zooom,w*zooom,h*zooom);}
  else if(src.length === 5){CANVAS.context.drawImage(src[0],src[1],src[2],src[3],src[4],(x-CANVAS.camera.x)*zooom,(y-CANVAS.camera.y)*zooom,w*zooom,h*zooom);}
};

CANVAS.fillRect = function (color,x,y,w,h){
  var zooom = CANVAS.scale*CANVAS.zoom;
  CANVAS.context.fillStyle = color;
  CANVAS.context.fillRect((x-CANVAS.camera.x)*zooom,(y-CANVAS.camera.y)*zooom,w*zooom,h*zooom);
};

//attach canvas to body
document.body.appendChild(CANVAS.canvas);




//mouse stuff
var MOUSE = {};
MOUSE.x = 0;
MOUSE.y = 0;
CANVAS.canvas.addEventListener('mousemove', (event)=>{
  var zooom = CANVAS.scale*CANVAS.zoom;
  
  MOUSE.x = event.offsetX/zooom;
  MOUSE.y = event.offsetY/zooom;
});




//initialise global variables
var draggies = [];

function create_draggable (x,y,w,h,s){
  var OUT = {};
  OUT.x = x;
  OUT.y = y;
  OUT.w = w;
  OUT.h = h;
  
  OUT.s = s;
  
  OUT.selected = false;
  
  draggies.push(OUT);
}

CANVAS.canvas.addEventListener('click', (event)=>{
  for(var i =0; i<draggies.length; i+=1){
    if(draggies[i].selected===false&&MOUSE.x+CANVAS.camera.x>draggies[i].x&&MOUSE.x+CANVAS.camera.x<draggies[i].x+draggies[i].w&&MOUSE.y+CANVAS.camera.y>draggies[i].y&&MOUSE.y+CANVAS.camera.y<draggies[i].y+draggies[i].h){draggies[i].selected = true;}
    else if(draggies[i].selected===true){draggies[i].selected = false;}
  }
});

CANVAS.canvas.addEventListener('contextmenu', function(event) {
  event.preventDefault();
  
  for(var i =0; i<draggies.length; i+=1){
    if(draggies[i].selected===false&&MOUSE.x+CANVAS.camera.x>draggies[i].x&&MOUSE.x+CANVAS.camera.x<draggies[i].x+draggies[i].w&&MOUSE.y+CANVAS.camera.y>draggies[i].y&&MOUSE.y+CANVAS.camera.y<draggies[i].y+draggies[i].h){
      draggies.splice(i, 1);
    }
  }
  
  return false;
}, false);




document.body.addEventListener('keyup', (event)=>{
  var N = +event.key;
  if(N!=NaN){
    if(N>0){
      create_draggable(MOUSE.x+CANVAS.camera.x,MOUSE.y+CANVAS.camera.y,100,100,[sprites[N]]);
    }
  }
});



//initialising other script files
var sprites = [];
var sources = [
  'assets/labirinth.png',
  'assets/birb.png',
  'assets/erg.png',
  'assets/GUN.jpeg',
];
for(var i=0; i<sources.length; i+=1){
  var sprite = document.createElement('img');
  sprite.src = sources[i];
  document.body.appendChild(sprite);
  sprites.push(sprite);
}




CANVAS.canvas.onkeyup = function (event) {
  console.log('ee');
};




//game loop
var PAUSED = false;
var loop = undefined;
document.body.onload = function (){
  
  //code that only executes once on load
  create_draggable(340,150,100,100,[sprites[1]]);
  create_draggable(190,170,40,40,[sprites[2]]);
  create_draggable(177,305,260/4,190/4,[sprites[3]]);
  
  //code that loops
  loop = setInterval(function (){
    
    //code that executes even if game paused
    CANVAS.resize();
    
    //code that executes if not paused
    if(PAUSED === false){
      CANVAS.drawImage([sprites[0]],0,0,449*3,580*3);
      
      for(var i =0; i<draggies.length; i+=1){
        if(draggies[i].selected===true){draggies[i].x=MOUSE.x+CANVAS.camera.x;draggies[i].y=MOUSE.y+CANVAS.camera.y;}
        CANVAS.drawImage(draggies[i].s,draggies[i].x,draggies[i].y,draggies[i].w,draggies[i].h);
      }
      
      
      if(MOUSE.x>450){CANVAS.camera.x+=1;}
      if(MOUSE.y>450){CANVAS.camera.y+=1;}
      if(MOUSE.x<50) {CANVAS.camera.x-=1;}
      if(MOUSE.y<50) {CANVAS.camera.y-=1;}
      
      
    }
  },1000/60);
}

