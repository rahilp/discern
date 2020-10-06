function discern(o) {
  var bodyTag = document.getElementsByTagName('BODY')[0]
  var pageType = bodyTag.getAttribute('data-discern')
  var cb = ''

  if (o.cacheBust === true && typeof o.cacheBustString) {
    cb = '?v=' + o.cacheBustString
  }

  var filePath = o.file + cb
  fetch(filePath)
    .then(function (response) {
      if (response.status !== 200) {
        console.error('Looks like there was a problem with discern() fetch. Status Code: ' + response.status)
        return
      }

      response.json().then(function (data) {
        if (Object.prototype.hasOwnProperty.call(data, pageType)) {
          var pageScripts = data[pageType] // Global Scripts

          for (var globalScript in data['global']) {
            for (var obj in data['global'][globalScript]) {
              var urlData = data['global'][globalScript][obj]
              var globalscriptElem = document.createElement('script')
              globalscriptElem.src = urlData.url + cb

              if (urlData.async) {
                globalscriptElem.setAttribute('async', '')
              }

              if (urlData.defer) {
                globalscriptElem.setAttribute('defer', '')
              }

              if (globalScript === 'head') {
                document.head.appendChild(globalscriptElem)
              } else {
                document.body.appendChild(globalscriptElem)
              }
            }
          } // Page Specific Scripts

          for (var section in pageScripts) {
            var sectionScript = pageScripts[section]

            for (var scriptName in sectionScript) {
              var urlPageData = pageScripts[section][scriptName]
              var scriptElm = document.createElement('script')
              scriptElm.src = urlPageData.url + cb

              if (urlPageData.async) {
                scriptElm.setAttribute('async', '')
              }

              if (urlPageData.defer) {
                scriptElm.setAttribute('defer', '')
              }

              if (section === 'head') {
                document.head.appendChild(scriptElm)
              } else {
                document.body.appendChild(scriptElm)
              }
            }
          }
        }
      })
    })
    .catch(function (err) {
      console.error('Fetch Error :-S', err)
    })
}
