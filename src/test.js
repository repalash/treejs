/* eslint-disable */
new Tree('#container', {
    data: [], // tree data
});

new Tree('#container', {
    data: [], // tree data
    values: ['1', '2', '3'],
});

new Tree('#container', {
    data: [], // tree data
    values: ['1', '2', '3'],
    loaded: () => {
        // to something or setValues() after Tree loaded callback
        let treeJson = [];
        this.values = treeJson;
    },
});

let tree = new Tree();
let values = tree.values;
let selectedNodes = tree.selectedNodes;
