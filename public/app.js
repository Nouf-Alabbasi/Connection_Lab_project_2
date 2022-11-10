

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

let stop=false;

let P_1;
let won;
let moveData;
let P_2;
// let sofa_obj_room2;
let hid=false;
let sprites_1 =[];
let sprites_2 =[];
let spritesheet_1;
let spritesheet_2;
let w;
let h;

// side_tableObj_1_room1
// side_tableObj_2_room1
// bed_obj_room1
// plant_obj_room2
// table_obj_room2
// Sofa_chair_obj_room2
// Sofa_chair_obj2_room2
// sofa_obj_room2

let plant;
let side_table;
let table;
let bed;
let single_bed;
let Sofa_chair;
let Sofa_chair_2;
let sofa;
let tv;
let sofa_side;
let rug;
let dining_table;
let dining_table_chair_1;
let dining_table_chair_2;
let dining_table_chair_3;

let plant_obj_room2;
let plant_obj_room1;
let side_tableObj_1_room1;
let side_tableObj_2_room1;
let table_obj_room2;
let bed_obj_room1;
let Sofa_chair_obj_room2;
let Sofa_chair_obj2_room2;
let sofa_obj_room2;

let bed_obj_2_room3;
let bed_obj_room3;
let tv_room3;
let sofa_room3;

let dining_table_obj_room4;
let chair_obj_1;
let chair_obj_2;
let chair_obj_3;

let check;
let sides;
let wall_1;
let wall_2;
let wall_3;
let wall_4;
let wall_5;
let wall_6;
let wall_7;
let seeker_x;
let seeker_y;
let spectator_left;
let spectator_right;
let spectator_up;
let spectator_down;

let DarkRoom1;
let DarkRoom2;
let DarkRoom3;
let DarkRoom4;

let start_btn;
// let temp_btn;
let instructions_btn;
// let start_game_btn;
let player_num = 0;
let role = "seeker";
let found = false;
let clicked = false;
let pop_up_start = 0;
let pop_up_end = 500;

let state = "start";
let hiding_place = "bed";
let search_place;
let num_searched_places = 0;
let max_num_searches = 3;
let hide_time = 0;
let max_hide_time = 600;
let winSound;
let missHitSound;
let lossSound;




function delay(milliseconds){
  return new Promise(resolve => {
      setTimeout(resolve, milliseconds);
  });
}
function preload() {
//   sprites by @ScissorMarks 
  spritesheet_1 = loadImage("imgs/DinoSprites-doux.png");
  spritesheet_2 = loadImage("imgs/DinoSprites-mort.png");
  
  plant = loadImage("imgs/objects_house_0055_Layer-56.png");
  side_table = loadImage("imgs/objects_house_0049_Layer-50.png");
  table = loadImage("imgs/objects_house_0039_Layer-40.png");
  bed = loadImage("imgs/objects_house_0035_Layer-36.png");
  Sofa_chair = loadImage("imgs/objects_house_0013_Layer-14-1.png");
  Sofa_chair_2 = loadImage("imgs/2objects_house_0013_Layer-14-1.png");
  sofa = loadImage("imgs/objects_house_0004_Layer-5.png");
  // single_bed = loadImage("imgs/objects_house_0004_Layer-5.png");
  // tv = loadImage("imgs/objects_house_0004_Layer-5.png");
  single_bed = loadImage("imgs/objects_house_0038_Layer-39.png")
  tv = loadImage("imgs/objects_house_0021_Layer-22.png")
  sofa_side = loadImage("imgs/objects_house_0003_Layer-4.png")
  rug = loadImage("imgs/rug.png")
  dining_table = loadImage("imgs/objects_house_0044_Layer-45.png");
  dining_table_chair_1= loadImage("imgs/objects_house_0014_Layer-15.png");
  dining_table_chair_2= loadImage("imgs/2objects_house_0014_Layer-15.png");
  dining_table_chair_3= loadImage("imgs/3objects_house_0014_Layer-15.png");


  wall_1 = loadImage("imgs/walls/walls_0043_Layer-44.png");
  wall_2 = loadImage("imgs/walls/walls_0044_Layer-45.png");
  wall_3 = loadImage("imgs/walls/walls_0045_Layer-46.png");
  wall_4 = loadImage("imgs/walls/walls_0046_Layer-47.png");
  wall_5 = loadImage("imgs/walls/walls_0047_Layer-48.png");
  wall_6 = loadImage("imgs/walls/walls_0048_Layer-49.png");
  wall_7 = loadImage("imgs/walls/walls_0049_Layer-50.png");

  winSound = loadSound('sound/win.mp3')
  lossSound = loadSound('sound/lost.wav')
  missHitSound = loadSound('sound/miss-hit.wav')
}

