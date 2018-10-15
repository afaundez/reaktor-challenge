class ControlData extends React.Component {
  constructor(props) {
    super(props);
    this.onSearchResultsChange = this.onSearchResultsChange.bind(this);
    this.state = {
      suggestedPackageIds: []
    };
  }

  onSearchResultsChange(suggestedPackageIds) {
    this.setState({suggestedPackageIds: suggestedPackageIds});
  }

  componentDidMount() {
    fetch(this.props.controlFile)
      .then(response => response.text())
      .then(data => controlData.load(data));
  }

  render() {
    const { suggestedPackageIds } = this.state;
    return (
      <section>
        <h1>DPKG Status</h1>
        <Search onSearchResultsChange={this.onSearchResultsChange} />
        <Packages packageIds={suggestedPackageIds} />
      </section>
    );
  }
}
