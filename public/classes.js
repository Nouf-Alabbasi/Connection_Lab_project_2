// this files holds the class definitions

class darkRoom{
  constructor(pos_x,pos_y)
  {
    this.x = pos_x;
    this.y = pos_y;
    this.w = width/3;
    this.h = height/2;
    this.transparent = 100;
  }
  bound(x,y,w,h)
  {
    if (x + w/4 > this.x-this.w/2 && x - w/4 < this.x + this.w/2 && y+h/4 > this.y-this.h/2 && y-h/4 < this.y + this.h/2)
    {
      this.transparent = 0;
    }
    else
    {
      this.transparent = 100;
    }
  }
  draw(){
    // rectMode(CORNER);
    noStroke();
    fill(0,0,0,this.transparent);
    rect(this.x,this.y,this.w,this.h)  
  }
}
//__________________________________________________________

class BUTTON{
  constructor(text,x_pos,y_pos){
    this.text = text;
    this.x_pos = x_pos;
    this.y_pos = y_pos;
    textFont("VT323");
    textSize(50);
    this.width_button = textWidth(this.text)+35;
    this.height_button = 60;
    this.d = dist(mouseX, mouseY, this.x_pos, this.y_pos);
  }
  
  draw_button(){
//   button hover effect
    rectMode(CENTER);
    if (this.InRange())
    {
      fill("white")
      rect(this.x_pos+2,this.y_pos+2,this.width_button,this.height_button);
      cursor('pointer'); 
    }else {
      fill("red");
      rect(this.x_pos+2,this.y_pos+2,this.width_button,this.height_button);
      cursor("default");
    }
//     add button labels
    textFont("VT323");
    textSize(50);
    noStroke();
    fill("black")
    text(this.text,this.x_pos-(this.width_button-35)/2,this.y_pos+(this.height_button/4));   
  }
  
  InRange(){
    this.d = dist(mouseX, mouseY, this.x_pos, this.y_pos);
        if (mouseX > this.x_pos-this.width_button/2 && mouseX < this.x_pos + this.width_button/2 && mouseY > this.y_pos-this.height_button/2 && mouseY < this.y_pos + this.height_button)
      { 
      return true;
    }
    else{
      return false;
    }

  }
}
//__________________________________________________________

class Player{
  constructor(sprites){
    this.x_pos = 370;
    this.y_pos = 130;
    this.speed = 3;
    this.width = 50
    this.height = 50
    this.left = 1;
    this.sprite_spd = 6;
    this.step = 0;
    this.sprites = sprites;
    this.spectator=false;
  }
  
  check_in_Bound(){
    
    if (sofa_obj_room2.checkBound(this.x_pos,this.y_pos,this.width, this.height) || plant_obj_room2.checkBound(this.x_pos,this.y_pos,this.width, this.height) ||side_tableObj_1_room1.checkBound(this.x_pos,this.y_pos,this.width, this.height) ||side_tableObj_2_room1.checkBound(this.x_pos,this.y_pos,this.width, this.height) || plant_obj_room1.checkBound(this.x_pos,this.y_pos,this.width, this.height) || table_obj_room2.checkBound(this.x_pos,this.y_pos,this.width, this.height) || bed_obj_room1.checkBound(this.x_pos,this.y_pos,this.width, this.height) || Sofa_chair_obj2_room2.checkBound(this.x_pos,this.y_pos,this.width, this.height) || Sofa_chair_obj_room2.checkBound(this.x_pos,this.y_pos,this.width, this.height) || bed_obj_2_room3.checkBound(this.x_pos,this.y_pos,this.width, this.height) ||  bed_obj_room3.checkBound(this.x_pos,this.y_pos,this.width, this.height) || sofa_room3.checkBound(this.x_pos,this.y_pos,this.width, this.height) ||  tv_room3.checkBound(this.x_pos,this.y_pos,this.width, this.height) || rug_room2.checkBound(this.x_pos,this.y_pos,this.width, this.height) || dining_table_obj_room4.checkBound(this.x_pos,this.y_pos,this.width, this.height) || chair_obj_2.checkBound(this.x_pos,this.y_pos,this.width, this.height) || chair_obj_1.checkBound(this.x_pos,this.y_pos,this.width, this.height) || chair_obj_3.checkBound(this.x_pos,this.y_pos,this.width, this.height))
    {
      return true;
    }

  }

