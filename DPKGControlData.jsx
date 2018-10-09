const packages = packages => packages.map(pkg => (
  <Package key={`section-paragraph-${pkg.Package}`}
                    package={pkg}
  />
));

const sections = groupedPackages => Object.entries(groupedPackages)
  .map(([section, sectionPackages]) => (
    <section key={`section-${section}`}>
      <h2>{`Section: ${section}`}</h2>
      {packages(sectionPackages)}
    </section>
  ));

class DPKGControlData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      packagesBySection: {},
      query: ''
    };
  }

  handleInputChange = () => {
     this.setState({
       query: this.search.value
     })
   }

  componentDidMount() {
    fetch(this.props.controlFile)
      .then(response => response.text())
      .then(data => this.setState({packagesBySection: DPKG.parse(data) }));
  }

  render() {
    const { packagesBySection } = this.state;
    const packagesNames = Object.entries(packagesBySection).map(([k, v]) => v.map(p => p.Package)).flat();
    return (
      <section key='sections'>
        <h1>DPKG Status</h1>
        <PackageSearch packagesNames={packagesNames} />
        {sections(packagesBySection)}
      </section>
    );
  }
}
