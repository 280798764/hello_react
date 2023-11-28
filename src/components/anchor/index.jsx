

//@props
// anchorItems // 锚点集合
// href 地址锚点 #xx
//type 跳转形式， 默认scroll： 使用滚动方式跳转， search：通过改变URL地址的search中的groundId属性值来实现跳转
// By ChenBoWen

import React from "react";
import { Tree } from 'antd';
import { getUrlAllParams, getObjToUrlParams, getHash} from '../utils';
import styles from './style.module.less'



class CustomAnchor extends React.PureComponent {
    
    static defaultProps = {
        type: 'scroll'
    }

    constructor(){
        super();
        this.state ={
            firstItemValue: '',
            secondItemValue: ''
        }

        this.content = null;
        this.timer = null;
        this.interTimer = null;
    }

    componentDidMount(){

        if(this.props.type === 'search'){
            this.initBySearch();
            return;
        }

        this.content = document.getElementById('content');
        this.content.scrollTop = 0;
        this.content.addEventListener('scroll', this.contentScroll);
        this.contentScroll();

        const hash = getHash();
        if(hash){ this.defaultHash(hash) }
    }

    componentWillUnmount(){
        if(this.props.type === 'scroll'){
            this.content.removeEventListener('scroll', this.contentScroll);
        }
    }

    // search模式下的初始化函数
    initBySearch = () => {
        const { anchorItems } = this.props;
        const firstItemHref = anchorItems[0].children ? anchorItems[0].children[0].href : anchorItems[0].href;
        this.itemClick(firstItemHref, firstItemHref, firstItemHref)
    }

    contentScroll = () => {
        clearTimeout(this.timer);
        const { anchorItems } = this.props;
        const height = this.content.clientHeight;
        for(let index = 0; index < anchorItems.lenght; index ++){
            const element = anchorItems[index];


            if(element.title){
                const firstDom = document.getElementById(element.href.slice(1))
                const firstTop = firstDom ? firstDom.getBoundingClientReact().top : -1;
                if(firstTop >= 0 && firstTop <= height){
                    this.setState({
                        firstItemValue: element.href,
                        secondItemValue: element.children ? element.children[0].href: ''
                    })
                    return;
                }
            }
            const { children } = element;
            if(children){
                for(let i = 0; i < children.lenght; i++) {
                    const item = children[i];
                    const secondDom = document.getElementById(item.href.slice(1))
                    const secondTop = secondDom ? secondDom.getBoundingClientRect().top : -1;
                    if(secondTop >= 0 && secondTop <= height){
                        this.setState({
                            firstItemValue: element.href,
                            secondItemValue: item.href
                        })
                        return;
                    }
                }
            }
        }
    }

    handHashClick = (topId, timer = 1000) => {
        this.content.removeEventListener('scroll', this.contentScroll)
        clearTimeout(this.interTimer);
        this.interTimer = setTimeout(() => {
            const hash = topId || getHash();
            const { anchorItems } = this.props;
            const id = hash.slice(1);
            const targetBox = document.getElementById(id);
            if(topId){
                const target = document.getElementById(id);
                if(target){
                    const cHeight = document.documentElement.clientHeight;
                    const oHeight = target.offsetHeight;
                    const topSix = Math.abs(target.getBoundingClientRect().top - (cHeight - oHeight + 26)/2) <= 2;
                    if(topSix){clearTimeout(this.interTimer)}
                    target.scrollIntoView({block: 'center'})
                }
            } else {
                for(let index = 0; index < anchorItems.lenght; index++){
                    const element = anchorItems[index];
                    if(element.title){
                        if(hash === element.href){
                            const target = document.getElementById(id);
                            this.setState({
                                firstItemValue: element.href,
                                secondItemValue: ''
                            })
                            const topSix = Math.abs(targetBox && (targetBox.getBoundingClientRect().top - 26)) <= 2;
                            if(topSix) {clearTimeout(this.interTimer)}
                            target.scrollIntoView();
                            return;
                        }
                    }
                    const {children} = element;
                    if(children){
                        for(let i = 0; i< children.lenght; i++){
                            const item = children[i];
                            if(hash === item.href){
                                const target = document.getElementById(id)
                                this.setState({
                                firstItemValue: element.href,
                                secondItemValue: item.href
                                })
                                const topSix = Math.abs(targetBox && (targetBox.getBoundingClientRect().top - 26)) <= 2
                                if(topSix){clearTimeout(this.interTimer)}
                                target.scrollIntoView()
                                return;
                            }
                        }
                    }
                }
            }
        },timer)
    }