  draw(){
    DarkRoom1.bound(this.x_pos,this.y_pos,this.width, this.height);
    DarkRoom2.bound(this.x_pos,this.y_pos,this.width, this.height);
    DarkRoom3.bound(this.x_pos,this.y_pos,this.width, this.height);
    DarkRoom4.bound(this.x_pos,this.y_pos,this.width, this.height);

    // room 1
    plant_obj_room1.checkBound(this.x_pos,this.y_pos,this.width, this.height);
    side_tableObj_1_room1.checkBound(this.x_pos,this.y_pos,this.width, this.height);
    side_tableObj_2_room1.checkBound(this.x_pos,this.y_pos,this.width, this.height);
    bed_obj_room1.checkBound(this.x_pos,this.y_pos,this.width, this.height);
      
    sofa_obj_room2.checkBound(this.x_pos,this.y_pos,this.width, this.height);
    plant_obj_room2.checkBound(this.x_pos,this.y_pos,this.width, this.height);
    table_obj_room2.checkBound(this.x_pos,this.y_pos,this.width, this.height);  Sofa_chair_obj_room2.checkBound(this.x_pos,this.y_pos,this.width, this.height);
    Sofa_chair_obj2_room2.checkBound(this.x_pos,this.y_pos,this.width, this.height)

    // room 3
    bed_obj_room3.checkBound(this.x_pos,this.y_pos,this.width, this.height);
    bed_obj_2_room3.checkBound(this.x_pos,this.y_pos,this.width, this.height);
    tv_room3.checkBound(this.x_pos,this.y_pos,this.width, this.height);
    sofa_room3.checkBound(this.x_pos,this.y_pos,this.width, this.height);
    rug_room2.checkBound(this.x_pos,this.y_pos,this.width, this.height)

    // room 4
    dining_table_obj_room4.checkBound(this.x_pos,this.y_pos,this.width, this.height)
    chair_obj_1.checkBound(this.x_pos,this.y_pos,this.width, this.height)
    chair_obj_2.checkBound(this.x_pos,this.y_pos,this.width, this.height)
    chair_obj_3.checkBound(this.x_pos,this.y_pos,this.width, this.height)

    this.move();
    // rect(this.x_pos,this.y_pos,this.width,this.height);
    
    // this.check_sides();
    if (!this.left){
      // image(this.sprites[0][this.step], this.x_pos, this.y_pos);
      image(this.sprites[0][this.step], this.x_pos, this.y_pos);
    }
    else{
      push();
      scale(-1, 1);
      // image(this.sprites[0][this.step], -this.x_pos, this.y_pos);
      image(this.sprites[0][this.step], -this.x_pos, this.y_pos);
      pop();
    }
  
}
  
  get_x(){
    return this.x_pos;
  }
  get_y(){
    return this.y_pos;
  }
  get_w(){
    return this.width;
  }
  get_h(){
    return this.height;
  }
  
