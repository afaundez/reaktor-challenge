class DPKGControlData extends React.Component {
  constructor(props) {
    super(props);
    this.onSearchResultsChange = this.onSearchResultsChange.bind(this);
    this.state = {
      packages: {},
      suggestions: [],
      history: [],
      available: []
    };
  }

  componentDidMount() {
    fetch(this.props.controlFile)
      .then(response => response.text())
      .then(data => this.setState({ packages: DPKG.parse(data) }));
  }

  onSearchResultsChange(suggestions) {
    this.setState({history: []});
    this.setState({suggestions: suggestions});
    this.setState({available: suggestions});
  }

  onPackageLink(event) {
    let newHistory = this.state.history;
    const target = event.target;
    const origin = target.closest('article').id;
    switch (target.dataset.direction) {
      case 'forward':
        if (newHistory.length == 0) {
          newHistory.push(origin);
        }
        newHistory.push(target.dataset.next);
        break
      case 'back':
        newHistory.splice(newHistory.lastIndexOf(origin), 1);
        if (newHistory.length == 1 && newHistory[0] == target.dataset.back){
          newHistory = [];
        }
        break;
    }
    this.setState(prevState => ({
      history: newHistory,
      available: [...prevState.suggestions, ...newHistory]
    }));
    return true;
  }

  render() {
    return (
      <section key='sections'>
        <h1>DPKG Status</h1>
        <PackageSearch
          packagesNames={DPKG.names(this.state.packages)}
          onResultsChange={this.onSearchResultsChange}
        />
      <PackagesSuggestions suggested={this.state.suggestions} />
        <Packages
          packages={DPKG.filter(this.state.packages, this.state.available)}
          packagesAvailable={DPKG.names(this.state.packages)}
          history={this.state.history}
          onPackageLink={this.onPackageLink.bind(this)}
        />
      </section>
    );
  }
}

const PackagesSuggestions = props => {
  if (props.suggested.length == 0) return [];
  const suggested = props.suggested.map(suggestion => (
    <li key={'suggestion-' + suggestion}>
      <a href={ `#${suggestion}`}>{suggestion}</a>
    </li>
  ));
  return (
    <nav className='suggestions'>
      <ul>
        <li>Suggestions: </li>
        {suggested}
      </ul>
    </nav>
  );
}
