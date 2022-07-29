import styles from './index.less';

function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

function uniq(arr) {
    const map = {};
    return arr.reduce((acc, item) => {
        if (!map[item]) {
            map[item] = true;
            acc.push(item);
        }
        return acc;
    }, []);
}

function empty(ele) {
    while (ele.firstChild) {
        ele.removeChild(ele.firstChild);
    }
}

function animation(duration, callback) {
    requestAnimationFrame(() => {
        callback.enter();
        requestAnimationFrame(() => {
            callback.active();
            setTimeout(() => {
                callback.leave();
            }, duration);
        });
    });
}

function collapseFromLeaf(tree, leafNode) {
    try {
        const nodeLiElement = tree.liElementsById[leafNode.parent.id];
        if (!nodeLiElement.classList.contains('treejs-node__close'))
            nodeLiElement.getElementsByClassName('treejs-switcher')[0].click();
    } catch (error) {
        return;
    }
    if (Object.prototype.hasOwnProperty.call(leafNode, 'parent'))
        collapseFromLeaf(tree, leafNode.parent);
}

function expandFromRoot(tree, root) {
    const nodeLiElement = tree.liElementsById[root.id];
    if (nodeLiElement.classList.contains('treejs-node__close'))
        nodeLiElement.getElementsByClassName('treejs-switcher')[0].click();
    if (Object.prototype.hasOwnProperty.call(root, 'children'))
        root.children.forEach(child => expandFromRoot(tree, child));
}

export default class Tree {
    /**
     * @param container {string|HTMLElement}
     * @param options {{data: any, values: string[], disables: string[], loaded: ()=>void}}
     */
    constructor(container, options) {

        styles.use({target: typeof this.container === 'string' ? document.querySelector(this.container) : this.container});

        const defaultOptions = {
            values: [],
            disables: [],
            loaded: null,
            closeDepth: null,
        };
        this.treeNodes = [];
        this.nodesById = {};
        this.leafNodesById = {};
        this.liElementsById = {};
        this.willUpdateNodesById = {};
        this.container = container;
        this.options = Object.assign(defaultOptions, options);

        Object.defineProperties(this, {
            values: {
                get() {
                    return this.getValues();
                },
                set(values) {
                    this.setValues(uniq(values));
                },
            },
            disables: {
                get() {
                    return this.getDisables();
                },
                set(values) {
                    this.setDisables(uniq(values));
                },
            },
            selectedNodes: {
                get() {
                    const nodes = [];
                    const {nodesById} = this;
                    Object.keys(nodesById).forEach(id => {
                        if (
                            Object.prototype.hasOwnProperty.call(nodesById, id) &&
                            (nodesById[id].status === 1 || nodesById[id].status === 2)
                        ) {
                            const node = { ...nodesById[id]};
                            delete node.parent;
                            delete node.children;
                            nodes.push(node);
                        }
                    })
                    return nodes;
                },
            },
            disabledNodes: {
                get() {
                    const nodes = [];
                    const {nodesById} = this;
                    Object.keys(nodesById).forEach(id => {
                        if (Object.prototype.hasOwnProperty.call(nodesById, id) && nodesById[id].disabled) {
                            const node = { ...nodesById[id]};
                            delete node.parent;
                            nodes.push(node);
                        }
                    })
                    return nodes;
                },
            },
        });

        this.init(this.options.data);
    }

    init(data) {
        const {
            treeNodes,
            nodesById,
            leafNodesById,
            defaultValues,
            defaultDisables,
        } = Tree.parseTreeData(data);
        this.treeNodes = treeNodes;
        this.nodesById = nodesById;
        this.leafNodesById = leafNodesById;
        this.render(this.treeNodes);
        const {values, disables, loaded} = this.options;
        if (values && values.length) this.setValues(values);
        else if (defaultValues && defaultValues.length) this.setValues(defaultValues);
        if (disables && disables.length) this.setDisables(disables);
        else if (defaultDisables && defaultDisables.length) this.setDisables(defaultDisables);
        if (typeof loaded === 'function') loaded.call(this);
    };

    render(treeNodes) {
        const treeEle = Tree.createRootEle();
        treeEle.appendChild(this.buildTree(treeNodes, 0));
        this.bindEvent(treeEle);
        const ele = typeof this.container === 'string' ? document.querySelector(this.container) : this.container;
        empty(ele);
        ele.appendChild(treeEle);
    };

    buildTree(nodes, depth) {
        const rootUlEle = Tree.createUlEle();
        if (nodes && nodes.length) {
            nodes.forEach(node => {
                const liEle = Tree.createLiEle(
                    node,
                    depth === this.options.closeDepth - 1
                );
                this.liElementsById[node.id] = liEle;
                let ulEle = null;
                if (node.children && node.children.length) {
                    ulEle = this.buildTree(node.children, depth + 1);
                }
                if (ulEle) liEle.appendChild(ulEle);
                rootUlEle.appendChild(liEle);
            });
        }
        return rootUlEle;
    };