function setup() {
  createCanvas(1280, 720);
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

  // room 1
  side_tableObj_1_room1 = new furniture("side table 1 bedroom",side_table,(200+bed.width/6)+50, 80);
  side_tableObj_2_room1 = new furniture("side table 2 bedroom", side_table, 100 ,80);
  bed_obj_room1 = new furniture("bed in bedroom",bed,230,120);
  plant_obj_room1 = new furniture("plant in bedroom",plant,80,300);

  // room 2
  plant_obj_room2 = new furniture("plant in living room",plant,800,70);
  table_obj_room2 = new furniture("table in living room",table,650,330);
  Sofa_chair_obj_room2 = new furniture("Sofa chair 1 in living room",Sofa_chair,530,160);
  Sofa_chair_obj2_room2 = new furniture("Sofa chair 2 in living room",Sofa_chair_2,730,160);
  sofa_obj_room2 = new furniture("sofa in living room",sofa,630,60);
  rug_room2 = new furniture("rug in guest room",rug,630,140);

  // room 3
  bed_obj_room3 = new furniture("bed in guest room",single_bed,600,450);
  bed_obj_2_room3 = new furniture("bed in guest room",single_bed,500,450);
  tv_room3 = new furniture("Tv in guest room",tv,830,450)
  sofa_room3 = new furniture("sofa in guest room",sofa_side,750,450)

  // room 4
  dining_table_obj_room4 = new furniture("dining table",dining_table, 1090,150);
  chair_obj_1 = new furniture("dining chair",dining_table_chair_1, 1060,80);
  chair_obj_2 = new furniture("dining chair",dining_table_chair_2, 965,150);
  chair_obj_3 = new furniture("dining chair",dining_table_chair_3, 1200,180);
  
  //creating button obj
  start_btn = new BUTTON("start", width/2,height/2+60);
  // temp_btn = new BUTTON("2players_in", 50,10);
  
  textFont("VT323"); 
  textSize(15);
  instructions_btn = new BUTTON("start game",width/2+(textWidth("instructions")/2)-35,height-100);
  // start_game_btn = new BUTTON("start game",width-30,height/2+30 );
  
  // create dark rooms
  DarkRoom1 = new darkRoom((width/3)/2,height/4);
  DarkRoom2 = new darkRoom((width/3)*1.5,height/4);
  DarkRoom3 = new darkRoom((width/3)*2.5,height/4);
  DarkRoom4 = new darkRoom((width/3)*1.5,height/1.33);

}//end of setup

function draw() {
  print(mouseX,mouseY);
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
    hid=false;
    print(hide_time);
    if (role == "hider"){
      hider() 
    }
    else{
      seeker();
    }
  }
  else if (state == "hidden"){
      // hidden();
      hider_hidden();
  }
  else if (state == "end"){
    //print("end");  
    end();
  }
  // else if (state == "pop_up_seeker")
  // {
  //   center_pg_popup("no one is hiding here","show");
  // }
  // else if (state == "resume_after_popup")
  // {
  //   center_pg_popup("no one is hiding here","hide");
  // }
  
}//end of draw function

function mouseClicked() {
  if(start_btn.InRange() && state =="start"){
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
        if (role=='hider'){
          socket.on('move_seeker',(data)=>{
            spectator_left=data.left;
            spectator_right=data.right;
            spectator_up=data.up;
            spectator_down=data.down;
          })
        }
      })

      socket.on('set_hiding_place',(data)=>{
        hiding_place=data;
        hid=true;
      })

      socket.on('end_screen',(data)=>{
        if (data==role){
          console.log('win!!!')
          won = true;
          winSound.play();
          state='end';
        }
        else{
          console.log('lost!!')
          won=false;
          lossSound.play();
          state='end';
        }
      })

  }
  // if (temp_btn.InRange()){
  //   player_num = 2;
  // }
  
  if(instructions_btn.InRange() && state == "instructions"){
    state = "display role";
  }
  
}