  move(){
    //move left
    if(!this.spectator){
      if (keyIsDown(LEFT_ARROW)) 
      {
        if (this.check_bound_left()){      
            this.x_pos += 1;
        }
        else{
          //move one step back to prevent getting stuck
          this.x_pos -= this.speed;
          this.left = 1;
          if (frameCount % this.sprite_spd == 0) {
            this.step = (this.step + 1) % 15;
          }
        }
      }
      
      //move right
      if (keyIsDown(RIGHT_ARROW)) 
      {
        if (this.check_bound_right()){      
            this.x_pos -= 1;
        }
        else{
          //move one step back to prevent getting stuck
          this.x_pos += this.speed;
          this.left = 0;
          if (frameCount % this.sprite_spd == 0) {
            this.step = (this.step + 1) % 15;
          }
        }
      }
      //move down
      if (keyIsDown(DOWN_ARROW)) 
      {
        if (this.check_bound_down()){      
            this.y_pos -= 1;
        }
        else{
          //move one step back to prevent getting stuck
          this.y_pos += this.speed;
          if (frameCount % this.sprite_spd == 0) {
            this.step = (this.step + 1) % 15;
          }
        }
      }
      //move up
      if (keyIsDown(UP_ARROW)) 
      {
        if (this.check_bound_up()){      
            this.y_pos += 1;
        }
        else{
          //move one step back to prevent getting stuck
          this.y_pos -= this.speed;
          if (frameCount % this.sprite_spd == 0) {
            this.step = (this.step + 1) % 15;
          }
        }
      }
    }
    else{
      if (spectator_left) 
      {
        if (this.check_bound_left()){      
            this.x_pos += 1;
        }
        else{
          //move one step back to prevent getting stuck
          this.x_pos -= this.speed;
          this.left = 1;
          if (frameCount % this.sprite_spd == 0) {
            this.step = (this.step + 1) % 15;
          }
        }
      }
      
      //move right
      if (spectator_right) 
      {
        if (this.check_bound_right()){      
            this.x_pos -= 1;
        }
        else{
          //move one step back to prevent getting stuck
          this.x_pos += this.speed;
          this.left = 0;
          if (frameCount % this.sprite_spd == 0) {
            this.step = (this.step + 1) % 15;
          }
        }
      }
      //move down
      if (spectator_down) 
      {
        if (this.check_bound_down()){      
            this.y_pos -= 1;
        }
        else{
          //move one step back to prevent getting stuck
          this.y_pos += this.speed;
          if (frameCount % this.sprite_spd == 0) {
            this.step = (this.step + 1) % 15;
          }
        }
      }
      //move up
      if (spectator_up) 
      {
        if (this.check_bound_up()){      
            this.y_pos += 1;
        }
        else{
          //move one step back to prevent getting stuck
          this.y_pos -= this.speed;
          if (frameCount % this.sprite_spd == 0) {
            this.step = (this.step + 1) % 15;
          }
        }
      }

    }
    if(role=='seeker'){
      moveData={
        up:keyIsDown(UP_ARROW),
        left:keyIsDown(LEFT_ARROW),
        down:keyIsDown(DOWN_ARROW),
        right:keyIsDown(RIGHT_ARROW)
      }
      socket.emit('move',moveData)
    }
  } //end of move method
  
//########### check boundaries
  check_bound_left()
  {
    if (this.x_pos-(this.width/2) <= sides/2){
      return true;
    }
  }
  check_bound_right()
  {
    if (this.x_pos+(this.width/2) >= width-sides/2){
      return true;
    }
  }
  
  check_bound_down()
  {
    if (this.y_pos+(this.height/2) >= height-sides/2){
      return true;
    }
  }
  check_bound_up()
  {
    if (this.y_pos-(this.height/2) <= sides/2){
      return true;
    }
  }
//########### end check boundaries

} //###########end of player class
//__________________________________________________________


class furniture{
  constructor(place,img,x,y){
    this.place = place;
    this.img = img;
    this.h = this.img.height/6;
    this.w = this.img.width/6;
    // this.X_center_pos = 
    this.x=x;
    this.y=y;
    this.color = "#7a8786";
  }

  draw(){
    imageMode(CENTER);
    rectMode(CENTER);
    noFill();
    this.checkBound(P_1.get_x(),P_1.get_y(),P_1.get_w(),P_1.get_h());
    if (this.color != "NONE")
      {
        stroke(this.color);
        fill(this.color)
      }
    else{
      noStroke();
      noFill();
    }
    rect(this.x,this.y,this.w,this.h);
    image(this.img,this.x,this.y,this.w,this.h);
    this.color = "NONE";
  }
  //__________________________________________________________

  checkBound(x,y,w,h){
    strokeWeight(7);
    noStroke();
//  if player in range of obj
    //(if statment inspired by: https://happycoding.io Collision Detection tutorial)
    if (x + w/4 > this.x-this.w/2 && x - w/4 < this.x + this.w/2 && y+h/4 > this.y-this.h/2 && y-h/4 < this.y + this.h/2)
      {
        if (role == "hider")
        {
          popup("click space to hide");
          hiding_place = this.place;

          //hint system
          hiding_place_X = this.x;
          hiding_place_Y = this.y;
          //hint system

          this.color = "red";
        }
        else if (role =="seeker")
        {
          search_place = this.place;
          this.color = "green";
          if (!keyIsDown(32))
          {
              popup("click space to search here"); 
              // pop_up_start = frameCount;
          }
          else if (hiding_place != search_place)
          {
            center_pg_popup("no one is hiding here");
            
          }
        }
        return true;
    }
  }
}
//__________________________________________________________