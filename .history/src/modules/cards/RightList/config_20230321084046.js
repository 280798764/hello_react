import React from "react";
import BaseSearch from "./component/option";

const name = '列表';
const cardModule = 'cards';
const cardType = 'RightList';

export default {
    name,
    cardModule,
    cardType,
    // isSingleFormPage: true,
    hideHeader: false,
    renderCustom: props => <BaseSearch {...props} />,
    filters: {
        visible: false
    }
}