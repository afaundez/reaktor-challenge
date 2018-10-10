const splitDependencies = (fieldName, fieldValue, keyPrefix, props) => {
  let value;
  switch (fieldName) {
    case 'Needed By':
    case 'Depends':
    value = fieldValue.map(([dependency, version]) => {
      if (props.packagesAvailable.includes(dependency)){
        return (
        <li key={keyPrefix + fieldName + dependency + version}>
          <a href={ '#' + dependency} data-next={dependency} data-direction='forward' onClick={props.onPackageLink} data-available={Object.keys(props.packages).includes(dependency)}>{dependency}</a>
        </li>
        );
      } else {
        return (
          <li key={keyPrefix + fieldName + dependency + version}>
            {dependency}
          </li>
        );
      }
    });
    value = (<nav className='dependencies'><ul>{value}</ul></nav>);
    break;
    case 'Description':
      value = (
        <p>
          {fieldValue.split("\n").map((paragraph, keyPrefix) => (
            <React.Fragment key={keyPrefix}>
              {paragraph}
              <br/>
            </React.Fragment>)
          )}
        </p>);
    break
    default:
      value = (<span>{fieldValue}</span>);
  };
  return value;
};

const dependency = (fieldName, fieldValue, key, props) => (
  <React.Fragment key={key + fieldName}>
    <dt>{fieldName}</dt>
    <dd>{splitDependencies(fieldName, fieldValue, key, props)}</dd>
  </React.Fragment>
);

const dependencies = (pkg, prefixKey, props) => {
  const selectedFields = ['Section', 'Depends', 'Needed By', 'Description'];
  return selectedFields.filter(fieldName => fieldName in pkg
      && pkg[fieldName].length > 0).map(fieldName =>
    dependency(fieldName, pkg[fieldName], prefixKey, props)
  );
};

class Package extends React.Component {
  render() {
    const pkg = this.props.package;
    const history = this.props.history;
    let backButton;
    if(history.includes(pkg.id)){
      const pos = history.lastIndexOf(pkg.id);
      if(pos != 0) {
        const packageId = history[pos - 1];
        const isAvailable = Object.keys(this.props.packages)
          .includes(packageId);
        backButton = (
          <a
            href={ '#' + packageId}
            data-direction='back'
            data-back={packageId}
            onClick={this.props.onPackageLink} data-available={isAvailable}>
            {'< ' + packageId}
          </a>
        );
      }
    }
    return (
      <article key={pkg.id} id={pkg.id}>
        <nav>{backButton}</nav>
        <h3>{pkg.id}</h3>
        <dl>{dependencies(pkg, pkg.id, this.props)}</dl>
      </article>
    );
  }
}
