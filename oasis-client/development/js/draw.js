function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if(world) {
    player_char = find_player_char();
    var fx = parseInt(player_char['x'] - (2*range_x));
    var tx = parseInt(player_char['x'] + (2*range_x));
    var fy = parseInt(player_char['y'] - (2*range_y));
    var ty = parseInt(player_char['y'] + (2*range_y));

    draw_world(fx, tx, fy, ty);
    draw_characters(fx, tx, fy, ty);
    draw_world_front(fx, tx, fy, ty);
    draw_characters_nicknames(fx, tx, fy, ty);
  }
}

function draw_world_front(fx, tx, fy, ty) {
  for(var x = fx; x < tx; x++) {
    for(var y = fy; y < ty; y++) {
      cell = find_cell(x, y);
      if(cell) {
        var pos_x = parseInt(cell['x'] * cell_size + scroll_x);
        var pos_y = parseInt(cell['y'] * cell_size + scroll_y);
      
        draw_unit('sprite_front', UNITS[cell['u']], cell, pos_x, pos_y);
      }
    }
  }
}

function draw_world(fx, tx, fy, ty) {
  for(var x = fx; x < tx; x++) {
    for(var y = fy; y < ty; y++) {
      cell = find_cell(x, y);
      if(cell) {
        var pos_x = parseInt(cell['x'] * cell_size + scroll_x);
        var pos_y = parseInt(cell['y'] * cell_size + scroll_y);
        var terrain = TERRAINS[cell['t']]
        ctx.drawImage(terrain['sprite'], cell['pos_x_t'], cell['pos_y_t'], cell_size, cell_size, pos_x, pos_y, cell_size, cell_size);
      
        draw_unit('sprite', UNITS[cell['u']], cell, pos_x, pos_y);

        // DROPS
        for(var i = 0; i <  cell['drops'].length; i++) {
            var drop = cell['drops'][i];
            ctx.drawImage(sprite("sprites/item/"+drop['item']['public']['id']+".png"), pos_x + drop['x'], pos_y + drop['y'], cell_size/2, cell_size/2);
        }
      }
    }
  }
}

function draw_characters() {
  for (var i = 0; i < characters.length; i++) {
    var pos_x = characters[i]['pos_x'];
    var pos_y = characters[i]['pos_y'];
    
    // draw char sprite
    function draw_char_sprite(img) {
      ctx.drawImage(img, pos_x, pos_y, cell_size, cell_size);
    }
    var char_image = new Image();
    char_image.src = "sprites/character/body_style/body_style_" + characters[i]['body_style'] + ".png";
    draw_char_sprite(char_image);
    if(characters[i]['face']) { draw_char_sprite(sprite_faces[characters[i]['face']['sprite']]); }
    if(characters[i]['head']) { draw_char_sprite(sprite_heads[characters[i]['head']['sprite']]); }
    if(characters[i]['body']) { draw_char_sprite(sprite_bodies[characters[i]['body']['sprite']]); }
    // draw right hand
    if(characters[i]['right_hand']) {
      char_image.src = "sprites/character/right_hand/"+characters[i]['right_hand']['sprite']+".png";
      ctx.drawImage(char_image, pos_x, pos_y, cell_size, cell_size);
    }
  }
}

function draw_characters_nicknames() {
  for (var i = 0; i < characters.length; i++) {
    var pos_x = characters[i]['pos_x'];
    var pos_y = characters[i]['pos_y'];
   
    ctx.font = "10px Arial";
    ctx.fillStyle = "red";
    ctx.fillText(characters[i]['nickname'], pos_x, pos_y + 10);
  }
}

function draw_unit(layer, unit, cell, pos_x, pos_y) {
  if(unit && unit[layer]) {
    var height = cell_size;
    var width = cell_size;
    if(unit['custom_height']) {
      height = unit['custom_height'];
    }
    if(unit['custom_width']) {
      width = unit['custom_width'];
    }

    // LOOP ANIMATION
    var frame = {x: 0, y: 0};
    if(unit['loop_animation']) {
      if(world[cell['x']][cell['y']]['next_frame'] == null) {
        world[cell['x']][cell['y']]['next_frame'] = now() + unit['loop_animation']['speed'];
      }
      if(world[cell['x']][cell['y']]['frame_index'] == null) {
        world[cell['x']][cell['y']]['frame_index'] = 0;
      }

      if(now() > world[cell['x']][cell['y']]['next_frame']) {
        world[cell['x']][cell['y']]['next_frame'] = now() + unit['loop_animation']['speed'];
        if(world[cell['x']][cell['y']]['frame_index'] < unit['loop_animation']['frames'].length-1) {
          world[cell['x']][cell['y']]['frame_index'] += 1;
        } else {
          world[cell['x']][cell['y']]['frame_index'] = 0;
        }
      }
      
      frame = unit['loop_animation']['frames'][world[cell['x']][cell['y']]['frame_index']];
    }

    ctx.drawImage(unit[layer], cell['pos_x_u']+frame['x'], cell['pos_y_u']+frame['y'], width, height, pos_x-width+cell_size, pos_y-height+cell_size, width, height);
  }
}