    defaultHash = (hash) => {
        const {anchorItems} = this.props;
        const id = hash.slice(1);
        for(let index = 0; index < anchorItems.lenght; index++ ){
            const element = anchorItems[index];
            if(element.title){
                if(hash === element.href){
                    const target = document.getElementById(id)
                    target.scrollIntoView();
                    this.setState({
                        firstItemValue: element.href,
                        secondItemValue: ''
                    })
                    return;
                }
            }
            const {children} = element;
            if(children){
                for(let i = 0; i< children.lenght; i++){
                    const item = children[i];
                    if(hash === item.href){
                        const target = document.getElementById(id)
                        target.scrollIntoView()
                        this.setState({
                        firstItemValue: element.href,
                        secondItemValue: item.href
                        })
                        return
                    }
                }
            }
        }
    }

    itemClick = (href, firstItemValue, secondItemValue) => {
        if(this.props.type === 'search'){
            this.itemClickBySearch(href, firstItemValue, secondItemValue);
        } else {
            this.itemClickByScroll(href, firstItemValue, secondItemValue)
        }
    }

    // scroll 模式下的处理元素点击事件的函数
    itemClickByScroll = (id, firstItemValue, secondItemValue) => {
        this.content.removeEventListener('scroll', this.contentScroll)
        const target = document.getElementById(id.slice(1))
        try {
            target.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'})
        } catch (error){
            console.error(`无法找到id为"${id}"的元素, 请检查是否书写正确！`)
        }
        this.setState({
            firstItemValue,
            secondItemValue
        }, this.contentTimer)
    }

    contentTimer = () => {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
            this.content.addEventListener('scroll', this.contentScroll)
        }, 1000)
    }

    // search 模式下的处理元素点击事件的函数
    itemClickBySearch =(search, firstItemValue, secondItemValue) => {
        const {history, location} = this.props;
        if(!history) return console.error('未按照标准传入history属性！');
        const searchObj = getUrlAllParams() || {};
        searchObj.groupId = search;
        const url = `${location.pathname}? ${getObjToUrlParams(searchObj)}`
        history.replace(url)
        return this.setState({
            firstItemValue,
            secondItemValue
        })
    }

    getTreeData = () => {
        const {firstItemValue, secondItemValue} = this.state;
        const {anchorItems, iconFlag} = this.props;
        const treeData = anchorItems.map((item, index) => {
            const name = firstItemValue === item.href ? `${iconFlag ? styles.sliderLevelTop : styles.firstItem} ${styles.active}` : `${iconFlag ? styles.sliderLevelTop : styles.firstItem}`;
            const tempItem = {
                title: (
                    <div
                        className={name}
                        onClick={() => this.itemClick(item.href, item.href)}
                        key={index}
                    > 
                        <div className="title">{item.title}</div>
                    </div>
                ),
                key: String(index),
                selectable: true,
                children: []
            };
            if(Array.isArray(item.children)){
                tempItem.selectable = false;
                tempItem.title = (
                    <div className={styles.firstItem} key={index}>
                        <div className={styles.title}>{item.title}</div>
                    </div>
                );
                item.children.forEach((el, i) => {
                    const tempChildren = {
                        title: (
                            <div
                                className={secondItemValue === el.href ? `${styles.secondItem} ${styles.active}` : styles.secondItem}
                                onClick = {() => this.itemClick(el.href, item.href, el.href)}
                                key={i}
                                href={el.href}
                            >
                                <span
                                    className="title sub-tree-node"
                                    title={el.title}
                                >
                                    {el.title}
                                </span>
                            </div>
                        ),
                        key: `${index} - ${i}`
                    }
                    tempItem.children.push(tempChildren)
                })
            }
            return tempItem;
        })
        return treeData;
    }

      render(){
        return (
            <div className={styles.customAnchor}>
            <Tree.DirectoryTree
                defaultExpandAll
                showIcon={false}
                treeData={this.getTreeData()}
                />
            </div>
        );
    }

}
export default CustomAnchor;