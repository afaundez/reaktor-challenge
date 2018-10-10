class Packages extends React.Component {
  state = {
    packages: {}
  }

  componentWillReceiveProps(newProps) {
    this.setState({ packages: newProps.packages });
  }

  render() {
    return(
      <section className='packages'>
        {Object.entries(this.state.packages).map(([packageId, pkg]) => {
          return (<Package
            key={`Package ${packageId}`}
            package={pkg}
            packagesAvailable={this.props.packagesAvailable}
            history={this.props.history}
            packages={this.state.packages}
            onPackageLink={this.props.onPackageLink}
          />);
        })}
      </section>
    );
  }
}
