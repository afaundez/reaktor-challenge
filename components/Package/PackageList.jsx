class PackageList extends React.Component {
  render () {
    const { packageIds, onPackageLinkClick, direction } = this.props;
    const uniquePackagesIds = [...new Set(packageIds)];
    const packageListElements = uniquePackagesIds.map(packageId => {
      const key = 'PackageListElement' + packageId;
      return (
        <PackageListElement
          key={key}
          packageId={packageId}
          direction={direction}
          onPackageLinkClick={onPackageLinkClick}
        />
      );
    });
    return <ul>{packageListElements}</ul>;
  }
}
