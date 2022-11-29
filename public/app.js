// authors: Hashim and Nouf
// this is am online 2 player hide and seek game created for connections lab fall 2023

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

//   prep sprite
  prep_sprite();

//   creating the furniture obj
  create_furn_obj();
  
  //creating button obj
  start_btn = new BUTTON("start", width/2,height/2+60);
  
  textFont("VT323"); 
  textSize(15);
  instructions_btn = new BUTTON("start game",width/2+(textWidth("instructions")/2)-35,height-100);
  
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

      socket.on('not_implemented',(data)=>{
        window.alert('2 players are already playing, please wait and refresh!');
        socket.disconnect();
      })

      socket.on('start',(data)=>{
        player_num=2;
        // console.log(data);
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
}
