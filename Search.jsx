const Suggestions = props => {
  const options = props.results.map(result => (
    <a key={'suggestion-' + result} href={ `#${result}`}>{result}</a>
  ));
  return <p>{options}</p>;
}

class ParagraphSearch extends React.Component {
  state = {
    values: [],
    query: '',
    results: []
  }

  getInfo = () => {
    this.setState({
      results: this.state.values.filter(value => value && value.match(this.state.query))
    });
  }

  handleInputChange = () => {
    this.setState({
      query: this.search.value
    }, () => {
      if (this.state.query && this.state.query.length > 2) {
        this.getInfo();
      } else if (!this.state.query) {
      }
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      values: nextProps.packagesNames
    });
  }

  render() {
    return (
      <form>
        <input
          placeholder='Search for packages...'
          ref={input => this.search = input}
          onChange={this.handleInputChange} />
        <Suggestions results={this.state.results} />
      </form>
    );
  }
}
