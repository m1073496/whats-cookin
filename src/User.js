class User {
  constructor(user) {
    this.userName = user.name;
    this.userId = user.id;
    this.userPantry = user.pantry;
    this.favoriteRecipes = [];
    this.recipesToCook = [];
  }

  updateFavorites = (recipe) => {
    if(this.favoriteRecipes.includes(recipe)) {
      let indexToRemove = this.favoriteRecipes.indexOf(recipe);
      this.favoriteRecipes.splice(indexToRemove, 1);
    } else {
      this.favoriteRecipes.push(recipe);
    }
  };

  updateCookList = (recipe) => {
    if(this.recipesToCook.includes(recipe)) {
      let indexToRemove = this.recipesToCook.indexOf(recipe);
      this.recipesToCook.splice(indexToRemove, 1);
    } else {
      this.recipesToCook.push(recipe);
    }
  };

  filterFavorites = (searchTerm) => {
    
  };

};



if (typeof module !== 'undefined') {
  module.exports = User;
};
