angular.module('awp')
  .controller('mainController', mainController);


mainController.$inject = ['$http', '$location', '$sce'];

function mainController($http, $location, $sce) {
  var main = this;
  main.$sce = $sce;

  // Figures out which page user is on when they enter the site and selects the
  // correct navigation link
  main.activeNav;
  switch ($location.$$absUrl.slice(17)){
    case '#/':
      main.activeNav = 1;
      break;
    case '#/about':
      main.activeNav = 2;
      break;
    case '#/getHelp':
      main.activeNav = 3;
      break;
    case '#/dv':
      main.activeNav = 4;
      break;
    case '#/giveHelp':
      main.activeNav = 5;
      break;
    case '#/resources':
      // main.activeNav = 6;
      // break;
    case '#/volunteer':
    case '#/volunteerApp':
    case '#/wishlist':
    default:
      main.activeNav = 1;
  }

  // Value used to dynamically set height of YouTube video and adjacent divs on home page
  main.ytHeight = $(window).height() / 3;

  // Request to back-end that makes call to CMS
  $http.get('/cmsdata')
    .then(function(res){



      // Main object of CMS response
  main.awp = res.data.data;
    // console.log(main.awp);

    // the butter-cms response sends sends many description values as HTML text.
    // the butter-cms gives the option of having a text area set as a WYSIWYG editor, which formats all in it as HTML.
    // This is how (one way?) to make the HTML in those discriptions acceptable to display correctly in angularJS.
    // They have to be set as safe...
  main.communityResources = $sce.trustAsHtml(main.awp.community_resources[0].description);
  main.prepToLeave        = $sce.trustAsHtml(main.awp.preparing_to_leave[0].description);
  main.safetyPlan         = $sce.trustAsHtml(main.awp.creating_a_safety_plan[0].description);
  main.onlinePrivacy      = $sce.trustAsHtml(main.awp.protecting_online_privacy[0].description);
      // console.log(main.awp.obstacles);

      /////////////////////// HOME PAGE DATA //////////////////////////////////
      // Data used in bootstrap carousel
      main.image_carousel = res.data.data.image_carousel;
      main.homeSections = res.data.data.home_sections;

      ////////////////////// ABOUT PAGE DATA //////////////////////////////////
      main.aboutSections = res.data.data.about_page_sections;
      main.aboutImages = res.data.data.about_page_images;

      /////////////////////// GET HELP PAGE DATA //////////////////////////////
      // In order to split the 'services section' into two columns on the page
      // we need to split it evenly into two different arrays
      main.rightServices = res.data.data.services.slice(Math.ceil(res.data.data.services.length/2));
      main.leftServices = res.data.data.services.splice(0, Math.ceil(res.data.data.services.length/2));


      /////////////////////// RESOURCES PAGE DATA //////////////////////////////


      main.resources = res.data.data.resources;



      if ($location.$$absUrl.slice(17) == '#/getHelp'){
        main.getHelpData();
      }

      /////////////////////// LEARN MORE PAGE DATA /////////////////////////////

      main.dvData = function() {
        setTimeout(function(){
          var whatIsDV = $('#what-is-dv');
          var warningSigns = $('#warning-signs');
          //var obstacles = $('#obstacles');

          //obstacles[0].innerHTML = main.awp.obstacles[0].description;
          warningSigns[0].innerHTML = main.awp.warning_signs[0].description;
          whatIsDV[0].innerHTML = main.awp.what_is_dv[0].description;
        }, 500);
      }
      // Checks to see if this is starting page
      if ($location.$$absUrl.slice(17) == '#/dv'){
        main.dvData();
      }

      // Save events info into array
      main.events = res.data.data.events;

        main.boardStaff = [];
        main.board = [];

      for (var i = 0; i < main.awp.board_of_directors.length; i++) {
        if (res.data.data.board_of_directors[i].board_position) {
          main.boardStaff.push(res.data.data.board_of_directors[i])
        }
          main.board.push(res.data.data.board_of_directors[i]);

      }


      main.rightDirectors = main.board.slice(Math.ceil(main.board.length/2));
      main.leftDirectors = main.board.splice(0, Math.ceil(main.board.length/2));






      // Images on the about page

      // Split wishlist into two columns
      main.rightWishlist = res.data.data.wishlist.slice(Math.ceil(res.data.data.wishlist.length/2));
      main.leftWishlist = res.data.data.wishlist.splice(0, Math.ceil(res.data.data.wishlist.length/2));
      // Split positions into two columns
      main.rightPositions = res.data.data.vol_positions.slice(Math.ceil(res.data.data.vol_positions.length/2));
      main.leftPositions = res.data.data.vol_positions.splice(0, Math.ceil(res.data.data.vol_positions.length/2));


    }, function(err){
      if (err){
        console.error(err);
      }
    })




//////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////  VOLUNTEER APPLICATION  ////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////

  // Blank object to store volunteer information for application
  main.volData = {};

  main.formPage = 1;

  main.days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  main.times = ['Mornings', 'Afternoons', 'Evenings'];

  main.contactMehtods = ['Phone', 'Email'];

  main.languages = ['English', 'Spanish', 'Other...'];

  main.formStates = ["CO","AL","AK","AZ","AR","CA","CT","DE","DC","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"];

  main.nextBtn = function(){
        main.formPage++;
  }

  main.prevBtn = function(){
    main.formPage--;
  }

  main.submitVolApp = function () {
      var volunteerData = main.volData
      console.log(volunteerData)
      $http.post('/volunteerSubmit', volunteerData)
           .then (function success(response) {
           console.log("successful post")
         })
         .catch(function(err){console.log("Update via put failed, caught error: ",err)})
        }
}