function keyPressed() {
  if (state =="start_game"){
    if (key == ' ') {
        if (role =="hider" && P_1.check_in_Bound())
          {
            state = "hidden";
            socket.emit('hide',hiding_place);
        }
        // else if (stop){
        //   loop();
        //   stop = false;
        // }
        else if (role =="seeker" && P_2.check_in_Bound()){
            num_searched_places+=1;
            //fix a small bug
            if (found){//search_place == hiding_place){
              socket.emit('end',role);
            }
            if (num_searched_places >= max_num_searches)
            {
              socket.emit('end',"hider");
            }
            print("num: ",num_searched_places);
            

            // pop_up_start = frameCount;
            if (search_place == hiding_place)
            {
              found = true;
              //state = "end";
              socket.emit('end',role);
            }
            else{
              center_pg_popup("no one is hiding here");
              missHitSound.play();
            }
        }
    }
  }

  // else{
  //   if (search_place == hiding_place)
  //   {
  //     found = true;
  //     //state = "end";
  //     socket.emit('end',role);
  //   }
  //   else{
  //     // center_pg_popup("no one is hiding here");
  //     // let current_time = pop_up_start;
  //     popup("no one is hiding here");
  //     // while (!(current_time-pop_up_start > pop_up_end))
  //     // {
  //     //   print("start time", pop_up_start, "currect frameCount", frameCount, "subtraction", current_time-pop_up_start)
  //     //   center_pg_popup("no one is hiding here");
  //     //   print(frameCount);
  //     //   current_time+=1;
  //     // }
  //   }
  // }

}


function start(){
  rectMode(CORNER);
  fill("black");
  rect(0,0,width,height);

  textFont("VT323"); 
  textSize(100);
  fill("white");
  let Text = "HIDE and SEEK";
  text(Text,width/2-textWidth(Text)/2, height/2);
  start_btn.draw_button();
    
}

function end(){
  rectMode(CORNER);
  fill("black");
  rect(0,0,width,height);

  textFont("VT323"); 
  textSize(100);
  fill("white");
  let Text = "Game Ended";
  text(Text,width/2-textWidth(Text)/2, height/2);
  textSize(50);
  let word = won?'won':'lost';
  Text=`You have ${word} the game!`
  text(Text,width/2-textWidth(Text)/2, height/2+70);
  socket.disconnect();
  noLoop();
}


let k = 700;
let waiting_text = "WAITING";
let Second_line = "";
let stop_time = 1000000;

function waiting_page(){
  cursor("default");
  rectMode(CORNER);
  fill("black");
  rect(0,0,width,height);
  
  textSize(30);
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
      print("this");
      point(k-30, height/2-5);
    }
    if (k > (width/2+textWidth("WAITING")/2) +60)
    {
      print("that");
      point(k-60, height/2-5);
    }
    if (k > (width/2+textWidth("WAITING")/2) +90)
    {
      print("that");
      point(k-90, height/2-5);
    }
    if (k > (width/2+textWidth("WAITING")/2) +120)
    {
      print("that");
      point(k-120, height/2-5);
    }

    if (k >860)
    {
      print("these");
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
  rect(0,0,width,height)

  textFont("VT323"); 
  textSize(70);
  fill("white");
  let Text = "Instructions";
  text(Text,width/2-textWidth(Text)/2, 100);

  textFont("monospace"); 
  textSize(25);
  let line_1 = "This is an online hide and seek game. You play online with another player.";
  let line_2 = "One player will be the seeker, and the other would be the hider";
  let line_3 = "To move The players would use the";
  let line_4 = " up  down  left  right";
  let line_5 = " arrows";
  let line_6 = " The seeker should press the space bar to search a hiding spot";
  let line_7 = " The hider should press the space bar to hide in a hiding spot";
  let line_8 = "SPACE";
  fill("white");
  rect(585+14,250,58,50);
  rect(656+15,250,70,50);
  rect(745+15,250,70,50);
  rect(850,250,80,50);
  rect(width/2-400/2,460,400,60);
  text(line_1,width/2-textWidth(line_1)/2, 170);
  text(line_2,85, 220);
  text(line_3,85, 280);
  text(line_6,70, 360);
  text(line_7,70, 410);
  fill("black");
  text(line_4,600, 280);
  text(line_8,width/2-(textWidth(line_8)/2), 500);

  fill("white");
  text(line_5,930, 280);
  // text(line_4,width/2-textWidth(line_4)/2, 250);

  instructions_btn.draw_button();
  
}

