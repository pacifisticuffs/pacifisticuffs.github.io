(() => {
  'use strict';

        // The element whose visibility determines whether we fetch
        // the next article
  const TRIGGER   = document.querySelector( '.blog-footer' ),

        // The container element for all articles on the page
        CONTAINER = document.querySelector( '.blog-main' ),

        LOADER    = document.createElement( 'p' );


      // whether we're currently processing a request
  let fetching = false,
      // the current article on the page
      current  = document.querySelector( '.blog-main article' );

  /**
   * Returns true if any part of the element is in the viewport
   *
   * @link https://stackoverflow.com/a/12418814
   *
   * @param  {DOMNode} el The element whose position we're checking
   * @return {Boolean}
   **/
  const inViewport = el => {
    if ( !el ) {
      return false;
    }

    let rect = el.getBoundingClientRect(),
        {bottom, right, top, left} = rect,
        {clientHeight: height, clientWidth: width} = document.documentElement;

    return ( !!rect &&
      bottom >= 0 &&
      right  >= 0 &&
      top    <= height &&
      left   <= width );
  };

  /**
   * Returns the url for the next article to fetch. Looks at the
   * `data-next-url` attribute on the dom node passed in
   *
   * @param {DOMNode} article
   * @return {String} The url for the next article or null if not present
   **/
  const nextArticle = article => {
    if ( !article ) {
      article = current;
    }
    let url = article.dataset.nextUrl;
    return ( url === 'null' ) ? null : url;
  };

  /**
   * Returns true if we should continue with the fetch operation
   *
   * @return {Boolean}
   **/
  const carryOn = () => {
    return !fetching && inViewport( TRIGGER ) && nextArticle();
  };

  /**
   * Attempts to throttle the function getting called
   *
   * @param {Function} fn The function to execute
   * @param {Integer} delay How long to wait in ms
   * @param {Boolean} immediate Boolean, wether to invoke immediately
   */
  const debounce = ( fn, delay, immediate ) => {
    let timeout;

    return () => {
      if ( timeout ) {
        clearTimeout( timeout );
      }

      if ( immediate ) {
        fn();
      }
      else {
        timeout = setTimeout( fn, delay );
      }
    };
  };

  /**
   * Shows or hides the loading spinner
   *
   * @param {String} mode `on` will show it, anything else will hide it
   */
  const loader = mode => {
    if ( mode == 'on' ) {
      CONTAINER.appendChild( LOADER );
    }
    else {
      CONTAINER.removeChild( LOADER );
    }
  }

  /**
   * Handles the fetching, parsing, and displaying of new content
   *
   */
  const get = () => {

    // if our trigger element isn't present or we're involved in some
    // other operation, break
    if ( !carryOn() ) return;

    // Show the loading spinner
    loader( 'on' );

    let xhr = new XMLHttpRequest();

    // this tells the xhr object to parse the response into
    // an html page. super useful!
    xhr.responseType = 'document';

    xhr.addEventListener( 'load', response => {
          // this is the parsed document, now with its own
          // dom methods available
      let doc     = xhr.responseXML,

          // we're gonna grab all the content of the inline scripts
          // and append them in a new element
          newScr  = document.createElement( 'script' ),

          // the new content we'll add to the page
          article = doc.querySelector( 'article' ),

          // the container for the page's content
          main    = document.querySelector( '.blog-main' ),

          // scripts from the fetched document need special handling
          scripts = article.querySelectorAll( 'script' );

      article.classList.add( 'infinitely-scrolled', 'article-loader' );
      main.appendChild( article );
      current = article;

      scripts.forEach( scr => {
        // if a script tag points to an external file, create a new element
        // and append it with the src attribute set
        if ( scr.src && scr.src != '' ) {
          let remoteScript = document.createElement( 'script' );
          remoteScript.src = scr.src;
          article.appendChild( remoteScript );
        }
        // inline script, so collect its contents and append it
        // for later execution
        else {
          newScr.innerHTML += ';' + scr.innerHTML;
        }
      });

      if ( newScr.innerHTML ) {
        article.appendChild( newScr );
      }

      setTimeout( () => {
        article.classList.remove( 'article-loader' );
        loader();
      }, 20 );

      // reset our active flag
      fetching = false;
    });

    // artificial delay to allow loading spinner to show
    setTimeout( () => {
      xhr.open( 'GET', nextArticle() );
      fetching = true;
      xhr.send();
    }, 500 );
  }

  LOADER.classList.add( 'loader' );
  LOADER.innerHTML = '<span class="material-icons glyphicon-refresh-animate">autorenew</span> Loading...';

  // attach to the window's scroll event. the `debounce` will prevent it
  // from spamming
  window.addEventListener( 'scroll', debounce( get, 300 ), false );
})();