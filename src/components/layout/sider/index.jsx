import React from "react";
import classNames  from "classnames";
import  Icon, { RightOutlined, LeftOutlined } from '@ant-design/icons'
import ctx from '../context';

 const { Consumer } = ctx;

 export class Sider extends React.PureComponent{
     render() {
        const {style = {}, children, specialChildrenStyle} = this.props;
    return(
            <Consumer>
                {context=> (
                    <div
                        className={classNames('sider', context.siderVisible ? 'siderVisible' : 'siderHidden')}
                        style={{
                            ...style,
                            width: context.siderWidth
                        }}
                    >
                            <div className="siderChildren" style={specialChildrenStyle ? {overflowY: 'hidden', display: 'flex', flexDirection: 'column'}: null}>{children}</div>
                            <div className="siderFlexBtn" onClick={() => context.setSiderVisible(!context.siderVisible)}>
                                {context.siderVisible ? <LeftOutlined/> : <RightOutlined/>}
                            </div>

                    </div>
                )

                }
            </Consumer>
    )
     }
 }