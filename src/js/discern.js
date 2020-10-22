/* eslint-disable no-console */
// eslint-disable-next-line no-unused-vars
function discern (o) {
  var bodyTag = document.getElementsByTagName('BODY')[0]
  var pageType = bodyTag.getAttribute('data-discern')
  var cb = ''
  var discernEvent = new Event('discernDataLoaded')
  var scriptData = null

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
        // Set response as variable availble outside response
        scriptData = data
        // Dispatch the discernDataLoaded event
        window.dispatchEvent(discernEvent)
      })
    })
    .catch(function (err) {
      console.error('Fetch Error :-S', err)
    })

  // Listen for DiscernDataLoaded Event
  window.addEventListener(
    'discernDataLoaded',
    function () {
      if (Object.prototype.hasOwnProperty.call(scriptData, pageType)) {
        var pageScripts = scriptData[pageType] // Determine and set Page Type

        for (var globalScript in scriptData['global']) {
          for (var obj in scriptData['global'][globalScript]) {
            var urlData = scriptData['global'][globalScript][obj]
            var exclude = urlData.exclude
            if (exclude && !exclude.includes(pageType)) {
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
          }
        }

        // Page Specific Scripts

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
    },
    false
  )
}
