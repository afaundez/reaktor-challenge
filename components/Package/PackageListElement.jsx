class PackageListElement extends React.Component {
  render () {
    const { packageId, onPackageLinkClick, direction } = this.props;
    const dpkg = controlData.find(packageId);
    if (!dpkg)
      return <li>{packageId}</li>;
    else
      return (
        <li>
          <PackageLink
            packageId={dpkg.id}
            onPackageLinkClick={onPackageLinkClick}
            direction={direction}
            />
        </li>
      );
  }
}
