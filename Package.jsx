const splitDependencies = (fieldName, fieldValue) => {
  let value = fieldValue;
  switch (fieldName) {
    case 'Depends':
    value = fieldValue.map(([dependency, version]) => {
      return (
        <React.Fragment key={dependency + version}>
          <a href={ '#' + dependency}>{dependency}</a>
          { ' ' + version}
        </React.Fragment>
      );
    }).reduce((prev, curr) => [prev, ', ', curr]);
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
  Object.entries(pkg).map(([fieldName, fieldValue]) =>
    dependency(fieldName, fieldValue, prefixKey)
  );

class Package extends React.Component {
  render() {
    const pkg = this.props.package;
    const articleKey = `package-${pkg.Package}`;
    return (
      <article key={articleKey}>
        <h3 id={pkg.Package}>{`Package: ${pkg.Package}`}</h3>
        <dl>{dependencies(pkg, articleKey)}</dl>
      </article>
    );
  }
}
