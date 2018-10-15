class SearchSuggestions extends React.Component {
  render() {
    const { packageIds } = this.props;
    const packagesSuggestionsIsEmpty = (packageIds.length == 0);
    if (packagesSuggestionsIsEmpty) return false;
    return (
      <nav className='search-suggestions'>
        <span>Suggestions</span>
        <PackageList packageIds={packageIds} />
      </nav>
    );
  }
}