    bindEvent(ele) {
        ele.addEventListener(
            'click',
            e => {
                const {target} = e;
                if (
                    target.nodeName === 'SPAN' &&
                    target.classList.contains('treejs-checkbox')
                ) {
                    this.onItemClick(target.parentNode.nodeId);
                } else if (
                    target.nodeName === 'SPAN' &&
                    target.classList.contains('treejs-label')
                ) {
                    this.onItemLabelClick(target.parentNode.nodeId);
                } else if (
                    target.nodeName === 'LI' &&
                    target.classList.contains('treejs-node')
                ) {
                    this.onItemClick(target.nodeId);
                } else if (
                    target.nodeName === 'SPAN' &&
                    target.classList.contains('treejs-switcher')
                ) {
                    Tree.onSwitcherClick(target);
                }
            },
            false
        );
    };

    onItemClick(id) {
        const node = this.nodesById[id];
        const {onChange} = this.options;
        if (!node.disabled) {
            this.setValue(id);
            this.updateLiElements();
        }
        if (onChange) onChange.call(this);
    }
    ;

    /**
     * @param id {string}
     */
    onItemLabelClick(id) {
        const {onItemLabelClick} = this.options;
        if (onItemLabelClick) onItemLabelClick.call(this, id);
    };

    /**
     * @param {string} value
     */
    setValue(value) {
        const node = this.nodesById[value];
        if (!node) return;
        const prevStatus = node.status;
        const status = prevStatus === 1 || prevStatus === 2 ? 0 : 2;
        node.status = status;
        this.markWillUpdateNode(node);
        this.walkUp(node, 'status');
        this.walkDown(node, 'status');
    };

    /**
     * @returns {string[]}
     */
    getValues() {
        const values = [];
        Object.keys(this.leafNodesById).forEach(id => {
            if (Object.prototype.hasOwnProperty.call(this.leafNodesById, id)) {
                if (
                    this.leafNodesById[id].status === 1 ||
                    this.leafNodesById[id].status === 2
                ) {
                    values.push(id);
                }
            }
        })
        return values;
    };

    setValues(values) {
        this.emptyNodesCheckStatus();
        values.forEach(value => {
            this.setValue(value);
        });
        this.updateLiElements();
        const {onChange} = this.options;
        if (onChange) onChange.call(this);
    };

    setDisable(value) {
        const node = this.nodesById[value];
        if (!node) return;
        const prevDisabled = node.disabled;
        if (!prevDisabled) {
            node.disabled = true;
            this.markWillUpdateNode(node);
            this.walkUp(node, 'disabled');
            this.walkDown(node, 'disabled');
        }
    };

    getDisables() {
        const values = [];
        Object.keys(this.leafNodesById).forEach(id => {
            if (Object.prototype.hasOwnProperty.call(this.leafNodesById, id)) {
                if (this.leafNodesById[id].disabled) {
                    values.push(id);
                }
            }
        })
        return values;
    };

    setDisables(values) {
        this.emptyNodesDisable();
        values.forEach(value => {
            this.setDisable(value);
        });
        this.updateLiElements();
    };

    emptyNodesCheckStatus() {
        this.willUpdateNodesById = this.getSelectedNodesById();
        Object.values(this.willUpdateNodesById).forEach(node => {
            // eslint-disable-next-line no-param-reassign
            if (!node.disabled) node.status = 0;
        });
    };

    emptyNodesDisable() {
        this.willUpdateNodesById = this.getDisabledNodesById();
        Object.values(this.willUpdateNodesById).forEach(node => {
            // eslint-disable-next-line no-param-reassign
            node.disabled = false;
        });
    };

    getSelectedNodesById() {
        return Object.entries(this.nodesById).reduce((acc, [id, node]) => {
            if (node.status === 1 || node.status === 2) {
                acc[id] = node;
            }
            return acc;
        }, {});
    };

    getDisabledNodesById() {
        return Object.entries(this.nodesById).reduce((acc, [id, node]) => {
            if (node.disabled) {
                acc[id] = node;
            }
            return acc;
        }, {});
    };

    updateLiElements() {
        Object.values(this.willUpdateNodesById).forEach(node => {
            this.updateLiElement(node);
        });
        this.willUpdateNodesById = {};
    };

    markWillUpdateNode(node) {
        this.willUpdateNodesById[node.id] = node;
    };

