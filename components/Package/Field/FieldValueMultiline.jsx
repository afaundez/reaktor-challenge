class FieldValueMultiline extends React.Component {
  render() {
    const { value } = this.props;
    const { shortDescription, longDescription } = value;
    const longDescriptionElement = longDescription.map((paragraph, index) => {
      const key = 'longDescription' + index;
      return (
        <React.Fragment key={key}>
          {paragraph}
          <br />
        </React.Fragment>
      );
    });
    return (
      <React.Fragment>
        <p>{shortDescription}</p>
        <p>{longDescriptionElement}</p>
      </React.Fragment>
    );
  }
}
