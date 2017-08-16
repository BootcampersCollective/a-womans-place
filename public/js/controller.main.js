angular.module('awp')
    .controller('mainController', mainController);


mainController.$inject = ['$http', '$location', '$sce'];

function mainController($http, $location, $sce) {
    let main = this;
    main.$sce = $sce;

    // Grabs the route. See examples:
    //      localhost:8080/#/ : the url is /
    //      localhost: 8080/#/about: the url is /about
    // Splits on the octothorpe for urls that have sub-sections and grabs
    // the first element in the resulting array. For example:
    //      localhost:8080/#/getHelp#cyberstalking
    // Splitting the url results in ['\getHelp', 'cyberstalking'].
    // The first element of the array '/getHelp' can now be matched
    // on so the correct tab stays highlighted. For urls that do not have
    // a sub-section, see the first example for how this is matched.
    let pageUrl = ($location.$$url).split('#')[0];
    switch (pageUrl){
        case '/':
            main.activeNav = 1;
            break;
        case '/about':
            main.activeNav = 2;
            break;
        case '/getHelp':
            main.activeNav = 3;
            break;
        case '/dv':
            main.activeNav = 4;
            break;
        case '/giveHelp':
            main.activeNav = 5;
            break;
        case '/resources':
            main.activeNav = 6;
            break;
        case '/volunteer':
        case '/volunteerApp':
        case '/wishlist':
        default:
            main.activeNav = 1;
    }

    // Value used to dynamically set height of YouTube video and adjacent divs on home page
    main.ytHeight = $(window).height() / 3;

    // Request to back-end that makes call to CMS
    $http.get('/cmsdata')
        .then(function(res) {
            // Main object of CMS response
            main.awp = res.data.data;

            // the butter-cms response sends sends many description values as
            // HTML text. the butter-cms gives the option of having a text area
            // set as a WYSIWYG editor, which formats all in it as HTML. This is
            // how (one way?) to make the HTML in those descriptions acceptable
            // to display correctly in angularJS. They have to be set as safe...
            main.communityResources = $sce.trustAsHtml(main.awp.community_resources[0].description);
            main.prepToLeave        = $sce.trustAsHtml(main.awp.preparing_to_leave[0].description);
            main.safetyPlan         = $sce.trustAsHtml(main.awp.creating_a_safety_plan[0].description);
            main.onlinePrivacy      = $sce.trustAsHtml(main.awp.protecting_online_privacy[0].description);

            /////////////////////// HOME PAGE DATA //////////////////////////////////
            // Data used in bootstrap carousel
            main.image_carousel = main.awp.image_carousel;
            main.homeSections = main.awp.home_sections;

            ////////////////////// ABOUT PAGE DATA //////////////////////////////////
            main.aboutSections = main.awp.about_page_sections;
            main.aboutImages = main.awp.about_page_images;

            /////////////////////// GET HELP PAGE DATA //////////////////////////////
            // In order to split the 'services section' into two columns on the page
            // we need to split it evenly into two different arrays
            main.rightServices = main.awp.services.slice(Math.ceil(main.awp.services.length/2));
            main.leftServices = main.awp.services.splice(0, Math.ceil(main.awp.services.length/2));


            ///////////////////////  LEARN MORE PAGE DATA //////////////////////////////
            main.whatIsDvHeading = main.awp.what_is_dv[0].heading;
            main.whatIsDv = $sce.trustAsHtml(main.awp.what_is_dv[0].description);

            main.warningSignsHeading = main.awp.warning_signs[0].heading;
            main.warningSigns = $sce.trustAsHtml(main.awp.warning_signs[0].description);

            main.affectsChildren = [];
            for(let i = 0; i < main.awp.affects_children.length; ++i) {
                let affChildObj = {};
                affChildObj['heading'] = main.awp.affects_children[i].heading;
                affChildObj['description'] = $sce.trustAsHtml(main.awp.affects_children[0].description);
                main.affectsChildren.push(affChildObj);
            }

            /////////////////////// RESOURCES PAGE DATA //////////////////////////////

            main.resources = main.awp.resources;

            // Save events info into array
            main.events = main.awp.events;

            main.boardStaff = [];
            main.board = [];

            for (let i = 0; i < main.awp.board_of_directors.length; i++) {
                if (main.awp.board_of_directors[i].board_position) {
                    main.boardStaff.push(main.awp.board_of_directors[i])
                }
                main.board.push(main.awp.board_of_directors[i]);

            }


            main.rightDirectors = main.board.slice(Math.ceil(main.board.length/2));
            main.leftDirectors = main.board.splice(0, Math.ceil(main.board.length/2));


            // Images on the about page

            // Split wishlist into two columns
            main.rightWishlist = main.awp.wishlist.slice(Math.ceil(main.awp.wishlist.length/2));
            main.leftWishlist = main.awp.wishlist.splice(0, Math.ceil(main.awp.wishlist.length/2));
            // Split positions into two columns
            main.rightPositions = main.awp.vol_positions.slice(Math.ceil(main.awp.vol_positions.length/2));
            main.leftPositions = main.awp.vol_positions.splice(0, Math.ceil(main.awp.vol_positions.length/2));


        }, function(err){
            if (err){
                console.error(err);
            }
        });




//////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////  VOLUNTEER APPLICATION  ////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////

    // Blank object to store volunteer information for application
    main.volData = {};

    main.formPage = 1;

    main.days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    main.times = ['Mornings', 'Afternoons', 'Evenings'];

    main.contactMethods = ['Phone', 'Email'];

    main.languages = ['English', 'Spanish', 'Other...'];

    main.formStates = [
        "CO","AL","AK","AZ","AR","CA","CT","DE","DC","FL","GA","HI","ID","IL","IN","IA",
        "KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM",
        "NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA",
        "WV","WI","WY"
    ];

    main.nextBtn = function(){
        main.formPage++;
    };

    main.prevBtn = function(){
        main.formPage--;
    };

    main.submitVolApp = function () {
        let volunteerData = main.volData;
        $http.post('/volunteerSubmit', volunteerData)
            .then (function success(response) {
                console.log("successful post")
            })
            .catch(function(err){console.log("Update via put failed, caught error: ",err)})
    }
}
