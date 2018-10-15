class PackageLink extends React.Component {
  render () {
    let { packageId, href, value, onPackageLinkClick, direction } = this.props;
    if(!href) href = '#' + packageId;
    if(!value) value = packageId;
    if(!direction) direction = 'forward';
    let onClick = () => true;
    if(onPackageLinkClick) onClick = (event) => {
      event.preventDefault();
      onPackageLinkClick(packageId, direction);
    };
    return <a href={href} onClick={onClick}>{value}</a>;
  }
}