function display_role(){
  cursor("default");
  rectMode(CORNER);
  fill("black");
  rect(0,0,width,height)
  
  textFont("VT323"); 
  textSize(100);
  fill("white");
  let role_text = "You are the: "+role;
  text(role_text,width/2-textWidth(role_text)/2, 300);
  if (role=='seeker'){
    wait_text = "waiting for the hider to hide"
    textSize(40);
    text(wait_text,width/2-textWidth(wait_text)/2, 370);
  }

  if ((frameCount-stop_time>100 && role=='hider') || (role=='seeker' && hid))
  {
    state = "start_game"
    hide_time = frameCount;
  }
}

function hider_hidden(){
  imageMode(CENTER);
  background("#7a8786"); 
  imageMode(CENTER);

  // draw placeholder rooms
  rectMode(CORNER);
  noStroke();
  fill("#201E1F");
  rect(0,height/2,width/3,height/2);
  rect((width/3)*2,height/2,width/3,height/2);

  //   draw the furniture
  // room 1
  plant_obj_room1.draw();
  side_tableObj_1_room1.draw();
  side_tableObj_2_room1.draw();
  bed_obj_room1.draw();
  
  // room 2
  sofa_obj_room2.draw();
  plant_obj_room2.draw();
  table_obj_room2.draw();
  Sofa_chair_obj_room2.draw();
  Sofa_chair_obj2_room2.draw();

  // room 3
  bed_obj_room3.draw();
  bed_obj_2_room3.draw();
  tv_room3.draw();
  sofa_room3.draw();
  rug_room2.draw();

  // room 4
  dining_table_obj_room4.draw();
  chair_obj_1.draw();
  chair_obj_2.draw();
  chair_obj_3.draw();

  // the dark rooms
  rectMode(CENTER);
  DarkRoom1.draw();
  DarkRoom2.draw();
  DarkRoom3.draw();
  DarkRoom4.draw();

  // the empty rooms
  textFont("VT323"); 
  textSize(50);
  fill("white");

  text("HIDE",150, 500);
  text("and",180, 550);
  text("SEEK",210, 600);

  text("HIDE",990, 500);
  text("and",1020, 550);
  text("SEEK",1050, 600); 

// walls
//   left wall
for (let i=0; i<height; i+= wall_1.height)
{
  image(wall_4,wall_4.width/2,i);
}

//   right wall
for (let i=0; i<height; i+= wall_1.height)
{
  image(wall_4,width-wall_4.width/2,i);
}

//  top wall
for (let i=0; i<width; i+= wall_1.width)
{
  image(wall_7,i, wall_7.height/2);
}


//  bottom wall
for (let i=0; i<width; i+= wall_1.width)
{
image(wall_7,i, height-wall_6.height/2);
}

//   corners
  image(wall_1,wall_1.width/2,wall_1.height/2);
  image(wall_5,width-wall_5.width/2,height-wall_5.height/2);
  image(wall_3,width-wall_3.width/2,wall_3.height/2);
  image(wall_2,wall_2.width/2,height-wall_2.height/2);

  // draw room divisions
  rectMode(CORNER);
  noStroke();
  fill("#403124");
  rect(0,height/2, width,10);
  rect(width/3,0, 10,height);
  rect((width/3)*2,0, 10,height);

  // door openings
  fill("#7a8786")
  rect((width/3)*2-1,200, 12,100);
  rect((width/3)-1,200, 12,100);
  rect((width/3)-1,550, 12,100);
  rect((width/3)*2-1,550, 12,100);
  rect(width-300,height/2-1, 100,12);

// //   draw the furniture
//   // room 1
//   plant_obj_room1.draw();
//   side_tableObj_1_room1.draw();
//   side_tableObj_2_room1.draw();
//   bed_obj_room1.draw();
  
//   // room 2
//   sofa_obj_room2.draw();
//   plant_obj_room2.draw();
//   table_obj_room2.draw();
//   Sofa_chair_obj_room2.draw();
//   Sofa_chair_obj2_room2.draw();

//   // room 3
//   bed_obj_room3.draw();
//   bed_obj_2_room3.draw();
//   tv_room3.draw();
//   sofa_room3.draw();
//   rug_room2.draw();

//   // room 4
//   dining_table_obj_room4.draw();
//   chair_obj_1.draw();
//   chair_obj_2.draw();
//   chair_obj_3.draw();

  // P_2.x_pos=seeker_x;
  // P_2.y_pos=seeker_y;
  P_2.spectator=true;
  P_2.draw();

  textFont("VT323"); 
  textSize(20);
  fill("white");
  let timer = "Seeker's view";
  text(timer, wall_4.width,20);


}

