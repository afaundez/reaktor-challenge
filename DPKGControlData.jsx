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

class DPKGControlData extends React.Component {
  constructor(props) {
    super(props);
    this.onSearchResultsChange = this.onSearchResultsChange.bind(this);
    this.state = {
      packages: [],
      selected: []
    };
  }

  componentDidMount() {
    fetch(this.props.controlFile)
      .then(response => response.text())
      .then(data => this.setState({ packages: DPKG.parse(data) }));
  }

  onSearchResultsChange(results) {
    this.setState({selected: results});
  }

  render() {
    return (
      <section key='sections'>
        <h1>DPKG Status</h1>
        <PackageSearch
          packagesNames={DPKG.names(this.state.packages)}
          onResultsChange={this.onSearchResultsChange}
        />
        <PackagesSuggestions suggested={this.state.selected} />
        <Packages
          packages={this.state.packages.filter(pkg => this.state.selected.includes(pkg.Package))}
        />
      </section>
    );
  }
}
