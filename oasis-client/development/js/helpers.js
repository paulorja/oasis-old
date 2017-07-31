function rand(number) {
  return Math.floor(Math.random() * number) + 1  
}

Array.prototype.sample = function() {
  return this[Math.floor((Math.random()*this.length))];
}