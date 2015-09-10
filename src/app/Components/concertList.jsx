var React = require('react');
var Thumbnail = require('./thumbnail');
var Book = require('./book');
var Navigation = require('react-router').Navigation;
var Link = require('react-router').Link;
var sliderSettings = require('../../util/sliderSettings');

var Slider = require('react-slick');

var ConcertList = React.createClass({

  mixins: [ Navigation ],

  navToGiftDetail: function(id) {
    this.transitionTo(`/gifts/${id}`);
  },

  render: function() {
    var concerts = [];

    return (
      <div className="books-list">
        <div className="row light-teal category">
          <div className="category-header">Concerts</div>
        </div>
          <div className="slider-container">
            <Slider {...sliderSettings} className="books-list">
              {concerts}
            </Slider>
          </div>
      </div>

      );
  }
});

module.exports = ConcertList;
