function DPKGStore() {
  this.index = {};

  this.load = controlData => {
    const paragraphSeparator = /(?:\s+\r\n|\r|\n){2}/;
    const paragraphs = controlData.split(paragraphSeparator);
    const packages = paragraphs.map(DPKG.buildFromParagraph);
    packages.reduce(indexByPackageId, this.index);
    this.processReverseDependencies();
  };

  this.processReverseDependencies = () => {
    this.packageIds().reduce(addReverseDepdendencyToPackage, this.index);
  };

  this.find = packageId => this.index[packageId];

  this.packageIds = () => Object.keys(this.index);

  this.packages = packageIds => packageIds.map(packageId => this.find(packageId))
    .filter(Boolean);
}

const addReverseDepdendencyToPackage = (packagesIndex, packageId) => {
  const dpkg = packagesIndex[packageId];
  if ('Depends' in dpkg) {
    const dependencies = dpkg['Depends'];
    for (let dependency of dependencies) {
      const [dependencyPackageId] = dependency;
      let isDependencyInstalled = false;
      if (dependencyPackageId in packagesIndex) {
        isDependencyInstalled = true;
        dependency.push(isDependencyInstalled);
        const dependencyPackage = packagesIndex[dependencyPackageId];
        const neededByFieldValue = [dpkg.Package, dpkg.version, true];
        let neededByFieldValues = dependencyPackage['Needed By'];
        if (!neededByFieldValues)
          dependencyPackage['Needed By'] = [neededByFieldValue];
        else if (!neededByFieldValues.includes(neededByFieldValue))
          dependencyPackage['Needed By'].push(neededByFieldValue);
      } else {
        dependency.push(isDependencyInstalled);
      }
    }
  }
  return packagesIndex;
};

const indexByPackageId = (index, dpkg) => {
  index[dpkg.id] = dpkg;
  return index;
};
