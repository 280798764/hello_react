import { getAll } from 'good-storage'

export const initMenu = [
    {
        name: '股票评级',
        isIndex: true,
        permission: 'M800',
        path: '/stockInvestmentResearch'
    },
    {
        name: '股票评级',
        permission: 'M810',
        path: 'rating'
    },{
        name: '股票评级统计',
        permission: 'M811',
        path: '/stockInvestmentResearch/stockRating',
        component: () => import('containers/stockInvestmentResearch/stockRating')
    },
    {
        name: '股票评级统计',
        permission: 'M812',
        path: '/stockInvestmentResearch/ratingStatistics',
        component: () => import('containers/stockInvestmentResearch/ratingStatistics')
      },
      {
        name: '行业评级',
        isIndex: true,
        permission: 'M820',
        path: 'rating'
    },
      {
        name: '行业评级推荐',
        permission: 'M821',
        path: '/stockInvestmentResearch/industryRating',
        component: () => import('containers/stockInvestmentResearch/industryRating')
      },
      {
        name: '行业评级统计',
        permission: 'M822',
        path: '/stockInvestmentResearch/industryStatistics',
        component: () => import('containers/stockInvestmentResearch/industryStatistics')
      },
      {
        name: '个股盈利预测',
        permission: 'M831',
        path: '/stockInvestmentResearch/stockProfit',
        component: () => import('containers/stockInvestmentResearch/stockProfit')
      }
]

export const generateMenu = allMenus => {
    const loop = (data) => {
        const arr = []
        data.forEach(ele => {
            let obj = initMenu.find(item => item.permission === ele.showId)
            if(typeof (obj) === 'undefined'){
                obj = {
                    name: ele.menuTitle,
                    permission: ele.showId,
                    path: `/page${ele.showId}`
                }
                if(ele.menuGrade === 3 || (ele.menuGrade ===1 && !ele.children)){
                    obj.component = () => import('containers/home')
                }
            }
            if(ele.domId && ele.menuGrade ===1){
            }
            if(ele.children && ele.children.length>0 && ele.menuGrade ===1){
                obj.children = loop(ele.children)
            }
            if(ele.children && ele.children.length>0 && ele.menuGrade ===2){
                obj.routes = loop(ele.children)
            }
            arr.push({
                ...obj,
                name: ele.menuTitle
            })
        })
        return arr;
    }
    const menuArr = loop(allMenus)
    return menuArr;
}


export const login = {
    name: '登录',
    path: '/login',
    component: () => import('containers/login')
}

export const home = {
    name: '首页',
    permission: 'M000',
    path: '/',
    exact: false,
    component: () => import('containers/home')
}

export const fixedRouters=[
    login,
    home
]