var lame = require('./lame');
var butter = require('buttercms')(lame.APIkey);


var contentFields = ['image_carousel','home_page_banner','home_sections',
'about_page_banner', 'about_page_sections', 'board_of_directors', 'executive_director',
'services','creating_a_safety_plan','preparing_to_leave', 'protecting_online_privacy',
'community_resources', 'what_is_dv', 'warning_signs', 'obstacles',
'get_involved', 'get_involved_image', 'events_banner_image', 'events', 'wishlist',
'vol_positions', 'resources', 'resources_page_image', 'resources_page_banner'];

module.exports = {

  getContent: (req, res) => {
    butter.content.retrieve(contentFields)
      .then(function(resp) {
        //console.log(resp.data)
        res.send(resp.data);
      }).catch(function(resp) {
        console.log(resp)
      });
    }
}
