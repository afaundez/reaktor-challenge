class Package extends React.Component {
  render() {
    const { packageId, refererId, onPackageLinkClick } = this.props;
    let backButton = false;
    if(refererId){
      const value = '< ' + refererId;
      backButton = (
        <PackageLink
          packageId={refererId}
          value={value}
          onPackageLinkClick={onPackageLinkClick}
          direction={'backwards'}
        />
      );
    }
    const dpkg = controlData.find(packageId);
    return (
      <article className='package'>
        <nav>{backButton}</nav>
        <h3>{dpkg.id}</h3>
        <dl>
          <Field name='Section' value={dpkg['Section']} />
          <Field
            name='Depends'
            value={dpkg['Depends']}
            onPackageLinkClick={onPackageLinkClick}
          />
          <Field
            name='Needed By'
            value={dpkg['Needed By']}
            onPackageLinkClick={onPackageLinkClick}
          />
          <Field name='Description' value={dpkg['Description']} />
        </dl>
      </article>
    );
  }
}