function hidden(){
  rectMode(CORNER);
  fill("black");
  rect(0,0,width,height)

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

  if (frameCount-hide_time > max_hide_time)
  {
    state = "hidden";
    socket.emit('hide',hiding_place);
  }

  // imageMode(CENTER);
  background("#7a8786"); 
  imageMode(CENTER);

//   draw the furniture
  // room 1
  plant_obj_room1.draw();
  side_tableObj_1_room1.draw();
  side_tableObj_2_room1.draw();
  bed_obj_room1.draw();
  
  // room 2
  sofa_obj_room2.draw();
  plant_obj_room2.draw();
  table_obj_room2.draw();
  Sofa_chair_obj_room2.draw();
  Sofa_chair_obj2_room2.draw();

  // room 3
  bed_obj_room3.draw();
  bed_obj_2_room3.draw();
  tv_room3.draw();
  sofa_room3.draw();
  rug_room2.draw();

  // room 4
  dining_table_obj_room4.draw();
  chair_obj_1.draw();
  chair_obj_2.draw();
  chair_obj_3.draw();


  rectMode(CENTER);
  DarkRoom1.draw();
  DarkRoom2.draw();
  DarkRoom3.draw();
  DarkRoom4.draw();

  // draw placeholder rooms
  rectMode(CORNER);
  noStroke();
  fill("#201E1F");
  rect(0,height/2,width/3,height/2);
  rect((width/3)*2,height/2,width/3,height/2);

  textFont("VT323"); 
  textSize(50);
  fill("white");

  text("HIDE",150, 500);
  text("and",180, 550);
  text("SEEK",210, 600);

  text("HIDE",990, 500);
  text("and",1020, 550);
  text("SEEK",1050, 600);

// walls
//   left wall
  for (let i=0; i<height; i+= wall_1.height)
  {
    image(wall_4,wall_4.width/2,i);
  }

//   right wall
  for (let i=0; i<height; i+= wall_1.height)
  {
    image(wall_4,width-wall_4.width/2,i);
  }

//  top wall
  for (let i=0; i<width; i+= wall_1.width)
  {
    image(wall_7,i, wall_7.height/2);
  }


//  bottom wall
for (let i=0; i<width; i+= wall_1.width)
{
  image(wall_7,i, height-wall_6.height/2);
}

//   corners
  image(wall_1,wall_1.width/2,wall_1.height/2);
  image(wall_5,width-wall_5.width/2,height-wall_5.height/2);
  image(wall_3,width-wall_3.width/2,wall_3.height/2);
  image(wall_2,wall_2.width/2,height-wall_2.height/2);

  // draw room divisions
  rectMode(CORNER);
  noStroke();
  fill("#403124");
  rect(0,height/2, width,10);
  rect(width/3,0, 10,height);
  rect((width/3)*2,0, 10,height);

  // door openings
  fill("#7a8786")
  rect((width/3)*2-1,200, 12,100);
  rect((width/3)-1,200, 12,100);
  rect((width/3)-1,550, 12,100);
  rect((width/3)*2-1,550, 12,100);
  rect(width-300,height/2-1, 100,12);

  if (role == "hider")
  {
    P_1.draw();
    textFont("VT323"); 
    textSize(20);
    fill("white");
    let timer = "time: " + int((frameCount-hide_time)/60)+"/"+int(max_hide_time/60);
    text(timer, wall_4.width,20);
  }
  else{
    P_2.draw();
  }

}

