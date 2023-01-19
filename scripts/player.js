var PLAYER = {};

function load_PLAYER (){
  PLAYER.x = 0;
  PLAYER.y = 0;
  
  PLAYER.width = 9*2;
  PLAYER.height = 12*2;
  
  PLAYER.speed = 3;
  
  PLAYER.dash_length = 60;
  
  PLAYER.walk_animation_frame = 0;
  PLAYER.walk_animation_max_frame = 3;
  PLAYER.walk_animation = [1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3];
  PLAYER.animation_src = {
    left: [
      [sprites[0],1 ,1,9,12],
      [sprites[0],11,1,9,12],
      [sprites[0],21,1,9,12],
    ],
    right: [
      [sprites[0],1 ,14,9,12],
      [sprites[0],11,14,9,12],
      [sprites[0],21,14,9,12],
    ],
    up: [
      [sprites[0],1 ,27,9,12],
      [sprites[0],11,27,9,12],
      [sprites[0],21,27,9,12],
    ],
    down: [
      [sprites[0],1 ,40,9,12],
      [sprites[0],11,40,9,12],
      [sprites[0],21,40,9,12],
    ],
  };
  
  PLAYER.walking = false;
  PLAYER.facing = 'down';
  
  
  PLAYER.collide = function(){
	  for(var j = 0; j < MAZE.walls.length; j += 1){
      var other = MAZE.walls[j];
      var me = {x:this.x,y:this.y+this.height*0.66,width:this.width,height:this.height*0.33}
      if (me.x < other.x + other.width &&me.x + me.width  > other.x &&me.y < other.y + other.height &&me.y + me.height  > other.y ){
      var nx = 0;
      for(nx = 0; nx < other.width; nx += 1){if ((me.x - nx) < other.x + other.width &&(me.x + me.width - nx)  > other.x &&me.y < other.y + other.height &&me.y + me.height  > other.y ){}else{break;}}
      var ny = 0;
      for(ny = 0; ny < other.height; ny += 1){if (me.x < other.x + other.width &&me.x + me.width  > other.x &&(me.y - ny) < other.y + other.height &&(me.y + me.height - ny)  > other.y ){}else{break;}}
      var px = 0; 
      for(px = 0; px < other.width; px += 1){if ((me.x + px) < other.x + other.width &&(me.x + me.width + px)  > other.x &&me.y < other.y + other.height &&me.y + me.height  > other.y ){}else{break;}}
      var py = 0;
      for(py = 0; py < other.height; py += 1){if (me.x < other.x + other.width &&me.x + me.width  > other.x &&(me.y + py) < other.y + other.height &&(me.y + me.height + py)  > other.y ){}else{break;}}
        if(nx < ny   && nx < px  && nx < py){PLAYER.x -= nx;}
        if(ny < nx   && ny < py  && ny < px){PLAYER.y -= ny;}
        if(px < py   && px < nx  && px < ny){PLAYER.x += px;}
	      if(py < px   && py < ny  && py < nx){PLAYER.y += py;}
      }
    }
  }
  
  PLAYER.chek_if_touch_bomb = function(){
    for(var j = 0; j < MAZE.bombs.length; j += 1){
      if(current_maze==='not start'){
        var other_1 = MAZE.bombs[j];
        var other = {x:other_1.x,y:other_1.y+other_1.height*0.5,width:other_1.width,height:other_1.height*0.5}
        var me = {x:this.x,y:this.y+this.height*0.66,width:this.width,height:this.height*0.33}
        if (me.x < other.x + other.width &&me.x + me.width  > other.x &&me.y < other.y + other.height &&me.y + me.height  > other.y ){
          console.log(''+Math.round((max_time-used_time)/100)/10+' seconds left');
          load_MAZE(starting_area);
          setTimeout(()=>{time_left_display.innerText = 'Trouve avec: '+time_left_display.innerText+'s restant'},50)
        }
      }
    }
  }
  
  PLAYER.chek_if_touch_portal = function(){
    for(var j = 0; j < MAZE.portals.length; j += 1){
      if(current_maze==='start'){
        var other = MAZE.portals[j];
        var me = {x:this.x,y:this.y+this.height*0.66,width:this.width,height:this.height*0.33}
        if (me.x < other.x + other.width &&me.x + me.width  > other.x &&me.y < other.y + other.height &&me.y + me.height  > other.y ){
          load_MAZE(other.m);
        }
      }
    }
  }
  
  PLAYER.update = function (){
    var up    = (KEYS.w.pressed || KEYS.ArrowUp.pressed);
    var down  = (KEYS.s.pressed || KEYS.ArrowDown.pressed);
    var left  = (KEYS.a.pressed || KEYS.ArrowLeft.pressed);
    var right = (KEYS.d.pressed || KEYS.ArrowRight.pressed);
    
    this.walking = false;
    
    //only one key at a time
    if(up&&!left&&!right&&!down){this.y-=this.speed;this.walking=true;this.facing='up';}
    if(down&&!left&&!right&&!up){this.y+=this.speed;this.walking=true;this.facing='down';}
    if(left&&!up&&!right&&!down){this.x-=this.speed;this.walking=true;this.facing='left';}
    if(right&&!left&&!up&&!down){this.x+=this.speed;this.walking=true;this.facing='right';}
    //2 keys at a time
    if(up&&left&&!down&&!right){this.y-=Math.sqrt(this.speed*2);this.x-=Math.sqrt(this.speed*2);this.walking=true;}
    if(up&&right&&!down&&!left){this.y-=Math.sqrt(this.speed*2);this.x+=Math.sqrt(this.speed*2);this.walking=true;}
    if(down&&left&&!up&&!right){this.y+=Math.sqrt(this.speed*2);this.x-=Math.sqrt(this.speed*2);this.walking=true;}
    if(down&&right&&!up&&!left){this.y+=Math.sqrt(this.speed*2);this.x+=Math.sqrt(this.speed*2);this.walking=true;}
    //3 keys at a time
    if(up&&down&&left&&!right){this.x-=this.speed;this.walking=true;}
    if(up&&down&&right&&!left){this.x+=this.speed;this.walking=true;}
    if(left&&right&&up&&!down){this.y-=this.speed;this.walking=true;}
    if(left&&right&&down&&!up){this.y+=this.speed;this.walking=true;}
    
    PLAYER.collide();
    PLAYER.chek_if_touch_bomb();
    PLAYER.chek_if_touch_portal();
    
    //player animator
    if(this.walk_animation_frame>=this.walk_animation.length||this.walking === false){this.walk_animation_frame=0}
    var img = [sprites[0],0,0,9,12];
    if(this.walking === true){
      if(this.walk_animation[this.walk_animation_frame]===1&&this.facing==='left'){img = this.animation_src.left[0];}
      if(this.walk_animation[this.walk_animation_frame]===2&&this.facing==='left'){img = this.animation_src.left[1];}
      if(this.walk_animation[this.walk_animation_frame]===3&&this.facing==='left'){img = this.animation_src.left[2];}
      if(this.walk_animation[this.walk_animation_frame]===1&&this.facing==='right'){img = this.animation_src.right[0];}
      if(this.walk_animation[this.walk_animation_frame]===2&&this.facing==='right'){img = this.animation_src.right[1];}
      if(this.walk_animation[this.walk_animation_frame]===3&&this.facing==='right'){img = this.animation_src.right[2];}
      if(this.walk_animation[this.walk_animation_frame]===1&&this.facing==='up'){img = this.animation_src.up[0];}
      if(this.walk_animation[this.walk_animation_frame]===2&&this.facing==='up'){img = this.animation_src.up[1];}
      if(this.walk_animation[this.walk_animation_frame]===3&&this.facing==='up'){img = this.animation_src.up[2];}
      if(this.walk_animation[this.walk_animation_frame]===1&&this.facing==='down'){img = this.animation_src.down[0];}
      if(this.walk_animation[this.walk_animation_frame]===2&&this.facing==='down'){img = this.animation_src.down[1];}
      if(this.walk_animation[this.walk_animation_frame]===3&&this.facing==='down'){img = this.animation_src.down[2];}
      if(this.walk_animation_frame<this.walk_animation.length){this.walk_animation_frame+=1}
    }
    if(this.walking === false){
      if(this.facing==='left'){img = this.animation_src.left[0];}
      if(this.facing==='right'){img = this.animation_src.right[0];}
      if(this.facing==='up'){img = this.animation_src.up[0];}
      if(this.facing==='down'){img = this.animation_src.down[0];}
    }
    
    CANVAS.camera.x = (this.x+this.width/2)-(CANVAS.width/2);
    CANVAS.camera.y = (this.y+this.height/2)-(CANVAS.height/2);
    
    //draw the player
    CANVAS.drawImage(img,this.x,this.y,this.width,this.height);
};
}