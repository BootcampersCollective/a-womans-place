var lame = require('./lame');
var butter = require('buttercms')(lame.APIkey);


var contentFields = ['image_carousel','home_page_banner','home_sections',
'about_page_banner', 'about_page_sections', 'board_of_directors', 'executive_director',
'services','creating_a_safety_plan','preparing_to_leave', 'protecting_online_privacy',
'community_resources', 'what_is_dv', 'warning_signs', 'obstacles',
'get_involved', 'get_involved_image', 'events_banner_image', 'events', 'wishlist',
'vol_positions', 'affects_children', 'learn_more_image', 'learn_more_page_banner', 'learn_more_box_message', 'get_help_page_image', 'get_help_page_banner', 'get_help_page_box', 'resources'];


module.exports = {

  getContent: (req, res) => {
    butter.content.retrieve(contentFields)
      .then(function(resp) {
        // console.log(resp.data)
        res.send(resp.data);
      }).catch(function(resp) {
        console.log(resp)
      });
    }
}
