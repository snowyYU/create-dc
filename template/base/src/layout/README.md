## meta

> meta 中的 outsideLink 和 iframeLink 说明

### 嵌套 iframeLink

### 打开外链 outsideLink

```typescript
outsideLink: 'www.baidu.com',
outsideLink: `${window.location.origin}/aies-screen/?token=${getTokenByURL()}#/`,

```

### isModule

> 此选项仅适用于导航栏菜单的显示，如果需要在导航栏显示一级菜单，需设置相应路由数据中 meta 的 isModule 属性为 true

### hidden

> 会隐藏菜单，优先级 > isModule

### withoutNav

用来控制导航显隐，可以写在两个地方

- 路由中，比如 `localhost:9000/withoutNav/dashboard/index`
- 路由 meta 中

> 此属性在 meta 中会在所有树子节点生效

### alwaysShow

考虑到布局组建的组合问题，路由树必须有完整层级，渲染过程中会检查各自的 children 属性，如数组中只有一个成员，只会渲染成单层级菜单（不会有展开功能，文字取 children 中成员 meta.title）
不过有时需要显示层级关系，所以有个此属性

### activeMenu

> 值为一个类似路由字符串的结构，如

```javascript
meta: {
  activeMenu: "/home";
}
```

效果为点击一个菜单，会激活此字段值对应的路由
