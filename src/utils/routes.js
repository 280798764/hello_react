import {fixedRouters, generateMenu} from 'routers/routersChanged'
import {GetLocalStorage} from 'utils';
import feRouters from 'routers/routers'

export const generateMenus = menuId => {
    const allMenus = GetLocalStorage('allMenus') || [];
    const routers = [...fixedRouters, ...generateMenu(allMenus)]
    const menuIdMap = menuId.reduce((acc, cur)=> {
        acc[cur] = true;
        return acc;
    }, {})
    const checkValid = route => route.name && menuIdMap[route.permission]

    const dfs = (routes, level) => {
        if(!routes || routes.length === 0) return null;
        if(level === 2){
            return routes.filter(checkValid).map(it=>({...it}))
        }
        const arr = [];
        routes.forEach(item => {
            const child = item.children || item.routes;
            const leaves = dfs(child, level + 1)
            if((level === 0 && item.isIndex)|| (leaves && leaves.length)){
                const {httpTarget, disable, name, permission, path} = item;
                arr.push({
                    httpTarget,
                    disable,
                    name,
                    permission,
                    path,
                    child: leaves
                })
            }
        })
        return arr;
    }
    return dfs(routers, 0) || []
}

export const generateRoutes = menuId => {
    const allMenus = GetLocalStorage('allMenus') || []
    const routers = [...feRouters, ...generateMenu(allMenus)]
    const menuIdMap = menuId.reduce((acc, cur) => {
        acc[cur] = true;
        return acc;
    }, {})
    const checkValid = route => {
        if(!route.path) return false;
        if(!route.permission) return true;
        return menuIdMap[route.permission]
    }
    const dfs = (routes, prevBreads) => {
        if(!routes || routes.length === 0) return []
        let res = []
        routes.forEach(item => {
            const breads = [...prevBreads, item.name]
            if(checkValid(item)){
                res.push({
                    ...item,
                    breads
                })
            }
            const child = item.children || item.routes;
            if(child){
                res = res.concat(dfs(child, breads))
            }
        })

        return res;
    }

    return dfs(routers, [])
}