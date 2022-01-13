## problems

1. html of components fetched multiple times: solved with promise
2. querySelector not working in shadowRoot of components
    - because DOMParser doesn't walk down the tree, and only parses the first layer
    - solution is to recurse down, parsing each element.innerHTML and attaching it to the element