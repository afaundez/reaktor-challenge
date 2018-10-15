class FieldValue extends React.Component {
  render() {
    const { name, value, onPackageLinkClick } = this.props;
    switch (name) {
      case 'Needed By':
      case 'Depends':
        return <FieldValuePackages value={value} onPackageLinkClick={onPackageLinkClick} />;
      break;
      case 'Description':
        return <FieldValueMultiline value={value}/>;
      break;
    }
    return <FieldValueLine value={value} />;
  }
}
