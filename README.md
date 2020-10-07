# discernJS
discernJS is a simple alternative to require.js. discernJS allows you to load page specific js src and global js src in either the head or the body of the document after page has loaded

## discern.json
*Sample JSON*
```json
{
  "home": {
    "head": [],
    "body": []
  },
  "checkout": {
    "body": [
      {
        "url": "https://www.paypalobjects.com/api/checkout.js"
      },
      {
        "url": "https://cdn.ibmstg.napaonline.com/_ui/shared/js/checkout.js"
      },
      {
        "url": "https://cdn.ibmstg.napaonline.com/_ui/desktop/common/minifiedversion/js/acc.cartremoveitem.js"
      }
    ]
  },
  "global": {
    "head": [],
    "body": [
      {
        "url": "https://vmss.boldchat.com/aid/582395174734209285/bc.vms4/vms.js",
        "defer": true,
        "exclude": []
      },
      {
        "url": "https://cdn.ibmstg.napaonline.com/_ui/desktop/common/js/modernizr.js",
        "exclude": ["home", "checkout"]
      },
      {
        "url": "https://cdn.ibmstg.napaonline.com/_ui/desktop/common/minifiedversion/js/global.js",
        "exclude": []
      },
      {
        "url": "https://cdn.ibmstg.napaonline.com/_ui/desktop/common/js/typeahead.jquery.js",
        "exclude": []
      },
      {
        "url": "https://cdn.ibmstg.napaonline.com/_ui/desktop/common/js/jquery-ui.min.js",
        "exclude": []
      },
      {
        "url": "https://cdn.ibmstg.napaonline.com/_ui/desktop/common/js/featherlight.js",
        "exclude": []
      },
      {
        "url": "https://cdn.ibmstg.napaonline.com/_ui/desktop/common/js/jquery.cycle2.js",
        "exclude": []
      },
      {
        "url": "https://cdn.ibmstg.napaonline.com/_ui/desktop/common/js/jquery.cycle2.carousel.js",
        "exclude": []
      },
      {
        "url": "https://cdn.ibmstg.napaonline.com/_ui/desktop/common/js/jquery.cycle2.swipe.js",
        "exclude": []
      }
    ]
  }
}

```
### Keys
| Key                   | Type   | Required | Description                                                                                              |
| --------------------- | ------ | -------- | -------------------------------------------------------------------------------------------------------- |
| `global.head.exclude` | Array  | Y        | To be included as part of global.head object array. Array of pageType that script should not load on     |
| `url`                 | string | Y        | URL of script to be included. Can be absolute or relative                                                |
| `head`                | Aray   | Y        | Array of Objects that include URL, defer, async, etc.  to be included in head of document                |
| `body`                | Aray   | Y        | Array of Objects that include URL, defer, async, etc. to be included at before the closing `</body>` tag |