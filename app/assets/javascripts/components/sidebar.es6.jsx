// import M from "materialize-css";

class Sidebar extends React.Component {
  componentWillMount () {
      $(document).ready(function(){
        $('.tooltipped').tooltip();
      });
  }
  componentDidMount() {
    $(document).ready(function(){
      $('.tooltipped').tooltip();
    });
  }

  render () {
        return (

            <div id="sidebar">
              <div id="backbar">
                      <ul>
                          <li className={this.isActive('picks') && "active"}>
                              <a  className="tooltipped" href="/picks" data-html="true" data-position="right" data-tooltip="Active Picks">
                                  <i id="icons" className="material-icons">touch_app</i>
                                  <span id="sidebarNames">Active Picks</span>
                              </a>
                          </li>
                          <li className={this.isActive('previous') && "active"}>
                                <a className="tooltipped" data-position="right" data-tooltip="Past Weeks" href="/previous">
                                  <i  id="icons" className="material-icons">skip_previous</i>
                                  <span id="sidebarNames" className="tooltipped" data-position="right" data-delay="50" data-tooltip="History">History</span>
                              </a>
                          </li>
                          <li className={this.isActive('standings') && "active"}>
                              <a className="tooltipped" href="/standings" data-html="true" data-position="right" data-tooltip="Standings" >
                                  <i id="icons" className="material-icons">star</i>
                                  <span id="sidebarNames">Standings</span>
                              </a>
                          </li>
                          <li className={this.isActive('distribution') && "active"}>
                              <a  className="tooltipped" href="/distribution" data-html="true" data-position="right" data-tooltip="Distributions" >
                                  <i  id="icons" className="material-icons">equalizer</i>
                                  <span id="sidebarNames">Distributions</span>
                              </a>
                          </li>
                          {this.checkToShowLeagues()}
                      </ul>
                  </div>
            </div>

        );
    }

    checkToShowLeagues () {
        let leagues = this.props.current_user.leagues
        if (leagues.length > 1) {
            return (
                <li className={this.isActive('leagues') && "active"}>
                    <a href="/leagues">
                        <i  id="icons" className="material-icons">group</i>
                        <span id="sidebarNames">Leagues</span>
                    </a>
                </li>
            )
        }
    }

    isActive (route) {
        if (window.location.pathname.indexOf(route) > -1) {
            return true;
        }

        return false;
    }
}

//$('#sidebar').draggable()
