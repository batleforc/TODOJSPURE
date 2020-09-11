import component from './Todo'

import './normalize.css'
import './style.css'

component();


  if (module.hot) {
    module.hot.accept('./Acces.js', function() {
      console.log('Accepting the updated Access module!');
     document.body.removeChild(element);
     element = component(); // Re-render the "component" to update the click handler
     document.body.appendChild(element);
    })
    module.hot.accept('./index.js', function() {
      console.log('Accepting the updated Index.js module!');
      window.location.reload()
    })
  }