class Field extends React.Component {
  render() {
    const { name, value, onPackageLinkClick } = this.props;
    if(!value) return (null);
    return (
      <React.Fragment key={name}>
        <dt className='field-name'>{name}</dt>
        <dd className='field-value'>
          <FieldValue name={name} value={value} onPackageLinkClick={onPackageLinkClick} />
        </dd>
      </React.Fragment>
    );
  }
}
