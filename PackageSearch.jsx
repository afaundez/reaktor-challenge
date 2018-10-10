class PackageSearch extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = { query: '', packages: [] };
  }

  searchPackages = () => {
    let results = [];
    if (this.state.query && this.state.query.length > 2) {
      results = this.state.packages.filter(value =>
        value && value.match(this.state.query)
      );
    }
    this.props.onResultsChange(results);
  };

  handleChange = (event) => this.setState(
    { query: event.target.value },
    () => this.searchPackages()
  );

  componentWillReceiveProps(nextProps) {
    this.setState({
      packages: nextProps.packagesNames
    });
  }

  render() {
    return (
      <fieldset className='package-search'>
        <legend>Search for packages</legend>
        <input onChange={this.handleChange} />
      </fieldset>
    );
  }
}
