class ParagraphArticle extends React.Component {
  render() {
    const paragraph = this.props.paragraph;
    const keyPrefix = `paragraph-${paragraph.Package}`;
    const splitDependencies = (fieldName, fieldValue) => {
      let value;
      switch (fieldName) {
        case "Depends":
          value = fieldValue.split(/\,\s/).map(dependency => {
            const [dependencyPackageName, ...version] = dependency.split(/\s+/);
            return [
              React.createElement('a', {
                href: dependencyPackageName, key: dependencyPackageName,
              }, dependencyPackageName),
              ' ', version.join(' '),
            ];
          }).reduce((prev, curr) => [prev, ', ', curr]);
          break;
        default:
          value = fieldValue;
      };
      return value;
    };
    return React.createElement('article', { key: `${keyPrefix}-article` }, [
      React.createElement('h3', { id: paragraph.Package, key: `${keyPrefix}-heading` },
        `Package: ${paragraph.Package}`),
      React.createElement('dl', { key: `${keyPrefix}-dataFields` },
        Object.entries(paragraph).map(([fieldName, fieldValue]) => [
          React.createElement('dt', { key: `${keyPrefix}-${fieldName}` },
            fieldName),
          React.createElement('dd', { key: `${keyPrefix}-fieldValue` },
            splitDependencies(fieldName, fieldValue))
        ])
      )
    ]);
  }
}
class ControlData extends React.Component {
  constructor(props) {
    super(props);
    this.state = { paragraphsBySection: {} };
  }
  componentDidMount() {
    const mapDataFields = (accumulator, currentValue, currentIndex, array) => {
      if(currentIndex % 2 == 0){
        accumulator[currentValue.trim()] = array[currentIndex + 1].trim();
      }
      return accumulator;
    };
    const groupBySection = (accumulator, currentValue, currentIndex, array) => {
      if(!Object.keys(accumulator).includes(currentValue.Section)) {
        accumulator[currentValue.Section] = [];
      }
      accumulator[currentValue.Section].push(currentValue);
      return accumulator;
    }
    fetch(this.props.controlFile)
      .then(response => response.text())
      .then(data => {
        const rawParagraphs = data.split(/(?:\s+\r\n|\r|\n){2}/);
        const paragraphs = rawParagraphs.map(rawParagraph => {
          const dataFieldSplitter = /((?:^|\r\n|\r|\n)[\w\-]+)\:\s/;
          const paragraphsParts = rawParagraph.split(dataFieldSplitter)
            .filter(Boolean);
          return paragraphsParts.reduce(mapDataFields, {});
        });
        const paragraphsBySection = paragraphs.reduce(groupBySection, {});
        this.setState({ paragraphsBySection: paragraphsBySection })
      });
  }
  render() {
    const { paragraphsBySection } = this.state;
    const paragraphArticles = paragraphs => paragraphs.map(paragraph => {
      return React.createElement(ParagraphArticle, {
        key: `section-paragraph-${paragraph.Package}`,
        paragraph: paragraph
      }, null)
    });
    const sections = groupedParagraphs => Object.entries(groupedParagraphs)
      .map(([section, sectionParagraphs]) => {
        return React.createElement('section', { key: `section-${section}` }, [
          React.createElement('h2', { key: `section-${section}-heading` },
            `Section: ${section}`),
          paragraphArticles(sectionParagraphs)
        ]);
      });
    return React.createElement('section', { key: 'paragraphs-by-section' }, [
      React.createElement('h1', { key: 'paragraphs-by-section-heading' },
        'Packages by Section'),
      sections(paragraphsBySection)
    ]);
  }
}
ReactDOM.render(
  React.createElement(ControlData, {
    key: 'control-data',
    controlFile:  'https://gist.githubusercontent.com/lauripiispanen' +
                  '/29735158335170c27297422a22b48caa/raw' +
                  '/61a0f1150f33a1f31510b8e3a70cbac970892b2f/status.real'
  }, null),
  document.getElementById('root')
);
