/**
 * Demo Amiga Guru Meditation
 *
 */

var Demo = React.createClass( {

  handleClick : function()
  {
    this.forceUpdate();
  },

  render : function()
  {

    var p_styles = {
      textAlign : 'center',
      fontSize  : 18
    };

    return (
      <div>
        <AmigaGuruMeditation />

        <p style={p_styles}>
          <button style={p_styles} onClick={this.handleClick}>Re open</button>
        </p>
      </div>
    );
  }


} );

React.render(
  <Demo />,
  document.getElementById( 'content' )
);