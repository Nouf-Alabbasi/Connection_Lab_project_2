// opt things that we can add(but will take more time):
  //let users select their char
  //collision with furniture instead of being able to walk over them

// some things that need to be done
  // think about whether to show player 1 disappear then show you've hid screen
  // implement door and move from one room to another 
  // think about the theme and design



  let P_1;
  let sofa_obj;
  
  let sprites =[];
  let spritesheet;
  let w;
  let h;
  let plant;
  let side_table_obj_1;
  let side_table_obj_2;
  let table;
  let bed;
  let Sofa_chair;
  let sofa;
  let check;
  let sides;
  let wall_1;
  let wall_2;
  let wall_3;
  let wall_4;
  let wall_5;
  let wall_6;
  let wall_7;
  
  let state = "playing";
  let hiding_place;
  
  function preload() {
  //   sprites by @ScissorMarks 
    spritesheet = loadImage("DinoSprites-doux.png");
    
    plant = loadImage("objects_house_0055_Layer-56.png");
    side_table = loadImage("objects_house_0049_Layer-50.png");
    table = loadImage("objects_house_0039_Layer-40.png");
    bed = loadImage("objects_house_0035_Layer-36.png");
    Sofa_chair = loadImage("objects_house_0013_Layer-14-1.png");
    sofa = loadImage("objects_house_0004_Layer-5.png");
  
    wall_1 = loadImage("walls_0043_Layer-44.png");
    wall_2 = loadImage("walls_0044_Layer-45.png");
    wall_3 = loadImage("walls_0045_Layer-46.png");
    wall_4 = loadImage("walls_0046_Layer-47.png");
    wall_5 = loadImage("walls_0047_Layer-48.png");
    wall_6 = loadImage("walls_0048_Layer-49.png");
    wall_7 = loadImage("walls_0049_Layer-50.png");
  }
  
  function setup() {
    createCanvas(400, 400);
    background("#7a8786"); 
    wall_1.resize(wall_1.width *0.25, 0);
    wall_2.resize(wall_2.width *0.25, 0);
    wall_3.resize(wall_3.width *0.25, 0);
    wall_4.resize(wall_4.width *0.25, 0);
    wall_5.resize(wall_5.width *0.25, 0);
    wall_6.resize(wall_6.width *0.25, 0);
    wall_7.resize(wall_7.width *0.25, 0);
  
  //   prep sprite (maybe they can pick their char?)
    spritesheet.resize(spritesheet.width *2.5, spritesheet.height *2.5);
    w = int(spritesheet.width /24);
    h = int(spritesheet.height);
    
    for (let y = 0; y <1 ; y++) {
      sprites[y] = [];
      for (let x = 0; x < 24; x++) {
        sprites[y][x] = spritesheet.get(x * w, y * h, w, h);
      } // iterate over rows
    } // iterate over columns
  
    
  // // // // // 
    P_1 = new Player();
    sides = wall_4.width+7;
    
  
  //   creating the furniture obj
    plant_obj = new furniture("plant",plant,width/4 + (sofa.width/6)+(plant.width/6)+30,sides+(bed.height/6)+(sofa.height/6));
    
    side_table_obj_1 = new furniture("side_table_1",side_table,(200+bed.width/6),sides + (side_table.height/6)/2);
    
    side_table_obj_2 = new furniture("side_table_2", side_table,height/2-(bed.width/6),sides + (side_table.height/6)/2);
    
    table_obj = new furniture("table",table,width-sides*3.2,-sides+height-(table.height/6));
    
    bed_obj = new furniture("bed",bed,height/2,sides+((bed.height/6)/2));
    
    Sofa_chair_obj = new furniture("Sofa_chair",Sofa_chair,height/2-((Sofa_chair.width/6)/4),height-sides-(Sofa_chair.width/6));
    sofa_obj = new furniture("sofa",sofa,width/4 + (sofa.width/6),sides+(bed.height/6)+(sofa.height/6));
  }//end of setup
  
  function draw() {
  
    if (state == "end"){
      rectMode(CORNER);
      fill("black");
      rect(0,0,height,width)
      
      textFont("VT323"); 
      textSize(20);
      fill("white");
      let Text = "hiding place: " + hiding_place;
      text(Text,width/2-textWidth(Text)/2, height/2);
      
      textSize(15);
      text("press return to restart",width/2-textWidth("press return to restart")/2, (height/3)*2);
      text("(restart not implemented yet)",width/2-textWidth("(restart not implemented yet)")/2, (height/3)*2+30);
    }
    else if (state == "playing")
    {
        draw_game()
    }
  }//end of draw function
  
  function draw_game(){
    imageMode(CENTER);
    background("#7a8786"); 
    imageMode(CENTER);
    
  // walls
  //   left wall
    image(wall_4,wall_4.width/2,wall_1.height*1.5);
    image(wall_4,wall_4.width/2,wall_1.height*2.5);
    image(wall_4,wall_4.width/2,wall_1.height*3.2);
  
  //   right wall
    // image(wall_4,width-wall_4.width/2,wall_1.height*1.5);
    image(wall_4,width-wall_4.width/2,wall_1.height*2.5);
    image(wall_4,width-wall_4.width/2,wall_1.height*3.2);
  
  //  top wall
    image(wall_6,wall_6.width/2,wall_6.height/2);
    image(wall_7,wall_7.width*1.5,wall_7.height/2);
    image(wall_7,wall_7.width*2.5,wall_7.height/2);
    image(wall_7,wall_7.width*3.2,wall_7.height/2);
  
  //  bottom wall
    image(wall_6,wall_6.width/2,height-wall_6.height/2);
    image(wall_7,wall_7.width*1.5,height-wall_7.height/2);
    image(wall_7,wall_7.width*2.5,height-wall_7.height/2);
    image(wall_7,wall_7.width*3.2,height-wall_7.height/2);
    
  //   corners
    image(wall_1,wall_1.width/2,wall_1.height/2);
    image(wall_5,width-wall_5.width/2,height-wall_5.height/2);
    image(wall_3,width-wall_3.width/2,wall_3.height/2);
      image(wall_2,wall_2.width/2,height-wall_2.height/2);
    
  //   draw the furniture
    sofa_obj.draw();
    plant_obj.draw();
    side_table_obj_1.draw();
    side_table_obj_2.draw();
    table_obj.draw();
    bed_obj.draw();
    
    Sofa_chair_obj.draw();
    P_1.draw();
  }
  
  function popup(Text)
  {
    textFont("VT323"); 
    textSize(20);
    fill("#394747");
    width_title = textWidth(Text);
    height_title = textAscent(Text)+textDescent(Text);
    rectMode(CORNERS);
    // rect(width-width_title-50, height - 50, width_title,width_title);
    rect(width-sides+10, height-sides+10, width-width_title-sides-10, height-height_title-sides);
    
    fill("white");
    text(Text,width-width_title-sides,height-sides);
    noFill();
    noStroke();
    rectMode(CENTER);
    
  }
  
  function keyPressed() {
    if (key == ' ') {
      noLoop();
      state = "end";
    }
  }
  class Player{
    constructor(){
      this.x_pos = 370;
      this.y_pos = 130;
      this.speed = 3;
      this.width = 50
      this.height = 50
      this.left = 1;
      this.sprite_spd = 6;
      this.step = 0;
    }
    
    draw(){
      sofa_obj.checkBound(this.x_pos,this.y_pos,this.width, this.height);
      
   plant_obj.checkBound(this.x_pos,this.y_pos,this.width, this.height);
   side_table_obj_1.checkBound(this.x_pos,this.y_pos,this.width, this.height);
   side_table_obj_2.checkBound(this.x_pos,this.y_pos,this.width, this.height);
      
   table_obj.checkBound(this.x_pos,this.y_pos,this.width, this.height);
      
   bed_obj.checkBound(this.x_pos,this.y_pos,this.width, this.height);
   Sofa_chair_obj.checkBound(this.x_pos,this.y_pos,this.width, this.height);
      this.move();
      // rect(this.x_pos,this.y_pos,this.width,this.height);
      
      // this.check_sides();
      if (!this.left){
        image(sprites[0][this.step], this.x_pos, this.y_pos);
      }
      else{
        push();
        scale(-1, 1);
        image(sprites[0][this.step], -this.x_pos, this.y_pos);
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
  
  
  class furniture{
    constructor(place,img,x,y){
      this.place = place;
      this.img = img;
      this.h = this.img.height/6;
      this.w = this.img.width/6;
      this.x=x;
      this.y=y;
      this.color = "#7a8786";
    }
    
    draw(){
      imageMode(CENTER);
      rectMode(CENTER);
      noFill();
      this.checkBound(P_1.get_x(),P_1.get_y(),P_1.get_w(),P_1.get_h());
      stroke(this.color);
      fill(this.color)
      rect(this.x,this.y,this.w,this.h);
      image(this.img,this.x,this.y,this.w,this.h);
      this.color = "#7a8786";
    }
    
    checkBound(x,y,w,h){
      strokeWeight(7);
      noStroke();
  //  if player in range of obj
      if (x + w/4 > this.x-this.w/2 && x - w/4 < this.x + this.w/2 && y+h/4 > this.y-this.h/2 && y-h/4 < this.y + this.h/2)
        {
          popup("click space to hide");
          hiding_place = this.place;
          this.color = "red";
      }
      //(if statment inspired by: https://happycoding.io Collision Detection tutorial)
    }
  
  }
  
  
  
  
  // draft code:
  
  
  //       // player on the left (given x would be greater than this.x)
  //     if (x > this.x+this.w/2 &&  x < this.x+this.w/2+w/4)
  //     {
  // //     check that orange is greater than pink and smaller than green
  // //     check that the red is greater than the pink and smaller than the green
  //       if (y+h/4 < this.y +this.h/2 && y+h/4 >this.y-this.h/2 || y-h/4 < this.y +this.h/2 && y-h/4 >this.y-this.h/2 )
  //       {
  //         print("left")
  //         return "left";
  //       }
  //     }
      
  // //     if obj to the right of player
  //     if (x+w/4 > this.x-this.w/2 &&  x+w/4 < this.x-this.w/2+w/4)
  //     {
  //       if (y+h/4 < this.y +this.h/2 && y+h/4 >this.y-this.h/2 || y-h/4 < this.y +this.h/2 && y-h/4 >this.y-this.h/2 )
  //       {
  //         print("right")
  //         return "right";
  //       }
  //     } 
      
      
  // // //     if obj to the top of player
  // //     if (x+w/4 > this.x-this.w/2 &&  x+w/4 < this.x+this.w/2)
  // //     {
  // //       if (y+h/4 < this.y +this.h/2 && y+h/4 >this.y-this.h/2 || y-h/4 < this.y +this.h/2 && y-h/4 >this.y-this.h/2 )
  // //       {
  // //         print("up")
  // //         return "up";
  // //       }
  // //     }
  
  