function exist_character_on(x, y) {
  for(var i = 0; i < characters.length; i++) {
    if(characters[i]['x'] == x && characters[i]['y'] == y && !characters[i]['is_moving']) {
      return true;
    }
  }
  return false;
}

function find_player_char() {
  return characters[find_character_index(nickname)];
}

function character_is_moving(nickname) {
  var char_i = find_character_index(nickname);
  if(characters[char_i]['is_moving']) {
    return true;
  } else {
    return false;
  }
}

function find_char(x, y) {
  for(var i = 0; i < characters.length; i++) {
        if(characters[i]['x'] == x && characters[i]['y'] == y) {
            return characters[i];
        }
    }
}

function find_character_index(nickname) {
    for(var i = 0; i < characters.length; i++) {
        if(characters[i]['nickname'] === nickname) {
            return i;
        }
    }
}