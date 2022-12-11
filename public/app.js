// authors: Hashim and Nouf
// this is am online 2 player hide and seek game created for connections lab fall 2023

function setup() {
  createCanvas(1280, 720);
  background("#7a8786");
  wall_1.resize(wall_1.width * 0.25, 0);
  wall_2.resize(wall_2.width * 0.25, 0);
  wall_3.resize(wall_3.width * 0.25, 0);
  wall_4.resize(wall_4.width * 0.25, 0);
  wall_5.resize(wall_5.width * 0.25, 0);
  wall_6.resize(wall_6.width * 0.25, 0);
  wall_7.resize(wall_7.width * 0.25, 0);

  //   prep sprite
  prep_sprite();

  //   creating the furniture obj
  create_furn_obj();

  //creating button obj
  start_btn = new BUTTON("start", width / 2, height / 2 + 60);
  restart_btn = new BUTTON("restart", width / 2, height / 2 + 60);

  textFont("VT323");
  textSize(15);
  instructions_btn = new BUTTON("start game", width / 2 + (textWidth("instructions") / 2) - 35, height - 50);

  refresh_btn = new BUTTON("restart", width / 2 + (textWidth("restart") / 2) - 65, height - 50);
  // create dark rooms
  DarkRoom1 = new darkRoom((width / 3) / 2, height / 4);
  DarkRoom2 = new darkRoom((width / 3) * 1.5, height / 4);
  DarkRoom3 = new darkRoom((width / 3) * 2.5, height / 4);
  DarkRoom4 = new darkRoom((width / 3) * 1.5, height / 1.33);

}//end of setup

function draw() {
  // print(mouseX, mouseY);
  if (state == "start") {
    start();
  }
  else if (state == "waiting") {
    waiting_page();
  }
  else if (state == "display role") {
    display_role();
  }
  else if (state == "instructions") {
    instructions();
  }
  else if (state == "start_game") {
    hid = false;
    // print(hide_time);
    if (role == "hider") {
      hider()
    }
    else {
      seeker();
    }
  }
  else if (state == "hidden") {
    // hidden();
    hider_hidden();
  }
  else if (state == "end") {
    //print("end");  
    end();
  }
  else if (state == "more_than_2") {
    more_than_2();
  }
  else if (state == "disconnected") {
    disconnected();
  }
  else if (state == 'intermediate') {
    intermediate_screen();
  }


}//end of draw function

function mouseClicked() {
  if (restart_btn.InRange() && (state == 'disconnected' || state == 'more_than_2')) {
    location.reload();
  }
  if (start_btn.InRange() && state == "start") {
    state = "waiting";
    room = window.prompt('Enter the room name: ')
    console.log(room);
    socket = io();
    socket.room = room;
    socket.emit('room', room);

    socket.on('set_role', (data) => {
      socket.role = data;
    })
    socket.on('disconnected', (data) => {
      state = 'disconnected';
    })
    socket.on('connect', () => {
      console.log("connection established to server");
    })

    socket.on('more_than_2', (data) => {
      console.log('hi');
      state = "more_than_2";
    })

    socket.on('start', (data) => {
      player_num = 2;
      // console.log(data);
      // role = data;
      role = socket.role;
      // if (role == 'hider') {
      //   socket.on('move_seeker', (data) => {
      //     console.log('hi');
      //     spectator_left = data.left;
      //     spectator_right = data.right;
      //     spectator_up = data.up;
      //     spectator_down = data.down;
      //   })
      // }
    })

    socket.on('move_seeker', (data) => {
      spectator_left = data.left;
      spectator_right = data.right;
      spectator_up = data.up;
      spectator_down = data.down;
    })

    socket.on('set_hiding_place', (data) => {
      hiding_place = data.place;
      hiding_place_X = data.X_pos;
      hiding_place_Y = data.Y_pos;
      hid = true;
    })

    socket.on('end_screen', (data) => {
      if (data == 'didnt_hide') {
        didnt_hide = true;
        state = 'end';
      }

      if (data == role) {
        console.log('win!!!')
        won = true;
        winSound.play();
        state = 'end';
      }
      else {
        console.log('lost!!')
        won = false;
        lossSound.play();
        state = 'end';
      }
    })

  }

  if (instructions_btn.InRange() && state == "instructions") {
    state = "display role";
  }

  if (refresh_btn.InRange() && state == "end") {
    window.location.reload();
    socket.disconnect();
    noLoop();
  }

}

function keyPressed() {
  if (state == "start_game") {
    if (key == ' ') {
      if (role == "hider" && P_1.check_in_Bound()) {
        // state = "hidden";
        //some hint system code
        // state = "hidden";
        state = 'intermediate';
        time_at_hide = frameCount;
        let hiding_place_OBJ = {
          place: hiding_place,
          X_pos: hiding_place_X,
          Y_pos: hiding_place_Y
        }
        socket.emit('hide', hiding_place_OBJ);
        //some hint system code
      }

      else if (role == "seeker" && P_2.check_in_Bound()) {
        num_searched_places += 1;
        //fix a small bug
        if (found) {//search_place == hiding_place){
          socket.emit('end', role);
        }
        if (num_searched_places >= max_num_searches) {
          socket.emit('end', "hider");
        }
        // print("num: ", num_searched_places);


        // pop_up_start = frameCount;
        if (search_place == hiding_place) {
          found = true;
          //state = "end";
          socket.emit('end', role);
        }
        else {
          center_pg_popup("no one is hiding here");
          missHitSound.play();
        }
      }
    }
  }
}
