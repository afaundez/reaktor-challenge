class Search extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = { query: '', results: []};
  }

  searchPackages = () => {
    const { query } = this.state;
    let results = [];
    if (query && query.length > 2) {
      const escapedQuery = query.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
      const packageIds = controlData.packageIds();
      results = packageIds.filter(packageId => packageId.match(escapedQuery));
      this.setState(
        { results: results },
        () => this.props.onSearchResultsChange(this.state.results)
      );
    }
  };

  handleChange = (event) => this.setState(
    { query: event.target.value },
    () => this.searchPackages()
  );

  render() {
    const { results } = this.state;
    return (
      <React.Fragment>
        <fieldset className='search'>
          <legend>Search for packages</legend>
          <input onChange={this.handleChange} autoFocus />
        </fieldset>
        <SearchSuggestions packageIds={results} />
      </React.Fragment>
    );
  }
}
