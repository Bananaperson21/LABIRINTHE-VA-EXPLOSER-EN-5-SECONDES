//initialising the canvas
var CANVAS = {};
CANVAS.canvas = document.createElement('canvas');
CANVAS.context = CANVAS.canvas.getContext('2d');

CANVAS.width = CANVAS.canvas.width = /*WIDTH*/250/*WIDTH*/;
CANVAS.height = CANVAS.canvas.height = /*HEIGHT*/200/*WIDTH*/;

CANVAS.background = CANVAS.canvas.style.backgroundColor = 'rgb(20,25,25)';
CANVAS.imgSmoothing = CANVAS.context.imageSmoothingEnabled = /*SMOOTH*/false/*SMOOTH*/;

CANVAS.scale = 1;
CANVAS.zoom = /*ZOOM*/1/*ZOOM*/;

CANVAS.camera = {
  x: 0,
  y: 0,
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




//initialise global variables
var MAZE = {walls:[],bombs:[],portals:[],maze:'start'};
var bomb_animation_frame = 0;
var bomb_animation = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2];

var current_maze = '';
var max_time = 5*1000;
var used_time = 0;
var time_left_display = document.getElementById('time-left');
var explosion = document.getElementById('explosion');
explosion.style.zIndex = -1;
var exploding = false;
var button1 = document.getElementById('restart');
var button2 = document.getElementById('back');
var container = document.getElementById('button-container');




//initialising other script files
var sprites = [];
var sources = [
  'assets/spritesheet.png',
  'assets/gradient.png',
];
for(var i=0; i<sources.length; i+=1){
  var sprite = document.createElement('img');
  sprite.src = sources[i];
  document.body.appendChild(sprite);
  sprites.push(sprite);
}

//initialising other script files
var scripts = [
  'scripts/walls.js',
  'scripts/controls.js',
  'scripts/player.js'
];
for(var i=0; i<scripts.length; i+=1){
  var script = document.createElement('script');
  script.src = scripts[i];
  document.body.appendChild(script);
}




//game loop
var PAUSED = false;
var loop = undefined;
document.body.onload = function (){
  
  //code that only executes once on load
  load_PLAYER();
  
  load_MAZE(starting_area);
  
  button1.onclick = function(){
    exploding = false;
    explosion.style.zIndex = -1;
    container.style.zIndex = -1
    load_MAZE(MAZE.maze);
    used_time = 0;
  }
  button2.onclick = function(){
    exploding = false;
    explosion.style.zIndex = -1;
    container.style.zIndex = -1
    load_MAZE(starting_area);
    used_time = 0;
  }
  
  //code that loops
  loop = setInterval(function (){
    if(document.hasFocus()===false){if(PAUSED===false){for(var i=0;i<KEYS.list.length;i+=1){KEYS[KEYS.list[i]].pressed=false;}}PAUSED = true;}
    if(document.hasFocus()===true){PAUSED = false;}
    
    //code that executes even if game paused
    CANVAS.resize();
    
    sprites[1].style.width = ''+CANVAS.width*CANVAS.scale+'px';
    sprites[1].style.height = ''+CANVAS.height*CANVAS.scale+'px';
    
    explosion.style.width = ''+CANVAS.width*CANVAS.scale+'px';
    explosion.style.height = ''+CANVAS.height*CANVAS.scale+'px';
    
    time_left_display.style.width = ''+CANVAS.width*CANVAS.scale+'px';
    time_left_display.style.height = ''+CANVAS.height*CANVAS.scale+'px';
    time_left_display.style.fontSize = ''+(CANVAS.width*CANVAS.scale)*0.1+'px';
    
    button1.style.width = ''+CANVAS.width/3*CANVAS.scale+'px';
    button1.style.height = ''+CANVAS.height/6*CANVAS.scale+'px';
    button1.style.fontSize = ''+(CANVAS.width*CANVAS.scale)*0.1+'px';
    
    button2.style.width = ''+CANVAS.width/3*CANVAS.scale+'px';
    button2.style.height = ''+CANVAS.height/6*CANVAS.scale+'px';
    button2.style.fontSize = ''+(CANVAS.width*CANVAS.scale)*0.1+'px';
    
    container.style.fontSize = ''+(CANVAS.width*CANVAS.scale)*0.05+'px';
    
    //code that executes if not paused
    if(PAUSED === false){
      for(var i=0;i<MAZE.walls.length;i+=1){CANVAS.drawImage([sprites[0],31,1,12,12],MAZE.walls[i].x,MAZE.walls[i].y,MAZE.walls[i].width,MAZE.walls[i].height);}
      
      for(var i=0;i<MAZE.portals.length;i+=1){CANVAS.fillRect(MAZE.portals[i].c,MAZE.portals[i].x,MAZE.portals[i].y,MAZE.portals[i].width,MAZE.portals[i].height);}
      
      if(this.bomb_animation_frame>=this.bomb_animation.length){this.bomb_animation_frame=0}
      for(var i=0;i<MAZE.bombs.length;i+=1){
        if(this.bomb_animation[this.bomb_animation_frame]===1){CANVAS.drawImage([sprites[0],31,14,12,12],MAZE.bombs[i].x,MAZE.bombs[i].y,MAZE.bombs[i].width,MAZE.bombs[i].height);}
        if(this.bomb_animation[this.bomb_animation_frame]===2){CANVAS.drawImage([sprites[0],31,27,12,12],MAZE.bombs[i].x,MAZE.bombs[i].y,MAZE.bombs[i].width,MAZE.bombs[i].height);}
      }
      this.bomb_animation_frame+=1;
      
      if(current_maze==='not start'&&exploding===false){used_time+=1000/60;}
      if(current_maze==='not start'&&used_time>max_time){
        //code when time run out
        exploding = true;
        explosion.style.zIndex = 9;
        container.style.zIndex = 10
      }
      if(current_maze==='not start'){
        time_left_display.innerText = Math.round((max_time-used_time)/100)/10;
        if(time_left_display.innerText.length===1){time_left_display.innerText+='.0'}
      }
      
      if(exploding===false){
        PLAYER.update();
      }
      
    }
  },1000/60);
}

