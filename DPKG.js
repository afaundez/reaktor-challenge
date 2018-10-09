const DPKG_CONTROL_FILE_URL = 'https://gist.githubusercontent.com' +
'/lauripiispanen/29735158335170c27297422a22b48caa/raw' +
'/61a0f1150f33a1f31510b8e3a70cbac970892b2f/status.real';

const mapDataFields = (accumulator, currentValue, currentIndex, array) => {
  if(currentIndex % 2 == 0){
    const fieldName = currentValue.trim();
    const rawValue = array[currentIndex + 1].trim();
    let fieldValue = rawValue;
    switch (fieldName) {
      case 'Depends':
        fieldValue = rawValue.split(/\,\s/).map(dependency => {
          const [dependencyPackageName, ...version] = dependency.split(/\s+/);
          return [dependencyPackageName, version.join(' ')];
        })
        break;
    };
    accumulator[fieldName] = fieldValue;
  }
  return accumulator;
};

const groupBySection = (accumulator, currentValue, currentIndex, array) => {
  if(!Object.keys(accumulator).includes(currentValue.Section)) {
    accumulator[currentValue.Section] = [];
  }
  accumulator[currentValue.Section].push(currentValue);
  return accumulator;
};

class DPKG {
  static parse(RawText) {
    const rawParagraphs = RawText.split(/(?:\s+\r\n|\r|\n){2}/);
    const paragraphs = rawParagraphs.map(rawParagraph => {
      const dataFieldSplitter = /((?:^|\r\n|\r|\n)[\w\-]+)\:\s/;
      const paragraphsParts = rawParagraph.split(dataFieldSplitter)
      .filter(Boolean);
      return paragraphsParts.reduce(mapDataFields, {});
    });
    const dpkg = paragraphs.reduce(groupBySection, {});
    return dpkg;
  }
}