function seeker(){
  imageMode(CENTER);
  background("#7a8786"); 
  imageMode(CENTER);

  // draw placeholder rooms
  rectMode(CORNER);
  noStroke();
  fill("#201E1F");
  rect(0,height/2,width/3,height/2);
  rect((width/3)*2,height/2,width/3,height/2);

  //   draw the furniture
  // room 1
  plant_obj_room1.draw();
  side_tableObj_1_room1.draw();
  side_tableObj_2_room1.draw();
  bed_obj_room1.draw();
  
  // room 2
  sofa_obj_room2.draw();
  plant_obj_room2.draw();
  table_obj_room2.draw();
  Sofa_chair_obj_room2.draw();
  Sofa_chair_obj2_room2.draw();

  // room 3
  bed_obj_room3.draw();
  bed_obj_2_room3.draw();
  tv_room3.draw();
  sofa_room3.draw();
  rug_room2.draw();

  // room 4
  dining_table_obj_room4.draw();
  chair_obj_1.draw();
  chair_obj_2.draw();
  chair_obj_3.draw();

  // the dark rooms
  rectMode(CENTER);
  DarkRoom1.draw();
  DarkRoom2.draw();
  DarkRoom3.draw();
  DarkRoom4.draw();

  // the empty rooms
  textFont("VT323"); 
  textSize(50);
  fill("white");

  text("HIDE",150, 500);
  text("and",180, 550);
  text("SEEK",210, 600);

  text("HIDE",990, 500);
  text("and",1020, 550);
  text("SEEK",1050, 600);

// walls
//   left wall
for (let i=0; i<height; i+= wall_1.height)
{
  image(wall_4,wall_4.width/2,i);
}

//   right wall
for (let i=0; i<height; i+= wall_1.height)
{
  image(wall_4,width-wall_4.width/2,i);
}

//  top wall
for (let i=0; i<width; i+= wall_1.width)
{
  image(wall_7,i, wall_7.height/2);
}


//  bottom wall
for (let i=0; i<width; i+= wall_1.width)
{
image(wall_7,i, height-wall_6.height/2);
}
//   corners
  image(wall_1,wall_1.width/2,wall_1.height/2);
  image(wall_5,width-wall_5.width/2,height-wall_5.height/2);
  image(wall_3,width-wall_3.width/2,wall_3.height/2);
  image(wall_2,wall_2.width/2,height-wall_2.height/2);

// draw room divisions
rectMode(CORNER);
noStroke();
fill("#403124");
rect(0,height/2, width,10);
rect(width/3,0, 10,height);
rect((width/3)*2,0, 10,height);

// door openings
fill("#7a8786")
rect((width/3)*2-1,200, 12,100);
rect((width/3)-1,200, 12,100);
rect((width/3)-1,550, 12,100);
rect((width/3)*2-1,550, 12,100);
rect(width-300,height/2-1, 100,12);

// //   draw the furniture
//   // room 1
//  plant_obj_room1.draw();
//  side_tableObj_1_room1.draw();
//  side_tableObj_2_room1.draw();
//  bed_obj_room1.draw();
 
//  // room 2
//  sofa_obj_room2.draw();
//  plant_obj_room2.draw();
//  table_obj_room2.draw();
//  Sofa_chair_obj_room2.draw();
//  Sofa_chair_obj2_room2.draw();

//  // room 3
//  bed_obj_room3.draw();
//  bed_obj_2_room3.draw();
//  tv_room3.draw();
//  sofa_room3.draw();
//  rug_room2.draw();

//   // room 4
//   dining_table_obj_room4.draw();
//   chair_obj_1.draw();
//   chair_obj_2.draw();
//   chair_obj_3.draw();

  P_2.draw();
  

  textFont("VT323"); 
  textSize(20);
  fill("white");
  let timer = "number of searched places " + (num_searched_places)+"/"+max_num_searches;
  text(timer, wall_4.width,20);
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

async function center_pg_popup(Text)
{
  textFont("VT323"); 
  textSize(20);
  fill("#394747");
  width_title = textWidth(Text);
  height_title = textAscent(Text)+textDescent(Text);
  rectMode(CENTER);
  // rect(width-width_title-50, height - 50, width_title,width_title);
  rect(width/2,height/2,width_title+10,height_title+20);
  
  fill("white");
  text(Text,width/2-width_title/2,height/2+height_title/4);
  noFill();
  noStroke();
  rectMode(CENTER);
  // stop = true;
  noLoop();
  await delay(500);
  loop()
}

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

    // imageMode(CENTER);
    // rectMode(CENTER);
    // noFill();
    // if (role =="hider")
    //   {
    //     this.checkBound(P_1.get_x(),P_1.get_y(),P_1.get_w(),P_1.get_h());
    //   }
    // else{
    //   this.checkBound(P_2.get_x(),P_2.get_y(),P_2.get_w(),P_2.get_h());
    // }
    
    
    // stroke(this.color);
    // fill(this.color)
    // rect(this.x,this.y,this.w,this.h);
    // image(this.img,this.x,this.y,this.w,this.h);
    // this.color = "#7a8786";
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

