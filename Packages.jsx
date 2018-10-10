const splitDependencies = (fieldName, fieldValue) => {
  let value = fieldValue;
  switch (fieldName) {
    case 'Depends':
    value = fieldValue.map(([dependency, version]) => {
      return (
        <li key={dependency + version}>
          <a href={ '#' + dependency}>{dependency}</a>
          { ' ' + version}
        </li>
      );
    });
    value = (<nav className='dependencies'><ul>{value}</ul></nav>);
    break;
  };
  return value;
};

const dependency = (fieldName, fieldValue, keyPrefix) => (
  <React.Fragment key={`${keyPrefix}-${fieldName}`}>
    <dt>{fieldName}</dt>
    <dd>{splitDependencies(fieldName, fieldValue)}</dd>
  </React.Fragment>
);

const dependencies = (pkg, prefixKey) =>
  Object.entries(pkg).map(([fieldName, fieldValue]) => {
    if (['Status', 'Section', 'Depends'].includes(fieldName)){
      return dependency(fieldName, fieldValue, prefixKey);
    }
  });

class Package extends React.Component {
  render() {
    const pkg = this.props.package;
    return (
      <article key={pkg.Package} id={pkg.Package}>
        <h3>{pkg.Package}</h3>
        <dl>{dependencies(pkg, pkg.Package)}</dl>
      </article>
    );
  }
}

class Packages extends React.Component {
  state = {
    packages: []
  }

  componentWillReceiveProps(newProps) {
    this.setState({ packages: newProps.packages });
  }

  render() {
    return(
      <section className='packages'>
        {this.state.packages.map(pkg => (
          <Package
            key={`Package ${pkg.Package}`}
            package={pkg}
          />
        ))}
      </section>
    );
  }
}
