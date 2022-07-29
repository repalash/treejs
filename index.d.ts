export default class Tree {
    static onSwitcherClick(target: any): void;
    static parseTreeData(data: any): {
        treeNodes: any;
        nodesById: {};
        leafNodesById: {};
        defaultValues: any[];
        defaultDisables: any[];
    };
    static createRootEle(): HTMLDivElement;
    static createUlEle(): HTMLUListElement;
    static createLiEle(node: any, closed: any): HTMLLIElement;
    /**
     * @param container {string|HTMLElement}
     * @param options {{data: any, closeDepth: number, values: string[], disables: string[], loaded: ()=>void, onItemLabelClick: (item: any)=>void, onChange: ()=>void}}
     */
    constructor(container: string | HTMLElement, options: {
        data: any;
        closeDepth: number;
        values: string[];
        disables: string[];
        loaded: () => void;
        onItemLabelClick: (item: any) => void;
        onChange: () => void;
    });
    treeNodes: any[];
    nodesById: {};
    leafNodesById: {};
    liElementsById: {};
    willUpdateNodesById: {};
    container: string | HTMLElement;
    options: {
        values: any[];
        disables: any[];
        loaded: any;
        closeDepth: any;
    } & {
        data: any;
        closeDepth: number;
        values: string[];
        disables: string[];
        loaded: () => void;
        onItemLabelClick: (item: any) => void;
        onChange: () => void;
    };
    init(data: any): void;
    render(treeNodes: any): void;
    buildTree(nodes: any, depth: any): HTMLUListElement;
    bindEvent(ele: any): void;
    onItemClick(id: any): void;
    /**
     * @param id {string}
     */
    onItemLabelClick(id: string): void;
    /**
     * @param {string} value
     */
    setValue(value: string): void;
    /**
     * @returns {string[]}
     */
    getValues(): string[];
    setValues(values: any): void;
    setDisable(value: any): void;
    getDisables(): any[];
    setDisables(values: any): void;
    emptyNodesCheckStatus(): void;
    emptyNodesDisable(): void;
    getSelectedNodesById(): {};
    getDisabledNodesById(): {};
    updateLiElements(): void;
    markWillUpdateNode(node: any): void;
    walkUp(node: any, changeState: any): void;
    walkDown(node: any, changeState: any): void;
    updateLiElement(node: any): void;
    collapseAll(): void;
    expandAll(): void;
}
