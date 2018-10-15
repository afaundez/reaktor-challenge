class PackageStack extends React.Component {
  constructor(props) {
    super(props);
    this.onPackageLinkClick = this.onPackageLinkClick.bind(this);
    this.state = {
      packageIds: [props.packageId]
    };
  }

  onPackageLinkClick(packageId, direction='forward') {
    this.setState(state => {
      const packageIds = state.packageIds;
      switch (direction) {
        case 'forward':
          packageIds.push(packageId);
          break;
        case 'backwards':
          packageIds.pop();
          break;
      }
      return { packageIds: packageIds };
    });
  }

  render() {
    const { packageIds } = this.state;
    const currentPackageId = packageIds[packageIds.length - 1],
          previousPackageId = packageIds[packageIds.length - 2];
    return (
      <div className='package-stack' id={packageIds[0]}>
        <Package
          packageId={currentPackageId}
          refererId={previousPackageId}
          onPackageLinkClick={this.onPackageLinkClick}
        />
      </div>
    );
  }
}
