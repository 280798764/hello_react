 const meunData = [
  {
    disable: undefined,
    httpTarget:undefined,
    name:'股票投研',
    path: '/stockInvestmentResearch',
    permissions: 'M800',
    child: [
        {
            disable: undefined,
            httpTarget:undefined,
            name:'股票评级',
            path: 'rating',
            permissions: 'M810',
            child: [
                {
                    name:'股票评级',
                }
            ]  
        },
        {
            disable: undefined,
            httpTarget:undefined,
            name:'行业评级',
            path: 'rating',
            permissions: 'M820',
            child: [
                {
                    name:'股票评级',
                }
            ]  
        },
        {
            disable: undefined,
            httpTarget:undefined,
            name:'盈利预算',
            path: 'rating',
            permissions: 'M830',
            child: [
                {
                    name:'股票评级',
                }
            ]  
        }
    ]
  }
]

export default meunData