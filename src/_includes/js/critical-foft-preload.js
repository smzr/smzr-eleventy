(function() {
  if( "fonts" in document ) {
    // Optimization for Repeat Views
    if( sessionStorage.fontsLoadedCriticalFoftPreload ) {
      document.documentElement.className += " fonts-loaded-2";
      return;
    }

    document.fonts.load("1em RubikSubset").then(function () {
      document.documentElement.className += " fonts-loaded-1";

      Promise.all([
        document.fonts.load("400 1em Rubik"),
        document.fonts.load("700 1em Rubik"),
        document.fonts.load("italic 1em Rubik"),
        document.fonts.load("italic 700 1em Rubik")
      ]).then(function () {
        document.documentElement.className += " fonts-loaded-2";

        // Optimization for Repeat Views
        sessionStorage.fontsLoadedCriticalFoftPreload = true;
      });
    });
  }
})();