class Packages extends React.Component {
  state = {
    packageIds: []
  }

  componentWillReceiveProps(newProps) {
    this.setState({ packageIds: newProps.packageIds });
  }

  render() {
    const { packageIds } = this.state;
    const packagesComponents = packageIds.map(packageId => {
      const key = 'package' + packageId;
      return <PackageStack key={key} packageId={packageId} />;
    });
    return(
      <section className='packages'>
        {packagesComponents}
      </section>
    );
  }
}
