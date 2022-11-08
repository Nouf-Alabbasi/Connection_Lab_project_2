

// let socket = io();
// socket.on('connect', () => {
//     console.log("connection established to server");
// })


// socket.on('start',(data)=>{
//     player_num=2;
//     console.log(data);
// })

let socket;

















// opt things that we can add(but will take more time):
  //let users select their char
  //collision with furniture instead of being able to walk over them

// some things that need to be done
  // think about whether to show player 1 disappear then show you've hid screen
  // implement door and move from one room to another 
  // think about the theme and design



  let P_1;
  let won;
  let P_2;
  let sofa_obj;
  
  let sprites_1 =[];
  let sprites_2 =[];
  let spritesheet_1;
  let spritesheet_2;
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
  
  let start_btn;
  // let temp_btn;
  let instructions_btn;
  // let start_game_btn;
  let player_num = 0;
  let role = "seeker";
  let found = false;
  let clicked = false;
  
  let state = "start";
  let hiding_place = "bed";
  let search_place;
  let num_searched_places = 0;
  let max_num_searches = 3;
  let hide_time = 0;
  let max_hide_time = 500;

  function preload() {
  //   sprites by @ScissorMarks 
    spritesheet_1 = loadImage("imgs/DinoSprites-doux.png");
    spritesheet_2 = loadImage("imgs/DinoSprites-mort.png");
    
    plant = loadImage("imgs/objects_house_0055_Layer-56.png");
    side_table = loadImage("imgs/objects_house_0049_Layer-50.png");
    table = loadImage("imgs/objects_house_0039_Layer-40.png");
    bed = loadImage("imgs/objects_house_0035_Layer-36.png");
    Sofa_chair = loadImage("imgs/objects_house_0013_Layer-14-1.png");
    sofa = loadImage("imgs/objects_house_0004_Layer-5.png");
  
    wall_1 = loadImage("imgs/walls/walls_0043_Layer-44.png");
    wall_2 = loadImage("imgs/walls/walls_0044_Layer-45.png");
    wall_3 = loadImage("imgs/walls/walls_0045_Layer-46.png");
    wall_4 = loadImage("imgs/walls/walls_0046_Layer-47.png");
    wall_5 = loadImage("imgs/walls/walls_0047_Layer-48.png");
    wall_6 = loadImage("imgs/walls/walls_0048_Layer-49.png");
    wall_7 = loadImage("imgs/walls/walls_0049_Layer-50.png");
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
    spritesheet_1.resize(spritesheet_1.width *2.5, spritesheet_1.height *2.5);
    w = int(spritesheet_1.width /24);
    h = int(spritesheet_1.height);
    
    for (let y = 0; y <1 ; y++) {
      sprites_1[y] = [];
      for (let x = 0; x < 24; x++) {
        sprites_1[y][x] = spritesheet_1.get(x * w, y * h, w, h);
      } // iterate over rows
    } // iterate over columns
    
    spritesheet_2.resize(spritesheet_2.width *2.5, spritesheet_2.height *2.5);
    w = int(spritesheet_2.width /24);
    h = int(spritesheet_2.height);
    
    for (let y = 0; y <1 ; y++) {
      sprites_2[y] = [];
      for (let x = 0; x < 24; x++) {
        sprites_2[y][x] = spritesheet_2.get(x * w, y * h, w, h);
      } // iterate over rows
    } // iterate over columns
    
  // // // // // 
    P_2 = new Player(sprites_2);
    P_1 = new Player(sprites_1);
    sides = wall_4.width+7;
    
  
  //   creating the furniture obj
    plant_obj = new furniture("plant",plant,width/4 + (sofa.width/6)+(plant.width/6)+30,sides+(bed.height/6)+(sofa.height/6));
    side_table_obj_1 = new furniture("side_table_1",side_table,(200+bed.width/6),sides + (side_table.height/6)/2);
    side_table_obj_2 = new furniture("side_table_2", side_table,height/2-(bed.width/6),sides + (side_table.height/6)/2);
    table_obj = new furniture("table",table,width-sides*3.2,-sides+height-(table.height/6));
    bed_obj = new furniture("bed",bed,height/2,sides+((bed.height/6)/2));
    Sofa_chair_obj = new furniture("Sofa_chair",Sofa_chair,height/2-((Sofa_chair.width/6)/4),height-sides-(Sofa_chair.width/6));
    sofa_obj = new furniture("sofa",sofa,width/4 + (sofa.width/6),sides+(bed.height/6)+(sofa.height/6));
    
    //creating button obj
    start_btn = new BUTTON("start", width/2,height/2+30);
    // temp_btn = new BUTTON("2players_in", 50,10);
    
    textFont("VT323"); 
    textSize(15);
    instructions_btn = new BUTTON("start game",width/2+(textWidth("instructions")/2)-35,height-50);
    // start_game_btn = new BUTTON("start game",width-30,height/2+30 );
    
  }//end of setup
  
  function draw() {
  
    if(state == "start"){
       start()
     }
    else if (state == "waiting")
    {
      waiting_page();
    }
    else if (state == "display role")
    {
      display_role();
    }
    else if (state == "instructions")
    {
      instructions();
    }
    else if (state == "start_game")
    {
      print(hide_time);
      if (role == "hider"){
        hider() 
      }
      else{
        seeker();
      }
    }
    else if (state == "hidden"){
        hidden();
    }
    else if (state == "end"){
      //print("end");  
      end();
    }
    
  }//end of draw function
  
  function mouseClicked() {
    if(start_btn.InRange()){
      state = "waiting";
      

        socket = io();
        socket.on('connect', () => {
            console.log("connection established to server");
            role = socket.role;
            console.log(role);
        })

        socket.on('start',(data)=>{
            player_num=2;
            console.log(data);
            role = data;
        })

        socket.on('set_hiding_place',(data)=>{
          hiding_place=data;
        })

        socket.on('end_screen',(data)=>{
          if (data==role){
            console.log('win!!!')
            won = true;
            state='end';
          }
          else{
            console.log('lost!!')
            won=false;
            state='end';
          }
        })

    }
    // if (temp_btn.InRange()){
    //   player_num = 2;
    // }
    
    if(instructions_btn.InRange()){
      state = "display role";
      hide_time = frameCount;
    }
    
  }
  
  function keyPressed() {
    if (state =="start_game"){
      if (key == ' ') {
          if (role =="hider")
            {
              state = "hidden";
              socket.emit('hide',hiding_place);
          }
          else if (role =="seeker"){
              num_searched_places+=1;
              if (num_searched_places > max_num_searches)
              {
                socket.emit('end',"hider");
              }
              print("num: ",num_searched_places);
              if (found){//search_place == hiding_place){
                  socket.emit('end',role);
              }
          }
      }
    }
  }
  
  
  function start(){
    rectMode(CORNER);
    fill("black");
    rect(0,0,height,width);
  
    textFont("VT323"); 
    textSize(50);
    fill("white");
    let Text = "HIDE and SEEK";
    text(Text,width/2-textWidth(Text)/2, height/2);
    start_btn.draw_button();
      
  }
  
  function end(){
    rectMode(CORNER);
    fill("black");
    rect(0,0,height,width);
  
    textFont("VT323"); 
    textSize(50);
    fill("white");
    let Text = "Game Ended";
    text(Text,width/2-textWidth(Text)/2, height/2);
    textSize(30);
    let word = won?'won':'lost';
    Text=`You have ${word} the game!`
    text(Text,width/2-textWidth(Text)/2, height/2+50);
  }
  
  
  let k = 200;
  let waiting_text = "WAITING";
  let Second_line = "";
  let stop_time = 1000000;
  
  function waiting_page(){
    rectMode(CORNER);
    fill("black");
    rect(0,0,height,width);
    
    textSize(15);
    fill("white");
    let Text = "waiting for a second player to join";
    text(Text,width/2-textWidth(Text)/2, height/4);
    
    // temp_btn.draw_button();
  
    if (player_num < 2)
    {
      //waiting animiation
      strokeWeight(10);
      stroke("white");
      if (k> (width/2+textWidth("WAITING")/2) +30)
      {
        point(k-30, height/2-5);
      }
      if (k > (width/2+textWidth("WAITING")/2) +60)
      {
        point(k-60, height/2-5);
      }
  
      if (k >400)
      {
        k = width/2+textWidth("WAITING")/2;
      }
      k+=2;
    }
    else if (player_num == 2)
    {
      player_num +=1;
      stop_time = frameCount;
      textSize(25);
      waiting_text = "Second Player is in!";
      fill("white");
      Second_line = "Game starting soon";
      // text("Game starting soon",width/2-textWidth("Game starting soon")/2, height/2+30);
    }
    if (frameCount-stop_time > 60)
    {
      stop_time = frameCount;
      state = "instructions"
    }
    //end of waiting animiation
    fill("white");
    noStroke();
    textWrap(WORD);
    text(waiting_text,width/2-textWidth(waiting_text)/2, height/2);
    text(Second_line,width/2-textWidth(Second_line)/2, height/2+30);
  }
  
  function instructions(){
    rectMode(CORNER);
    fill("black");
    rect(0,0,height,width)
    
    textFont("VT323"); 
    textSize(25);
    fill("white");
    let Text = "Instructions";
    text(Text,width/2-textWidth(Text)/2, 50);
    
    textSize(20);
    text("to be added",width/2-textWidth("to be added")/2, 100);
    instructions_btn.draw_button();
  }
  
  function display_role(){
    cursor("default");
    rectMode(CORNER);
    fill("black");
    rect(0,0,height,width)
    
    textFont("VT323"); 
    textSize(30);
    fill("white");
    let role_text = "You are the: "+role;
    text(role_text,width/2-textWidth(role_text)/2, 100);
    
    if (frameCount-stop_time>280)
    {
      state = "start_game"
    }
  }
  
  function hidden(){
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
  
  function hider(){
    print("sub:", frameCount-hide_time)
    print("hide time ", hide_time);
    if (frameCount-hide_time > max_hide_time)
    {
      state = "hidden";
      socket.emit('hide',hiding_place);
    }

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
    if (role == "hider")
    {
      P_1.draw(); 
    }
    else{
      P_2.draw();
    }
  }
  
  function seeker(){
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
    P_2.draw();
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
  
  class BUTTON{
    constructor(text,x_pos,y_pos){
      this.text = text;
      this.x_pos = x_pos;
      this.y_pos = y_pos;
      textFont("monospace");
      textSize(15);
      this.width_button = textWidth(this.text)+7;
      this.height_button = 30;
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
      textFont("monospace");
      textSize(15);
      noStroke();
      fill("black")
      text(this.text,this.x_pos-(this.width_button-10)/2,this.y_pos+(this.height_button/4));   
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
      if (role =="hider")
        {
          this.checkBound(P_1.get_x(),P_1.get_y(),P_1.get_w(),P_1.get_h());
        }
      else{
        this.checkBound(P_2.get_x(),P_2.get_y(),P_2.get_w(),P_2.get_h());
      }
      
      
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
      //(if statment inspired by: https://happycoding.io Collision Detection tutorial)
      if (x + w/4 > this.x-this.w/2 && x - w/4 < this.x + this.w/2 && y+h/4 > this.y-this.h/2 && y-h/4 < this.y + this.h/2)
        {
          if (role == "hider")
          {
            popup("click space to hide");
            hiding_place = this.place;
            this.color = "red";
          }
          else if (role =="seeker")
          {
            search_place = this.place;
            this.color = "green";
            if (!keyIsDown(32))
            {
               popup("click space to search here"); 
            }
            else{
              if (search_place == hiding_place)
              {
                found = true;
                //state = "end";
                socket.emit('end',role);
              }
              else{
                popup("no one is hiding here");
              }
            }
          }
      }
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
  
  