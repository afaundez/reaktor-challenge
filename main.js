const controFileUrl = 'https://gist.githubusercontent.com' +
                      '/lauripiispanen/29735158335170c27297422a22b48caa/raw' +
                      '/61a0f1150f33a1f31510b8e3a70cbac970892b2f/status.real';
const controlData = new DPKGStore();
const controlDataElement = React.createElement(ControlData, {
  controlFile: controFileUrl
});
ReactDOM.render(controlDataElement, document.querySelector('#root'));
