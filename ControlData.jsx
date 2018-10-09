const paragraphs = paragraphs => paragraphs.map(paragraph => (
  <ParagraphArticle key={`section-paragraph-${paragraph.Package}`}
                    paragraph={ paragraph }
  />
));

const sections = groupedParagraphs => Object.entries(groupedParagraphs)
  .map(([section, sectionParagraphs]) => (
    <section key={`section-${section}`}>
      <h2>{`Section: ${section}`}</h2>
      {paragraphs(sectionParagraphs)}
    </section>
  ));

class ControlData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      paragraphsBySection: {},
      query: ''
    };
  }

  handleInputChange = () => {
     this.setState({
       query: this.search.value
     })
   }

  componentDidMount() {
    fetch(this.props.controlFile)
      .then(response => response.text())
      .then(data => this.setState({paragraphsBySection: DPKG.parse(data) }));
  }

  render() {
    const { paragraphsBySection } = this.state;
    const packagesNames = Object.entries(paragraphsBySection).map(([k, v]) => v.map(p => p.Package)).flat();
    return (
      <section key='sections'>
        <h1>DPKG Status</h1>
        <ParagraphSearch packagesNames={packagesNames} />
        {sections(paragraphsBySection)}
      </section>
    );
  }
}