    static onSwitcherClick(target) {
        const liEle = target.parentNode;
        const ele = liEle.lastChild;
        const height = ele.scrollHeight;
        if (liEle.classList.contains('treejs-node__close')) {
            animation(150, {
                enter() {
                    ele.style.height = 0;
                    ele.style.opacity = 0;
                },
                active() {
                    ele.style.height = `${height}px`;
                    ele.style.opacity = 1;
                },
                leave() {
                    ele.style.height = '';
                    ele.style.opacity = '';
                    liEle.classList.remove('treejs-node__close');
                },
            });
        } else {
            animation(150, {
                enter() {
                    ele.style.height = `${height}px`;
                    ele.style.opacity = 1;
                },
                active() {
                    ele.style.height = 0;
                    ele.style.opacity = 0;
                },
                leave() {
                    ele.style.height = '';
                    ele.style.opacity = '';
                    liEle.classList.add('treejs-node__close');
                },
            });
        }
    };

    walkUp(node, changeState) {
        const {parent} = node;
        if (parent) {
            if (changeState === 'status') {
                let pStatus = null;
                const statusCount = parent.children.reduce((acc, child) => {
                    if (!Number.isNaN(child.status)) return acc + child.status;
                    return acc;
                }, 0);
                if (statusCount) {
                    pStatus = statusCount === parent.children.length * 2 ? 2 : 1;
                } else {
                    pStatus = 0;
                }
                if (parent.status === pStatus) return;
                parent.status = pStatus;
            } else {
                const pDisabled = parent.children.reduce(
                    (acc, child) => acc && child.disabled,
                    true
                );
                if (parent.disabled === pDisabled) return;
                parent.disabled = pDisabled;
            }
            this.markWillUpdateNode(parent);
            this.walkUp(parent, changeState);
        }
    };

    walkDown(node, changeState) {
        if (node.children && node.children.length) {
            node.children.forEach(child => {
                if (changeState === 'status' && child.disabled) return;
                // eslint-disable-next-line no-param-reassign
                child[changeState] = node[changeState];
                this.markWillUpdateNode(child);
                this.walkDown(child, changeState);
            });
        }
    };

    updateLiElement(node) {
        const {classList} = this.liElementsById[node.id];
        switch (node.status) {
            case 0:
                classList.remove('treejs-node__halfchecked', 'treejs-node__checked');
                break;
            case 1:
                classList.remove('treejs-node__checked');
                classList.add('treejs-node__halfchecked');
                break;
            case 2:
                classList.remove('treejs-node__halfchecked');
                classList.add('treejs-node__checked');
                break;
            default:
                break;
        }

        switch (node.disabled) {
            case true:
                if (!classList.contains('treejs-node__disabled'))
                    classList.add('treejs-node__disabled');
                break;
            case false:
                if (classList.contains('treejs-node__disabled'))
                    classList.remove('treejs-node__disabled');
                break;
            default:
                break;
        }
    };

    collapseAll() {
        Object.keys(this.leafNodesById).forEach(id => {
            const leafNode = this.leafNodesById[id];
            collapseFromLeaf(this, leafNode);
        })
    }

    expandAll() {
        expandFromRoot(this, this.treeNodes[0]);
    }

    static parseTreeData(data) {
        const treeNodes = deepClone(data);
        const nodesById = {};
        const leafNodesById = {};
        const values = [];
        const disables = [];
        const walkTree = function (nodes, parent) {
            nodes.forEach(node => {
                nodesById[node.id] = node;
                if (node.checked) values.push(node.id);
                if (node.disabled) disables.push(node.id);
                // eslint-disable-next-line no-param-reassign
                if (parent) node.parent = parent;
                if (node.children && node.children.length) {
                    walkTree(node.children, node);
                } else {
                    leafNodesById[node.id] = node;
                }
            });
        };
        walkTree(treeNodes);
        return {
            treeNodes,
            nodesById,
            leafNodesById,
            defaultValues: values,
            defaultDisables: disables,
        };
    };

    static createRootEle() {
        const div = document.createElement('div');
        div.classList.add('treejs');
        return div;
    };

    static createUlEle() {
        const ul = document.createElement('ul');
        ul.classList.add('treejs-nodes');
        return ul;
    };

    static createLiEle(node, closed) {
        const li = document.createElement('li');
        li.classList.add('treejs-node');
        if (closed) li.classList.add('treejs-node__close');
        if (node.children && node.children.length) {
            const switcher = document.createElement('span');
            switcher.classList.add('treejs-switcher');
            li.appendChild(switcher);
        } else {
            li.classList.add('treejs-placeholder');
        }
        const checkbox = document.createElement('span');
        checkbox.classList.add('treejs-checkbox');
        li.appendChild(checkbox);
        const label = document.createElement('span');
        label.classList.add('treejs-label');
        const text = document.createTextNode(node.text);
        label.appendChild(text);
        li.appendChild(label);
        li.nodeId = node.id;
        return li;
    };

}
