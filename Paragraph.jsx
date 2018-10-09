const splitDependencies = (fieldName, fieldValue) => {
  let value = fieldValue;
  switch (fieldName) {
    case 'Depends':
    value = fieldValue.map(([dependency, version]) => {
      return <React.Fragment key={dependency + version}>
      <a href={ '#' + dependency}>{dependency}</a>
      { ' ' + version}
      </React.Fragment>;
    }).reduce((prev, curr) => [prev, ', ', curr]);
    break;
  };
  return value;
};

const dependency = (fieldName, fieldValue, keyPrefix) => {
  return  <React.Fragment key={`${keyPrefix}-${fieldName}`}>
  <dt>{fieldName}</dt>
  <dd>{splitDependencies(fieldName, fieldValue)}</dd>
  </React.Fragment>
};

const dependencies = (paragraph, prefixKey) =>
  Object.entries(paragraph).map( ([fieldName, fieldValue]) =>
    dependency(fieldName, fieldValue, prefixKey)
  );

class ParagraphArticle extends React.Component {
  render() {
    const paragraph = this.props.paragraph;
    const articleKey = `paragraph-${paragraph.Package}`;
    return  <article key={articleKey}>
              <h3 id={paragraph.Package}>{`Package: ${paragraph.Package}`}</h3>
              <dl>{dependencies(paragraph, articleKey)}</dl>
            </article>;
  }
}
