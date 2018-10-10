const DPKG_CONTROL_FILE_URL = 'https://gist.githubusercontent.com' +
'/lauripiispanen/29735158335170c27297422a22b48caa/raw' +
'/61a0f1150f33a1f31510b8e3a70cbac970892b2f/status.real';

const mapDataFields = (accumulator, currentValue, currentIndex, array) => {
  if(currentIndex % 2 == 0){
    const fieldName = currentValue.trim();
    const rawValue = array[currentIndex + 1].trim();
    let fieldValue = rawValue;
    switch (fieldName) {
    case 'Needed By':
    case 'Depends':
      fieldValue = rawValue.split(/,\s/).map(dependency => {
        const [dependencyPackageName, ...version] = dependency.split(/\s+/);
        return [dependencyPackageName, version.join(' ')];
      });
      break;
    }
    accumulator[fieldName] = fieldValue;
  }
  return accumulator;
};

class DPKG {
  static url() {
    return DPKG_CONTROL_FILE_URL;
  }

  static parse(RawText) {
    const rawParagraphs = RawText.split(/(?:\s+\r\n|\r|\n){2}/);
    let packages = rawParagraphs.reduce((accumulator, rawParagraph) => {
      const dataFieldSplitter = /((?:^|\r\n|\r|\n)[\w-]+):\s/;
      const dataFieldsParts = rawParagraph.split(dataFieldSplitter)
        .filter(Boolean);
      const dataFields = dataFieldsParts.reduce(mapDataFields, {});
      dataFields['Needed By'] = [];
      accumulator[dataFields['Package']] = dataFields;
      return accumulator;
    }, {});
    packages = DPKG.enrich(packages);
    return packages;
  }

  static enrich(packages) {
    let enrichedPackages = packages;
    for (let packageName in enrichedPackages) {
      if (enrichedPackages.hasOwnProperty(packageName)) {
        const pkg = enrichedPackages[packageName];
        pkg.id = pkg.Package;
        if ('Depends' in pkg) {
          for (let [dependency, version] of pkg['Depends']) {
            let neededPackage = enrichedPackages[dependency];
            if (dependency in enrichedPackages &&
              !neededPackage['Needed By'].includes([pkg.Package, pkg.Version])){
              neededPackage['Needed By'].push([pkg.Package, version]);
            }
          }
        }
      }
    }
    return enrichedPackages;
  }

  static names(packages) {
    return Object.keys(packages);
  }

  static filter(packages, selected) {
    return Object.entries(packages).reduce((accumulator, [packageName, pkg]) => {
      if (selected.includes(packageName)) {
        accumulator[packageName] = pkg;
      }
      return accumulator;
    }, {});
  }
}
