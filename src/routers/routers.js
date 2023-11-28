  
  
  // isIndex 首页导航
  // name 路由名字（菜单没名字不渲染）
  // permission 权限字段
  // httpTarget  是否是网址跳转
  // path 跳转地址（多级地址最好拼接父级跳转地址）
// exact 是否完全匹配地址，default true, if true auto log pv
// component  引用的页面
//disable 手、是否禁止
// forceRender 强制渲染路由

  
  export const home = {
    name: '首页',
    permission: 'M000',
    path: '/',
    forceRender: true,
    component: () => import('containers/home')
  }


  export const stock = {
    name: '股票投研',
    isIndex: true,
    permission: 'M800',
    path: '/stockInvestmentResearch',
    children: [{
      name: '股票评级',
      permission: 'M810',
      routes: [
        {
          name: '股票评级推荐',
          permission: 'M811',
          path: '/stockInvestmentResearch/stockRating',
          component: () => import('containers/stockInvestmentResearch/stockRating')
        },
        {
          name: '股票评级统计',
          isIndex: true,
          permission: 'M812',
          path: '/stockInvestmentResearch/ratingStatistics',
          component: () => import('containers/stockInvestmentResearch/ratingStatistics')
        }
      ]
    },
    {
      name: '行业评级',
      permission: 'M810',
      routes: [
        {
          name: '行业评级推荐',
          permission: 'M821',
          path: '/stockInvestmentResearch/industryRating',
          component: () => import('containers/stockInvestmentResearch/industryRating')
        },
        {
          name: '行业评级统计',
          isIndex: true,
          permission: 'M822',
          path: '/stockInvestmentResearch/industryStatistics',
          component: () => import('containers/stockInvestmentResearch/industryStatistics')
        }
      ]
    }, {
      name: '盈利预测',
      permission: 'M830',
      routes: [
        {
          name: '个股盈利预测',
          permission: 'M831',
          path: '/stockInvestmentResearch/stockProfit',
          component: () => import('containers/stockInvestmentResearch/stockProfit')
        }
      ]
    }]

  }


  
  export const echarts = {
    name: 'echarts',
    permission: 'M000',
    path: '/',
    forceRender: true,
    component: () => import('containers/home'),
    children: [
      {
        name: '股票评级',
        permission: 'M810',
        routes: [
          {
            name: '股票评级推荐',
            permission: 'M811',
            path: '/stockInvestmentResearch/stockRating',
            component: () => import('containers/stockInvestmentResearch/stockRating')
          },
          {
            name: '股票评级统计',
            isIndex: true,
            permission: 'M812',
            path: '/stockInvestmentResearch/ratingStatistics',
            component: () => import('containers/stockInvestmentResearch/ratingStatistics')
          }
        ]
      }

    ]
  }

  export const table = {
    name: 'table',
    permission: 'M000',
    path: '/',
    forceRender: true,
    component: () => import('containers/home'),
    children: [
      {
        name: '股票评级',
        permission: 'M810',
        routes: [
          {
            name: '股票评级推荐',
            permission: 'M811',
            path: '/stockInvestmentResearch/stockRating',
            component: () => import('containers/stockInvestmentResearch/stockRating')
          },
          {
            name: '股票评级统计',
            isIndex: true,
            permission: 'M812',
            path: '/stockInvestmentResearch/ratingStatistics',
            component: () => import('containers/stockInvestmentResearch/ratingStatistics')
          }
        ]
      }

    ]
  }



  const routers = [
    home,
    stock,
    echarts,
    table
  ]

  export default routers;
