import React from 'react';
import ReactDOMServer from 'react-dom/server';


module.exports = class HTML extends React.Component {
  render() {
    const reduxHtml = `window.__PRELOADED_STATE__=${  JSON.stringify(this.props.redux_state).replace(/</g, '\\u003c')}`;

    const app_vars = `
      window.app_vars = {
        server_load_time: ${(new Date().getTime())},
        client_load_start : (new Date()).getTime(),
        config: ${JSON.stringify(this.props.client_config || {})},
        loggedIn: ${this.props.locals.loggedIn}
      }
    `;

    const scripts = this.props.headScripts || [];
    const app = ReactDOMServer.renderToString(this.props.children);

    return (
      <html style={{ height: '100%' }}>
        <head>
          <meta charSet="utf-8" />
          <script dangerouslySetInnerHTML={{ __html: app_vars }}></script>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"></meta>

          {
            scripts.map((scriptUrl) => <script src={scriptUrl} />)
          }
        </head>
        <body style={{ height: '100%', padding: '0px', margin: '0px' }}>
          <span style={{ display: 'none' }} dangerouslySetInnerHTML={{ __html: this.props.locals.css_injections }}></span>
          <style dangerouslySetInnerHTML={{ __html: this.props.getStyleSheets() }} id="jss-server-side"></style>
          <div style={{ width: '100%', height: '100%' }} id="root" dangerouslySetInnerHTML={{ __html: app }}>

          </div>
          <span style={{ display: 'none' }} dangerouslySetInnerHTML={{ __html: this.props.locals.js_injections }}>
          </span>
          <script dangerouslySetInnerHTML={{ __html: reduxHtml }}></script>
        </body>
      </html>
    );
  }
};