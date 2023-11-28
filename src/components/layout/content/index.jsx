import React from "react";
import ctx from '../context';

const { Consumer } = ctx;
export const Content= props => (
    <Consumer>
        {context => (
                <div
                    className="layoutContent"
                    id='layoutContent'
                    style ={{
                        ...(props.style || {}),
                        width: `calc(100% - ${context.siderWidth + 9}px)`
                    }}
                >
                    {props.children}
                </div>
            )}
    </Consumer>
)