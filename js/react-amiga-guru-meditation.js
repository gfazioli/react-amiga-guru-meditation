/**
 * Tribute to Amiga - Software failure / Guru Meditation
 *
 * Usage: <AmigaGuruMeditation {...props} />
 *
 * @class           GuruMeditation
 * @author          =undo= <g.fazioli@wpxtre.me>
 * @date            2015-02-24
 * @version         1.0.0
 */

var AmigaGuruMeditation = React.createClass( {

  // Display name
  displayName               : 'Amiga Guru Meditation',

  // Version
  version                   : '1.0.0',

  // Interval
  _interval                 : null,

  // Props type
  propTypes                 : {
    title    : React.PropTypes.string,
    subtitle : React.PropTypes.string,
    error    : React.PropTypes.string
  },
  mixins                    : [],

  // Default props
  getDefaultProps           : function()
  {
    return {
      title    : "Software Failure. Press left mouse button to continue.",
      subtitle : "Guru meditation",
      error    : '#00000025.65045330'
    };
  },

  // Initial state
  getInitialState           : function()
  {
    console.log( 'getInitialState' );

    return {
      blink   : true,
      display : true
    };
  },

  // Mount
  componentWillMount        : function()
  {
    clearInterval( this._interval );

    this._interval = setInterval( function()
    {
      this.state.display = true;
      this.state.blink = !this.state.blink;
      this.setState( this.state );

    }.bind( this ), 1000 );
  },

  // Sanitize props
  componentWillReceiveProps : function()
  {
    this.state.display = true;
    this.state.blink = !this.state.blink;
    this.setState( this.state );

    this.componentWillMount();

  },

  // Unmount
  componentWillUnmount      : function()
  {
    clearInterval( this._interval );
  },

  handleClick : function()
  {
    clearInterval( this._interval );
    this.state.display = false;
    this.setState( this.state );
  },

  // Render
  render : function()
  {

    if( !this.state.display ) {
      return null;
    }

    var div_styles = {
      height          : 120,
      backgroundColor : '#111',
      border          : this.state.blink ? '6px solid #111' : '6px solid #b00',
      textAlign       : 'center'
    };

    var p_styles = {
      fontSize   : 18,
      fontFamily : "Times New Roman",
      color      : "#b00",
      margin     : '24px 0'
    };

    return (
      <div onClick={this.handleClick} style={div_styles}>
        <p style={p_styles}>{this.props.title}</p>
        <p style={p_styles}>{this.props.subtitle}
          <span>{this.props.error}</span>
        </p>
      </div>
    );
  }
} );
