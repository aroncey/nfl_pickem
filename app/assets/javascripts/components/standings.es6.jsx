class Standings extends React.Component {
    componentWillMount () {
        this.setState({week: 'all'})
    }
    componentDidMount() {
      $('#dropdownWeeks').dropdown({
          hover: true
        })
    }
    changeWeek(e) {
        var instance = M.Dropdown.getInstance($('#dropdownWeeks'));
        var text = e.target.text
        var week = (text === 'all') ? text : parseInt(text)
        this.setState({week: week})
        instance.close();
    }

    currentWeek() {
      this.setState({week: this.props.current_week})
    }
    openDropdown(){
      var instance = M.Dropdown.getInstance($('#dropdownWeeks'));
      instance.open();

    }
    getWeekOptions() {
        var weekOptions = [<li key='all'><a>all</a></li>]
        for (var i = 1; i <= this.props.current_week; i++) {
            weekOptions.push(<li key={i}><a>{i}</a></li>)
        }
        return weekOptions
    }

    render () {
        var _this = this;
        var userRecordNodes = this.getUserRecordNodes(JSON.parse(this.props.users));

        return (
            <div id="standings" className="card weekly-picks-card">
                <div className="card-content">
                  <div className="TopRow">
                  </div>
                  <div className="row title-row">
                      <span className="card-title">Standings</span>
                      <span className="curweek">
                          <button className="waves-effect blue waves-light white-text darken-4 btn-flat" onClick={this.currentWeek.bind(this)}>
                                <p>Current Week</p>
                          </button>
                      </span>
                      <span className="dd">
                          <a id="dropdownWeeks" className='dropdown-trigger btn blue white-text darken-4' data-target='dropdowner' onClick={this.openDropdown.bind(this)}>
                            <p >Week: {this.state.week}</p>
                          </a>
                          <ul id='dropdowner' className='card-panel dropdown-content black-text text-darken-4' onClick={this.changeWeek.bind(this)}>
                              {this.getWeekOptions()}
                          </ul>
                      </span>
                    </div>
                    <table id="standingContent" className="bordered">
                        <tbody>
                            <tr>
                                <th data-id="rank"></th>
                                <th>Name</th>
                                <th>Wins</th>
                                <th>Losses</th>
                                <th>Pushes</th>
                                <th>Win Rate (%)</th>
                                <th>Points</th>
                            </tr>
                            {userRecordNodes}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    getUserRecordNodes (users) {
        var week = this.state.week

        // sort users
        users.sort((a, b) => {
          var a = a.week_standings[week];
          var b = b.week_standings[week];

          if (b.points === a.points ) {
            rank = b.percent - a.percent;
          } else {
            rank = b.points - a.points
          }
            return rank
        })

        // modify user objects for user record component
        var last_rank_points = users[0].week_standings[week].points;
        var last_rank = 1;

        return users.map(function(user, index) {
            if (week != 'all') {
                user = Object.assign(user, user.week_standings[week])
            }

            if (last_rank_points === user.points ) {
                user.rank = last_rank;
            } else {
                user.rank = index + 1;
                last_rank_points = user.points;
                last_rank = index + 1;
            }

            return (
                <UserRecord key={user.id} user={user}/>
            );
        });
    }
}
