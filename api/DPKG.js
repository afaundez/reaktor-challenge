function DPKG() {}

DPKG.buildFromParagraph = rawParagraph => {
  const fieldSeparator = /((?:^|\r\n|\r|\n)[\w-]+):\s/;
  const fieldNamesAndValues = rawParagraph.split(fieldSeparator)
    .filter(Boolean);
  return fieldNamesAndValues.reduce(fieldsPairer, new DPKG());
};

const fieldsPairer = (dpkg, rawField, position, fields) => {
  const isFieldName = position % 2 == 0;
  if(isFieldName){
    const fieldName = rawField.trim();
    const rawFieldValue = fields[position + 1].trim();
    let fieldValue;
    switch (fieldName) {
    case 'Needed By':
    case 'Depends':
      fieldValue = splitDependenciesLine(rawFieldValue);
      break;
    case 'Description':
      fieldValue = splitMultiline(rawFieldValue);
      break;
    default:
      fieldValue = rawFieldValue;
    }
    dpkg[fieldName] = fieldValue;
  }
  dpkg.id = dpkg['Package'];
  return dpkg;
};

const splitDependenciesLine = fieldValue => {
  const dependenciesSeparator = /,\s/;
  const rawDependencies = fieldValue.split(dependenciesSeparator);
  return rawDependencies.map(rawDependency => {
    const [dependencyPackageId, ...version] = rawDependency.split(/\s+/);
    return [dependencyPackageId, version.join(' ')];
  });
};

const splitMultiline = fieldValue => {
  const [shortDescription, ...longDescriptionLines] = fieldValue.split(/\n\s/);
  const longDescription = longDescriptionLines.reduce((lines, line) => {
    const escapedBlankLine = '.';
    if (line === escapedBlankLine) lines.push('', '');
    else {
      const lastLine = lines.length - 1;
      lines[lastLine] = lines[lastLine].concat(' ', line).trim();
    }
    return lines;
  }, ['']);
  return {
    shortDescription: shortDescription,
    longDescription: longDescription
  };
};
