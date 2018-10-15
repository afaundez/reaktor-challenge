class FieldValuePackages extends React.Component {
  render() {
    const { value, onPackageLinkClick } = this.props;
    const packageIds = value.map(([packageId, _]) => packageId);
    return (
      <nav>
        <PackageList
          packageIds={packageIds}
          onPackageLinkClick={onPackageLinkClick}
        />
      </nav>
    );
  }
}
