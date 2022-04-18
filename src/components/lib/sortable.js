import React, { Component } from 'react';
import SortableTree from '@nosferatu500/react-sortable-tree';
import '@nosferatu500/react-sortable-tree/style.css'; // This only needs to be imported once in your app
import {  removeNodeAtPath ,addNodeUnderParent} from '@nosferatu500/react-sortable-tree';

class Sortable extends Component {
    constructor (props) {
        super(props)
        this.state = {
            key:0
        };
    }
    removeNode=(rowInfo)=>{
        let {node, treeIndex, path} = rowInfo;
        this.props.change_treeData(removeNodeAtPath({
                           treeData: this.props.treeData,
                           path: path,   // You can use path from here
                           getNodeKey: ({node: TreeNode, treeIndex: number}) => {
                               return number;
                           },
                           ignoreCollapsed: false,
                        }))
            

    }
    //
    componentWillReceiveProps(nextProps){
        if(nextProps.keyz!==this.props.keyz){
        let newTree = addNodeUnderParent({
            treeData: this.props.treeData,
            parentKey: null,
            expandParent: true,
            getNodeKey:({ treeIndex }) => treeIndex,
            newNode:nextProps.value_update
          });
          this.props.change_treeData(newTree.treeData)
            //Perform some operation
            this.setState({keyz: nextProps.keyz });
        }
    }
    //

    render() {
        return (
            <React.Fragment>
                <div style={{ height: 400 }}>
                    <SortableTree
                        treeData={this.props.treeData==undefined?[]:this.props.treeData}
                        onChange={treeData => this.props.change_treeData(treeData)}
                        maxDepth={this.props.maxDepth}
                        generateNodeProps={rowInfo => ({
                            buttons: [
                                    <i className="fa-solid fa-x xxz" onClick={(event) => this.removeNode(rowInfo)}></i>
                                   ],
                           
                         })}
                    />
                    {/* <button onClick={this.test}>ccccccccccc</button> */}
                </div>
            </React.Fragment>
        )
    }
}
export default Sortable;