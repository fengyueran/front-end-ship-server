---
sidebar_position: 1
sidebar_label: 前端项目目录结构规范
---

# 前端项目目录结构规范

本规范基于业内最新实践，旨在建立清晰、可扩展、易维护的前端项目目录结构。

## 1. 命名规范

### 1.1 统一命名原则

**推荐统一使用 kebab-case：**

- **所有文件夹**：统一使用 kebab-case，如 `auto-complete/`、`user-management/`、`api-client/`
- **所有文件**：统一使用 kebab-case，如 `auto-complete.tsx`、`user-profile.tsx`
- **组件类名**：使用 PascalCase，如 `AutoComplete`、`UserProfile`
- **目录命名规则**：
  - **文件容器目录**：包含多个同类文件时使用复数，如 `components/`、`pages/`、`hooks/`
  - **功能性目录**：表示功能领域或概念时使用单数，如 `model/`、`api/`、`ui/`、`lib/`
  - **约定优先**：遵循行业标准，而非严格的语法规则
- **语义化**：名称应清晰表达文件/文件夹的用途

**为什么选择统一的 kebab-case？**

- **简单一致**：只需要记住一种规则
- **跨平台兼容**：避免大小写敏感问题
- **URL 友好**：文件夹路径可能映射到 URL
- **工具链友好**：构建工具、脚本更好支持
- **降低认知负担**：团队成员无需记忆复杂规则

### 1.2 特殊文件规则

#### 1.2.1 index.ts（Barrel 文件）

- **主要用途**：重新导出模块，创建统一的导出入口
- **最佳实践**：保持简单，只做导出，避免副作用

```typescript
// 推荐：简单的重新导出
export { Button } from "./button";
export { Input } from "./input";
export type { ButtonProps } from "./button";

// 谨慎：有条件的导出（可能影响tree-shaking）
export { Button } from "./button";
export { Input } from process.env.NODE_ENV === "development" ? "./input-dev" : "./input";

// 避免：包含业务逻辑
const theme = getTheme();
export { Button } from theme === "dark" ? "./button-dark" : "./button-light";
```

#### 1.2.2 其他特殊文件

- **测试文件**：
  - **推荐**：`*.test.tsx` 或 `*.spec.tsx`（工具链兼容性更好）
  - **可选**：`*-test.tsx` 或 `*-spec.tsx`（与命名规范更一致）
- **类型文件**：`*.types.ts` 或 `types.ts`
- **常量文件**：`constants.ts` 或 `*.constants.ts`
- **配置文件**：`config.ts` 或 `*.config.ts`

### 1.3 组件类型命名约定

- **UI 组件**：描述性名称（如 `PrimaryButton`, `SearchInput`）
- **页面组件**：组件类名以 Page 结尾（如 `HomePage`, `ProfilePage`），文件夹直接使用功能名称（如 `home/`, `profile/`）
- **布局组件**：以 Layout 结尾（如 `AppLayout`, `AuthLayout`）
- **功能组件**：描述功能（如 `UserProfile`, `ProductCard`）
- **高阶组件**：以 with 开头（如 `withAuth`, `withLoading`）
- **Hook 函数**：以 use 开头（如 `useAuth`, `useLocalStorage`）

### 1.4 代码格式化规范（Prettier）

为保证团队代码风格统一，建议全项目使用 [Prettier](https://prettier.io/) 作为代码格式化工具。

- **强制格式化**：所有提交的代码必须经过 Prettier 格式化。
- **自动化集成**：推荐在项目根目录添加 `.prettierrc` 配置文件，并在 `package.json` 中配置 `format` 脚本：

  ```json
  // package.json
  "scripts": {
    "format": "prettier --write ."
  }
  ```

- **常用 Prettier 配置示例**：

  ```json
  // .prettierrc
  {
    "singleQuote": true, // 使用单引号
    "semi": false, // 语句末尾不加分号
    "trailingComma": "all", // 多行时尽可能使用尾随逗号
    "printWidth": 100, // 每行最大长度 100
    "tabWidth": 2, // 缩进为 2 个空格
    "endOfLine": "lf" // 换行符统一为 LF
  }
  ```

- **编辑器集成**：建议在 VSCode 等编辑器中安装 Prettier 插件，启用“保存时自动格式化”。
- **CI 检查**：可选，在 CI 流程中增加 Prettier 检查，防止未格式化代码合入主干。

> 统一的代码风格有助于提升团队协作效率，减少无意义的代码 review。

## 2. 核心设计原则

### 2.1 基本原则

- **关注点分离**：将逻辑、UI 和数据管理分开，提高可读性和可维护性
- **模块化设计**：将应用拆分为小的、可复用的组件，可独立开发和测试
- **DRY 原则**：避免代码重复，将通用功能抽象为可复用模块
- **KISS 原则**：保持简单，复杂的解决方案往往导致更多的 bug 和维护问题
- **功能优先**：按功能而非技术类型组织代码，便于理解和维护

### 2.2 扩展性考虑

- **按功能分组**：相关的组件、hooks、工具函数放在一起
- **就近原则**：组件相关的样式、测试、资源文件放在同一目录
- **删除友好**：删除功能时，删除对应文件夹即可移除所有相关文件

## 3. 业内标准目录结构

### 3.1 传统结构（不推荐）

传统的按技术类型组织的目录结构：

```text
project-name/
├── public/                     # 静态资源
├── src/
│   ├── components/             # 通用可复用组件
│   ├── pages/                  # 页面组件
│   ├── hooks/                  # 全局自定义hooks
│   ├── services/               # API服务和业务逻辑
│   ├── utils/                  # 工具函数
│   ├── store/                  # 状态管理
│   ├── constants/              # 常量定义
│   ├── types/                  # TypeScript类型定义
│   ├── assets/                 # 静态资源
│   └── styles/                 # 全局样式
├── package.json
├── tsconfig.json
└── vite.config.ts
```

**传统结构的问题：**

- 按技术类型分组，不利于业务理解
- 功能相关的文件分散在不同目录
- 删除功能时需要在多个目录中查找文件
- 不利于大型项目的维护

### 3.2 推荐的业内标准结构

本规范融合了业内最佳实践，包括 Feature-Sliced Design (FSD) 等现代架构理念：

```text
src/
├── app/                     # 应用层：全局配置和初始化
│   ├── providers/           # 全局提供者（React Context、状态管理等）
│   ├── styles/              # 全局样式和主题
│   ├── config/              # 应用配置
│   ├── index.ts             # 导入导出
│   └── app.tsx              # 应用入口组件
├── pages/                   # 页面层：路由级页面组件
│   ├── home/
│   │   ├── index.ts
│   │   ├── home.tsx
│   │   ├── home.module.css
│   │   └── ui/              # 页面专用组件
│   ├── about/
│   └── not-found/
├── widgets/                 # 组件层：复合业务组件
│   ├── header/              # 页头组件
│   ├── sidebar/             # 侧边栏组件
│   ├── product-list/        # 产品列表组件
│   └── user-profile-card/   # 用户资料卡片
├── features/                # 功能层：用户功能和业务价值
│   ├── auth/                # 认证功能
│   │   ├── ui/              # 功能相关UI组件
│   │   ├── model/           # 业务逻辑和状态管理
│   │   ├── api/             # API请求
│   │   ├── lib/             # 功能工具函数
│   │   └── index.ts         # 公共API导出
│   ├── product-search/      # 产品搜索功能
│   ├── shopping-cart/       # 购物车功能
│   └── user-settings/       # 用户设置功能
├── entities/                # 实体层：业务实体
│   ├── user/                # 用户实体
│   │   ├── ui/              # 用户相关UI组件
│   │   ├── model/           # 用户数据模型
│   │   ├── api/             # 用户API
│   │   └── index.ts
│   ├── product/             # 产品实体
│   ├── order/               # 订单实体
│   └── category/            # 分类实体
├── shared/                  # 共享层：可复用基础设施
│   ├── ui/                  # 基础UI组件库
│   │   ├── button/
│   │   ├── input/
│   │   ├── modal/
│   │   └── index.ts
│   ├── lib/                 # 工具函数库
│   │   ├── utils/
│   │   ├── hooks/
│   │   ├── validators/
│   │   └── index.ts
│   ├── api/                 # 基础API配置
│   │   ├── base.ts
│   │   ├── types.ts
│   │   └── index.ts
│   ├── config/              # 基础配置
│   ├── constants/           # 全局常量
│   └── types/               # 全局类型定义
├── assets/                  # 静态资源
│   ├── images/
│   ├── icons/
│   ├── fonts/
│   └── videos/
└── styles/                  # 样式资源
    ├── globals.css
    ├── variables.css
    └── themes/
```

**架构层级规则：**

- **依赖方向**：上层可以使用下层，下层不能使用上层
- **同层隔离**：同一层级的模块不能直接相互依赖
- **公共 API**：每个模块通过 index.ts 暴露公共接口

**依赖示例说明：**

```typescript
// 正确：pages 层使用 widgets 层
// pages/home/index.tsx
import { ProductList } from "@/widgets/product-list";
import { Header } from "@/widgets/header";

// 正确：features 层使用 entities 层和 shared 层
// features/shopping-cart/ui/cart-item.tsx
import { Product } from "@/entities/product";
import { Button } from "@/shared/ui";

// 正确：entities 层使用 shared 层
// entities/user/api/user-api.ts
import { httpClient } from "@/shared/api";

// 错误：下层不能使用上层
// shared/ui/button.tsx
import { useAuth } from "@/features/auth"; // 错误！shared 不能使用 features

// 错误：同层不能直接相互依赖
// features/auth/model/auth-store.ts
import { cartStore } from "@/features/shopping-cart"; // 错误！同层直接依赖

// 正确：同层通过共享层通信
// features/auth/model/auth-store.ts
import { eventBus } from "@/shared/lib/event-bus";
eventBus.emit("user-logged-in", userData);

// features/shopping-cart/model/cart-store.ts
import { eventBus } from "@/shared/lib/event-bus";
eventBus.on("user-logged-in", handleUserLogin);
```

**分层依赖关系图：**

```text
┌─────────────┐
│    app/     │ ← 最上层：应用入口，可以使用所有下层
└─────────────┘
       ↓
┌─────────────┐
│   pages/    │ ← 第二层：页面层，可以使用下面4层
└─────────────┘
       ↓
┌─────────────┐
│  widgets/   │ ← 第三层：组件层，可以使用下面3层
└─────────────┘
       ↓
┌─────────────┐
│ features/   │ ← 第四层：功能层，可以使用下面2层
└─────────────┘
       ↓
┌─────────────┐
│ entities/   │ ← 第五层：实体层，只能使用最下层
└─────────────┘
       ↓
┌─────────────┐
│  shared/    │ ← 最下层：共享层，不依赖任何上层
└─────────────┘
```

## 4. 各层级详细说明

> 以下将通过一个完整的**Product 列表功能**实例，展示如何在 Feature-Sliced Design 架构中实现产品列表的展现、搜索、操作等功能，并使用 Redux 进行状态管理。

### 4.1 app/ - 应用层

应用的全局配置和初始化逻辑。以 Redux store 配置为例：

```text
app/
├── store/                      # Redux store配置
│   ├── index.ts                # store导出和hooks
│   ├── root-reducer.ts         # 根reducer组合
│   ├── store.ts                # store配置
│   └── types.ts                # store类型定义
├── providers/                  # 全局提供者
│   ├── theme-provider.tsx
│   ├── auth-provider.tsx
│   └── index.ts
├── styles/                     # 全局样式
│   ├── globals.css
│   ├── variables.css
│   └── themes/
├── config/                     # 应用配置
│   ├── env.ts
│   ├── routes.ts
│   └── constants.ts
├── index.ts                    # 导入导出
└── app.tsx                     # 应用入口组件
```

**Redux Store 配置实现：**

```typescript
// app/store/types.ts
import { store } from "./store";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// app/store/root-reducer.ts
import { combineReducers } from "@reduxjs/toolkit";
import productListReducer from "@/features/product-list/model/product-list.slice";
import shoppingCartReducer from "@/features/shopping-cart/model/shopping-cart.slice";
import userAuthReducer from "@/features/user-auth/model/user-auth.slice";

export const rootReducer = combineReducers({
  // Features层的状态管理
  productList: productListReducer,
  shoppingCart: shoppingCartReducer,
  userAuth: userAuthReducer,

  // 可以添加更多feature的reducer
  // productSearch: productSearchReducer,
  // userProfile: userProfileReducer,
});

// app/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./root-reducer";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
  devTools: process.env.NODE_ENV !== "production",
});

// app/store/index.ts
export { store } from "./store";
export type { RootState, AppDispatch } from "./types";

// 导出类型化的hooks
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "./types";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// app/app.tsx - 集成Redux的应用组件
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { store } from "./store";
import { ThemeProvider } from "./providers/theme-provider";
import { AuthProvider } from "./providers/auth-provider";
import { HomePage } from "@/pages/home";
import { ProductsPage } from "@/pages/products";
import { ProductPage } from "@/pages/product";
import { NotFoundPage } from "@/pages/not-found";

export interface AppProps {
  // 应用组件的 props 类型
}

export function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider>
          <AuthProvider>
            <div className="app">
              {/* 路由配置，使用pages层组件 */}
              <Routes>
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/product/:productId" element={<ProductPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </div>
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

// app/index.ts
export { default } from "./app";
export type { AppProps } from "./app";
export { store, useAppDispatch, useAppSelector } from "./store";
export type { RootState, AppDispatch } from "./store";
```

### 4.2 pages/ - 页面层

应用的页面级组件，对应路由，pages 层主要负责：

- **路由级组件**：对应具体的 URL 路径
- **布局组合**：组合多个 widgets 和 features

```text
pages/
├── product/                        # 产品页面
│   ├── index.ts                    # 导出product.tsx
│   ├── product.tsx                 # 实际的页面组件
│   ├── product.module.css          # 页面样式
│   └── ui/                         # 页面专用组件
│       ├── product-gallery.tsx     # 商品图片画廊
│       ├── product-info.tsx        # 商品信息区域
│       ├── product-reviews.tsx     # 商品评价区域
│       └── related-products.tsx    # 相关商品推荐
├── products/                       # 产品列表页面
│   ├── index.ts
│   ├── products.tsx                # 产品列表页面组件
│   └── products.module.css
└── not-found/                      # 404页面
    ├── index.ts
    ├── not-found.tsx
    └── not-found.module.css
```

### 4.3 widgets/ - 组件层

复合业务组件，组合多个 features 和 entities：

```text
widgets/
├── header/               # 页头组件
│   ├── ui/
│   ├── model/
│   └── index.ts
├── product-list/         # 产品列表组件
├── user-dashboard/       # 用户仪表板
└── shopping-cart-widget/ # 购物车组件
```

#### Widget 的设计原则

- **组合性**：组合多个 features 和 entities 形成复合组件
- **复用性**：可在不同页面中复用的业务组件
- **独立性**：拥有自己的状态管理和业务逻辑
- **配置性**：通过 props 支持不同的展示模式和行为

#### 完整实现示例：产品列表 Widget

**目录结构：**

```text
widgets/
├── product-list-widget/
│   ├── ui/
│   │   ├── product-list-widget.tsx    # 主组件
│   │   ├── product-grid.tsx           # 网格布局
│   │   ├── product-toolbar.tsx        # 工具栏组件
│   │   ├── product-empty-state.tsx    # 空状态组件
│   │   └── index.ts                   # ui导出
│   ├── model/
│   │   ├── widget.slice.ts            # widget状态管理
│   │   ├── widget.selectors.ts        # 选择器
│   │   └── index.ts                   # model导出
│   ├── lib/
│   │   ├── widget.utils.ts            # 工具函数
│   │   ├── widget.hooks.ts            # 自定义hooks
│   │   └── index.ts                   # lib导出
│   └── index.ts                       # widget公共接口
```

**主组件实现：**

```typescript
// widgets/product-list-widget/ui/product-list-widget.tsx
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { ProductList } from "@/features/product-list";
import { ProductCard } from "@/entities/product";
import { ProductGrid } from "./product-grid";
import { ProductToolbar } from "./product-toolbar";
import { ProductEmptyState } from "./product-empty-state";
import { widgetSelectors, widgetActions } from "../model";
import { useWidgetConfig } from "../lib";

export interface ProductListWidgetProps {
  // 配置选项
  title?: string;
  showToolbar?: boolean;
  showPagination?: boolean;
  pageSize?: number;

  // 布局选项
  layout?: "grid" | "list";
  columns?: number;

  // 筛选选项
  categoryId?: string;
  tags?: string[];

  // 事件回调
  onProductClick?: (productId: string) => void;
  onProductSelect?: (productIds: string[]) => void;
}

export const ProductListWidget: React.FC<ProductListWidgetProps> = ({
  title = "产品列表",
  showToolbar = true,
  showPagination = true,
  pageSize = 12,
  layout = "grid",
  columns = 4,
  categoryId,
  tags,
  onProductClick,
  onProductSelect,
}) => {
  const dispatch = useAppDispatch();

  // Widget 状态
  const widgetState = useAppSelector(widgetSelectors.selectWidgetState);
  const { viewMode, selectedProducts, isLoading } = widgetState;

  // 产品列表状态（来自 features/product-list）
  const products = useAppSelector((state) => state.productList.products);
  const loading = useAppSelector((state) => state.productList.loading);
  const total = useAppSelector((state) => state.productList.total);

  // Widget 配置
  const config = useWidgetConfig({
    layout,
    columns,
    pageSize,
    categoryId,
    tags,
  });

  // 初始化
  useEffect(() => {
    dispatch(widgetActions.initialize(config));
  }, [dispatch, config]);

  // 处理产品点击
  const handleProductClick = (productId: string) => {
    onProductClick?.(productId);
  };

  // 处理产品选择
  const handleProductSelect = (productId: string, selected: boolean) => {
    dispatch(widgetActions.toggleProductSelection({ productId, selected }));
    onProductSelect?.(selectedProducts);
  };

  // 处理视图模式切换
  const handleViewModeChange = (mode: "grid" | "list") => {
    dispatch(widgetActions.setViewMode(mode));
  };

  if (loading && products.length === 0) {
    return (
      <div className="product-list-widget">
        <div className="widget-header">
          <h2>{title}</h2>
        </div>
        <div className="widget-loading">
          <div className="loading-spinner" />
          <p>加载中...</p>
        </div>
      </div>
    );
  }

  if (!loading && products.length === 0) {
    return (
      <div className="product-list-widget">
        <div className="widget-header">
          <h2>{title}</h2>
        </div>
        <ProductEmptyState />
      </div>
    );
  }

  return (
    <div className="product-list-widget">
      <div className="widget-header">
        <h2>{title}</h2>
        <div className="widget-meta">
          <span>共 {total} 个产品</span>
        </div>
      </div>

      {showToolbar && (
        <ProductToolbar
          viewMode={viewMode}
          onViewModeChange={handleViewModeChange}
          selectedCount={selectedProducts.length}
          totalCount={products.length}
        />
      )}

      <ProductGrid
        products={products}
        layout={viewMode}
        columns={columns}
        onProductClick={handleProductClick}
        onProductSelect={handleProductSelect}
        selectedProducts={selectedProducts}
      />

      {showPagination && <ProductList.Pagination />}
    </div>
  );
};
```

**网格布局组件：**

```typescript
// widgets/product-list-widget/ui/product-grid.tsx
import React from "react";
import { Product } from "@/entities/product";
import { ProductCard } from "@/entities/product";

export interface ProductGridProps {
  products: Product[];
  layout: "grid" | "list";
  columns: number;
  selectedProducts: string[];
  onProductClick: (productId: string) => void;
  onProductSelect: (productId: string, selected: boolean) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  layout,
  columns,
  selectedProducts,
  onProductClick,
  onProductSelect,
}) => {
  const gridClassName =
    layout === "grid" ? `product-grid grid-cols-${columns}` : "product-list";

  return (
    <div className={`product-grid-container ${gridClassName}`}>
      {products.map((product) => (
        <div key={product.id} className="product-item">
          <ProductCard
            product={product}
            layout={layout}
            selected={selectedProducts.includes(product.id)}
            onClick={() => onProductClick(product.id)}
            onSelect={(selected) => onProductSelect(product.id, selected)}
            showSelection
            showQuickActions
          />
        </div>
      ))}
    </div>
  );
};
```

**工具栏组件：**

```typescript
// widgets/product-list-widget/ui/product-toolbar.tsx
import React from "react";
import { ProductList } from "@/features/product-list";

export interface ProductToolbarProps {
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
  selectedCount: number;
  totalCount: number;
}

export const ProductToolbar: React.FC<ProductToolbarProps> = ({
  viewMode,
  onViewModeChange,
  selectedCount,
  totalCount,
}) => {
  return (
    <div className="product-toolbar">
      <div className="toolbar-left">
        <ProductList.SearchBar placeholder="搜索产品..." />
        <ProductList.Filters />
      </div>

      <div className="toolbar-center">
        {selectedCount > 0 && (
          <div className="selection-info">
            已选择 {selectedCount} / {totalCount} 个产品
          </div>
        )}
      </div>

      <div className="toolbar-right">
        <ProductList.SortSelector />

        <div className="view-mode-toggle">
          <button
            className={`view-btn ${viewMode === "grid" ? "active" : ""}`}
            onClick={() => onViewModeChange("grid")}
            aria-label="网格视图"
          >
            <GridIcon />
          </button>
          <button
            className={`view-btn ${viewMode === "list" ? "active" : ""}`}
            onClick={() => onViewModeChange("list")}
            aria-label="列表视图"
          >
            <ListIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

const GridIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16">
    <rect x="1" y="1" width="6" height="6" rx="1" />
    <rect x="9" y="1" width="6" height="6" rx="1" />
    <rect x="1" y="9" width="6" height="6" rx="1" />
    <rect x="9" y="9" width="6" height="6" rx="1" />
  </svg>
);

const ListIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16">
    <rect x="1" y="2" width="14" height="2" rx="1" />
    <rect x="1" y="7" width="14" height="2" rx="1" />
    <rect x="1" y="12" width="14" height="2" rx="1" />
  </svg>
);
```

**Widget 状态管理：**

```typescript
// widgets/product-list-widget/model/widget.slice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface WidgetConfig {
  layout: "grid" | "list";
  columns: number;
  pageSize: number;
  categoryId?: string;
  tags?: string[];
}

export interface ProductListWidgetState {
  // Widget 配置
  config: WidgetConfig;

  // UI 状态
  viewMode: "grid" | "list";
  selectedProducts: string[];

  // 加载状态
  isLoading: boolean;
  isInitialized: boolean;
}

const initialState: ProductListWidgetState = {
  config: {
    layout: "grid",
    columns: 4,
    pageSize: 12,
  },
  viewMode: "grid",
  selectedProducts: [],
  isLoading: false,
  isInitialized: false,
};

const productListWidgetSlice = createSlice({
  name: "productListWidget",
  initialState,
  reducers: {
    initialize: (state, action: PayloadAction<WidgetConfig>) => {
      state.config = action.payload;
      state.viewMode = action.payload.layout;
      state.isInitialized = true;
    },

    setViewMode: (state, action: PayloadAction<"grid" | "list">) => {
      state.viewMode = action.payload;
    },

    toggleProductSelection: (
      state,
      action: PayloadAction<{ productId: string; selected: boolean }>
    ) => {
      const { productId, selected } = action.payload;
      if (selected) {
        if (!state.selectedProducts.includes(productId)) {
          state.selectedProducts.push(productId);
        }
      } else {
        state.selectedProducts = state.selectedProducts.filter(
          (id) => id !== productId
        );
      }
    },

    clearSelection: (state) => {
      state.selectedProducts = [];
    },

    selectAll: (state, action: PayloadAction<string[]>) => {
      state.selectedProducts = action.payload;
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const widgetActions = productListWidgetSlice.actions;
export const productListWidgetReducer = productListWidgetSlice.reducer;
```

**选择器：**

```typescript
// widgets/product-list-widget/model/widget.selectors.ts
import { RootState } from "@/app/store";
import { createSelector } from "@reduxjs/toolkit";

const selectWidgetState = (state: RootState) => state.productListWidget;

const selectConfig = createSelector(
  [selectWidgetState],
  (widget) => widget.config
);

const selectViewMode = createSelector(
  [selectWidgetState],
  (widget) => widget.viewMode
);

const selectSelectedProducts = createSelector(
  [selectWidgetState],
  (widget) => widget.selectedProducts
);

const selectIsLoading = createSelector(
  [selectWidgetState],
  (widget) => widget.isLoading
);

const selectIsInitialized = createSelector(
  [selectWidgetState],
  (widget) => widget.isInitialized
);

const selectSelectedCount = createSelector(
  [selectSelectedProducts],
  (selectedProducts) => selectedProducts.length
);

export const widgetSelectors = {
  selectWidgetState,
  selectConfig,
  selectViewMode,
  selectSelectedProducts,
  selectIsLoading,
  selectIsInitialized,
  selectSelectedCount,
};
```

**自定义 Hooks：**

```typescript
// widgets/product-list-widget/lib/widget.hooks.ts
import { useMemo } from "react";
import { WidgetConfig } from "../model";

export const useWidgetConfig = (props: Partial<WidgetConfig>): WidgetConfig => {
  return useMemo(
    () => ({
      layout: props.layout || "grid",
      columns: props.columns || 4,
      pageSize: props.pageSize || 12,
      categoryId: props.categoryId,
      tags: props.tags,
    }),
    [props]
  );
};

export const useProductSelection = () => {
  // 产品选择相关的逻辑
  // ...
};

export const useWidgetLayout = (layout: "grid" | "list", columns: number) => {
  return useMemo(() => {
    if (layout === "list") {
      return {
        className: "product-list-layout",
        style: {},
      };
    }

    return {
      className: "product-grid-layout",
      style: {
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
      },
    };
  }, [layout, columns]);
};
```

**Widget 导出：**

```typescript
// widgets/product-list-widget/index.ts
export { ProductListWidget } from "./ui";
export { widgetActions, widgetSelectors } from "./model";
export { useWidgetConfig, useProductSelection, useWidgetLayout } from "./lib";
export type { ProductListWidgetProps } from "./ui/product-list-widget";
export type { WidgetConfig, ProductListWidgetState } from "./model";
```

#### Widget 层的核心特点

1. **组合多个 Features**：将 `ProductList`、`ProductSearch` 等功能组合成完整的业务组件
2. **独立状态管理**：拥有自己的 Redux slice 管理 Widget 特有的状态
3. **高度可配置**：通过 props 支持不同的展示模式和行为定制
4. **复用性强**：可以在不同页面中复用，如首页推荐、分类页面、搜索结果页等
5. **业务完整性**：包含完整的用户交互流程和业务逻辑

### 4.4 features/ - 功能层

用户功能和业务价值的实现：

```text
features/
├── auth/                       # 认证功能
│   ├── ui/                     # 登录表单、注册表单等
│   ├── model/                  # 认证状态管理
│   ├── api/                    # 认证API
│   ├── lib/                    # 认证工具函数
│   └── index.ts                # 公共API
├── product-search/             # 产品搜索功能
├── shopping-cart/              # 购物车功能
└── user-settings/              # 用户设置功能
```

#### Feature 的定义原则

- **什么是 Feature？**

  - **用户价值导向**：能为用户提供具体价值的功能单元
  - **业务完整性**：包含完整的业务流程，从用户交互到数据处理
  - **独立性**：可以独立开发、测试、部署的功能模块

- **Feature 划分标准：**

  **按用户故事划分**：

  ```text
  好的划分：
  - auth/           # "用户可以登录/注册"
  - product-search/ # "用户可以搜索商品"
  - shopping-cart/  # "用户可以管理购物车"
  - order-checkout/ # "用户可以下单结账"

  错误划分：
  - forms/          # 太技术化，不是用户功能
  - buttons/        # 太细粒度，不是完整功能
  - api-calls/      # 技术实现，不是用户价值
  ```

  **按业务边界划分**：

  ```text
  电商项目示例：
  features/
  ├── user-auth/           # 用户认证相关
  ├── product-catalog/     # 商品浏览相关
  ├── shopping-cart/       # 购物车相关
  ├── order-management/    # 订单管理相关
  ├── payment-processing/  # 支付处理相关
  ├── user-profile/        # 用户资料相关
  └── review-rating/       # 评价评分相关
  ```

  **按功能完整性划分**：
  每个 feature 应该包含：

  ```text
  feature-name/
  ├── ui/                         # 用户界面组件
  ├── model/                      # 业务逻辑和状态
  ├── api/                        # 数据获取和提交
  ├── lib/                        # 功能相关工具
  └── index.ts                    # 对外接口
  ```

- **Feature 划分的实际例子：购物平台**

  ```text
  features/
  ├── user-auth/          # 用户登录注册
  ├── product-search/     # 商品搜索
  ├── shopping-cart/      # 购物车
  └── order-checkout/     # 订单结账
  ```

- **具体实现示例：**

  ```typescript
  // features/product-search/
  export const ProductSearch = {
    SearchBar: () => <SearchInput />,
    SearchResults: () => <ProductList />,

    useProductSearch: () => {
      /* 搜索逻辑 */
    },
    searchProducts: (query: string) => {
      /* 搜索API */
    },
  };

  // features/shopping-cart/
  export const ShoppingCart = {
    CartIcon: () => <CartButton />,
    CartDrawer: () => <CartSidebar />,

    useCart: () => {
      /* 购物车状态 */
    },
    addToCart: (productId: string) => {
      /* 添加商品 */
    },
  };
  ```

#### 产品列表功能完整实现

以产品列表功能为例，展示完整的 features 层实现：

```text
features/
├── product-list/               # 产品列表功能
│   ├── ui/                     # UI组件
│   │   ├── product-list.tsx           # 产品列表主组件
│   │   ├── product-filters.tsx        # 产品筛选器
│   │   ├── product-search-bar.tsx     # 搜索栏
│   │   ├── product-sort-selector.tsx  # 排序选择器
│   │   ├── product-pagination.tsx     # 分页组件
│   │   └── index.ts                   # ui导出
│   ├── model/                  # 状态管理
│   │   ├── product-list.slice.ts      # Redux slice
│   │   ├── product-list.selectors.ts  # 选择器
│   │   ├── product-list.thunks.ts     # 异步操作
│   │   └── index.ts                   # model导出
│   ├── api/                    # API层
│   │   ├── product-list.api.ts        # API实现
│   │   └── index.ts                   # api导出
│   ├── lib/                    # 工具函数
│   │   ├── product-list.utils.ts      # 工具函数
│   │   ├── product-list.hooks.ts      # 自定义hooks
│   │   └── index.ts                   # lib导出
│   └── index.ts                # 功能公共接口
```

**Redux 状态管理实现：**

````typescript
// features/product-list/model/product-list.slice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product, ProductFilter, ProductSort } from "@/entities/product";
import {
  fetchProductsThunk,
  searchProductsThunk,
  loadMoreProductsThunk,
} from "./product-list.thunks";

export interface ProductListState {
  // 产品数据
  products: Product[];
  total: number;

  // 分页状态
  currentPage: number;
  pageSize: number;
  totalPages: number;
  hasMore: boolean;

  // 搜索和筛选
  searchQuery: string;
  filters: ProductFilter;
  sort: ProductSort;

  // 加载状态
  loading: boolean;
  loadingMore: boolean;
  error: string | null;

  // UI状态
  viewMode: "grid" | "list";
  selectedProducts: string[];
}

const initialState: ProductListState = {
  products: [],
  total: 0,
  currentPage: 1,
  pageSize: 20,
  totalPages: 0,
  hasMore: false,
  searchQuery: "",
  filters: {},
  sort: { field: "createdAt", order: "desc" },
  loading: false,
  loadingMore: false,
  error: null,
  viewMode: "grid",
  selectedProducts: [],
};

export const productListSlice = createSlice({
  name: "productList",
  initialState,
  reducers: {
    // 设置搜索查询
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.currentPage = 1; // 重置页码
    },

    // 设置筛选条件
    setFilters: (state, action: PayloadAction<Partial<ProductFilter>>) => {
      state.filters = { ...state.filters, ...action.payload };
      state.currentPage = 1;
    },

    // 清除筛选条件
    clearFilters: (state) => {
      state.filters = {};
      state.currentPage = 1;
    },

    // 设置排序
    setSort: (state, action: PayloadAction<ProductSort>) => {
      state.sort = action.payload;
      state.currentPage = 1;
    },

    // 设置视图模式
    setViewMode: (state, action: PayloadAction<"grid" | "list">) => {
      state.viewMode = action.payload;
    },

    // 选择产品
    toggleProductSelection: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      const index = state.selectedProducts.indexOf(productId);
      if (index > -1) {
        state.selectedProducts.splice(index, 1);
      } else {
        state.selectedProducts.push(productId);
      }
    },

    // 清除选择
    clearSelection: (state) => {
      state.selectedProducts = [];
    },

    // 重置状态
    resetState: () => initialState,
  },

  extraReducers: (builder) => {
    // 获取产品列表
    builder
      .addCase(fetchProductsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.total = action.payload.total;
        state.currentPage = action.payload.page;
        state.totalPages = action.payload.totalPages;
        state.hasMore = action.payload.page < action.payload.totalPages;
      })
      .addCase(fetchProductsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "获取产品列表失败";
      })

      // 搜索产品
      .addCase(searchProductsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchProductsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.total = action.payload.total;
        state.currentPage = action.payload.page;
        state.totalPages = action.payload.totalPages;
        state.hasMore = action.payload.page < action.payload.totalPages;
      })
      .addCase(searchProductsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "搜索产品失败";
      })

      // 加载更多产品
      .addCase(loadMoreProductsThunk.pending, (state) => {
        state.loadingMore = true;
      })
      .addCase(loadMoreProductsThunk.fulfilled, (state, action) => {
        state.loadingMore = false;
        state.products.push(...action.payload.products);
        state.currentPage = action.payload.page;
        state.hasMore = action.payload.page < action.payload.totalPages;
      })
      .addCase(loadMoreProductsThunk.rejected, (state, action) => {
        state.loadingMore = false;
        state.error = action.error.message || "加载更多产品失败";
      });
  },
});

export const {
  setSearchQuery,
  setFilters,
  clearFilters,
  setSort,
  setViewMode,
  toggleProductSelection,
  clearSelection,
  resetState,
} = productListSlice.actions;

export default productListSlice.reducer;

// features/product-list/model/product-list.thunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ProductAPI, ProductListParams } from "@/entities/product";
import { RootState } from "@/app/store";

// 获取产品列表
export const fetchProductsThunk = createAsyncThunk(
  "productList/fetchProducts",
  async (params: Partial<ProductListParams> = {}, { getState }) => {
    const state = getState() as RootState;
    const { searchQuery, filters, sort, currentPage, pageSize } =
      state.productList;

    const requestParams: ProductListParams = {
      page: currentPage,
      limit: pageSize,
      search: searchQuery || undefined,
      filter: Object.keys(filters).length > 0 ? filters : undefined,
      sort,
      ...params,
    };

    return await ProductAPI.getProducts(requestParams);
  }
);

// 搜索产品
export const searchProductsThunk = createAsyncThunk(
  "productList/searchProducts",
  async (query: string, { getState }) => {
    const state = getState() as RootState;
    const { filters, sort, pageSize } = state.productList;

    const params: ProductListParams = {
      page: 1,
      limit: pageSize,
      search: query,
      filter: Object.keys(filters).length > 0 ? filters : undefined,
      sort,
    };

    return await ProductAPI.getProducts(params);
  }
);

// 加载更多产品
export const loadMoreProductsThunk = createAsyncThunk(
  "productList/loadMoreProducts",
  async (_, { getState }) => {
    const state = getState() as RootState;
    const { searchQuery, filters, sort, currentPage, pageSize } =
      state.productList;

    const params: ProductListParams = {
      page: currentPage + 1,
      limit: pageSize,
      search: searchQuery || undefined,
      filter: Object.keys(filters).length > 0 ? filters : undefined,
      sort,
    };

    return await ProductAPI.getProducts(params);
  }
);

// features/product-list/model/product-list.selectors.ts
import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/app/store";

// 基础选择器
export const selectProductListState = (state: RootState) => state.productList;

// 产品数据选择器
export const selectProducts = createSelector(
  [selectProductListState],
  (state) => state.products
);

export const selectProductsTotal = createSelector(
  [selectProductListState],
  (state) => state.total
);

// 分页选择器
export const selectPagination = createSelector(
  [selectProductListState],
  (state) => ({
    currentPage: state.currentPage,
    pageSize: state.pageSize,
    totalPages: state.totalPages,
    hasMore: state.hasMore,
  })
);

// 搜索和筛选选择器
export const selectSearchQuery = createSelector(
  [selectProductListState],
  (state) => state.searchQuery
);

export const selectFilters = createSelector(
  [selectProductListState],
  (state) => state.filters
);

export const selectSort = createSelector(
  [selectProductListState],
  (state) => state.sort
);

// 加载状态选择器
export const selectIsLoading = createSelector(
  [selectProductListState],
  (state) => state.loading
);

export const selectIsLoadingMore = createSelector(
  [selectProductListState],
  (state) => state.loadingMore
);

export const selectError = createSelector(
  [selectProductListState],
  (state) => state.error
);

// UI状态选择器
export const selectViewMode = createSelector(
  [selectProductListState],
  (state) => state.viewMode
);

export const selectSelectedProducts = createSelector(
  [selectProductListState],
  (state) => state.selectedProducts
);

// 复合选择器
export const selectHasFilters = createSelector(
  [selectFilters],
  (filters) => Object.keys(filters).length > 0
);

export const selectIsEmpty = createSelector(
  [selectProducts, selectIsLoading],
  (products, loading) => !loading && products.length === 0
);

export const selectCanLoadMore = createSelector(
  [selectProductListState],
  (state) => state.hasMore && !state.loading && !state.loadingMore
);

// features/product-list/ui/product-list.tsx
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { ProductCard } from "@/entities/product";
import {
  selectProducts,
  selectIsLoading,
  selectError,
  selectViewMode,
  selectCanLoadMore,
  selectIsLoadingMore,
} from "../model/product-list.selectors";
import {
  fetchProductsThunk,
  loadMoreProductsThunk,
} from "../model/product-list.thunks";
import { ProductSearchBar } from "./product-search-bar";
import { ProductFilters } from "./product-filters";
import { ProductSortSelector } from "./product-sort-selector";
import { ProductPagination } from "./product-pagination";

export function ProductList() {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const loading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectError);
  const viewMode = useAppSelector(selectViewMode);
  const canLoadMore = useAppSelector(selectCanLoadMore);
  const loadingMore = useAppSelector(selectIsLoadingMore);

  useEffect(() => {
    dispatch(fetchProductsThunk());
  }, [dispatch]);

  const handleLoadMore = () => {
    if (canLoadMore) {
      dispatch(loadMoreProductsThunk());
    }
  };

  if (loading && products.length === 0) {
    return <div className="product-list__loading">加载中...</div>;
  }

  if (error) {
    return (
      <div className="product-list__error">
        <p>加载失败: {error}</p>
        <button onClick={() => dispatch(fetchProductsThunk())}>重试</button>
      </div>
    );
  }

  return (
    <div className="product-list">
      <div className="product-list__header">
        <ProductSearchBar />
        <div className="product-list__controls">
          <ProductFilters />
          <ProductSortSelector />
        </div>
      </div>

      <div className={`product-list__grid product-list__grid--${viewMode}`}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            showAddToCart
            onAddToCart={(product) => {
              // 这里会调用购物车功能
              console.log("添加到购物车:", product);
            }}
          />
        ))}
      </div>

      {canLoadMore && (
        <div className="product-list__load-more">
          <button
            onClick={handleLoadMore}
            disabled={loadingMore}
            className="product-list__load-more-btn"
          >
            {loadingMore ? "加载中..." : "加载更多"}
          </button>
        </div>
      )}

      <ProductPagination />
    </div>
  );
}

// features/product-list/ui/product-search-bar.tsx
import React, { useState, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { selectSearchQuery } from "../model/product-list.selectors";
import { setSearchQuery } from "../model/product-list.slice";
import { searchProductsThunk } from "../model/product-list.thunks";
import { useDebounce } from "../lib/product-list.hooks";

export function ProductSearchBar() {
  const dispatch = useAppDispatch();
  const searchQuery = useAppSelector(selectSearchQuery);
  const [inputValue, setInputValue] = useState(searchQuery);

  // 防抖搜索
  const debouncedSearch = useDebounce((query: string) => {
    dispatch(setSearchQuery(query));
    dispatch(searchProductsThunk(query));
  }, 300);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setInputValue(value);
      debouncedSearch(value);
    },
    [debouncedSearch]
  );

  const handleClear = () => {
    setInputValue("");
    dispatch(setSearchQuery(""));
    dispatch(searchProductsThunk(""));
  };

  return (
    <div className="product-search-bar">
      <div className="product-search-bar__input-wrapper">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="搜索产品..."
          className="product-search-bar__input"
        />
        {inputValue && (
          <button onClick={handleClear} className="product-search-bar__clear">
            ×
          </button>
        )}
      </div>
    </div>
  );
}

// features/product-list/lib/product-list.hooks.ts
import { useCallback, useRef } from "react";

// 防抖Hook
export function useDebounce<T extends (...args: any[]) => void>(
  callback: T,
  delay: number
): T {
  const timeoutRef = useRef<NodeJS.Timeout>();

  return useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  ) as T;
}

// features/product-list/index.ts
export { ProductList } from "./ui/product-list";
export { ProductSearchBar } from "./ui/product-search-bar";
export { ProductFilters } from "./ui/product-filters";
export { ProductSortSelector } from "./ui/product-sort-selector";
export { ProductPagination } from "./ui/product-pagination";

export * from "./model/product-list.slice";
export * from "./model/product-list.selectors";
export * from "./model/product-list.thunks";
export * from "./lib/product-list.hooks";

#### 产品列表功能架构总结

**架构层级关系：**

```text
┌─────────────────────────────────────────────────────────────┐
│                        app/                                │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ Redux Store配置 + 全局Provider + App组件           │    │
│  │ - store配置和类型化hooks                           │    │
│  │ - 组合所有feature的reducer                         │    │
│  │ - 集成ProductList组件到应用                        │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                                ↓
┌─────────────────────────────────────────────────────────────┐
│                    features/product-list/                  │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ 产品列表功能实现                                    │    │
│  │ - Redux状态管理(slice/thunks/selectors)           │    │
│  │ - UI组件(列表/搜索/筛选/分页)                      │    │
│  │ - 自定义hooks和工具函数                            │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                                ↓
┌─────────────────────────────────────────────────────────────┐
│                    entities/product/                       │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ 产品实体基础设施                                    │    │
│  │ - 产品数据模型和类型定义                           │    │
│  │ - 产品API和CRUD操作                               │    │
│  │ - 基础产品UI组件(ProductCard等)                   │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                                ↓
┌─────────────────────────────────────────────────────────────┐
│                       shared/                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ 共享基础设施                                        │    │
│  │ - 基础UI组件库                                     │    │
│  │ - 通用工具函数和hooks                              │    │
│  │ - API基础配置                                      │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
````

**功能特性：**

- **产品展示**：支持网格和列表两种视图模式
- **搜索功能**：实时搜索，支持防抖优化
- **筛选排序**：多维度筛选和排序选项
- **分页加载**：支持分页和无限滚动加载
- **状态管理**：完整的 Redux 状态管理，包括加载状态、错误处理
- **产品操作**：产品选择、批量操作支持

**架构优势：**

- **关注点分离**：UI、业务逻辑、数据管理清晰分离
- **可复用性**：实体层组件可在多个功能中复用
- **可测试性**：每层都可独立进行单元测试
- **可维护性**：功能边界清晰，便于维护和扩展
- **团队协作**：不同层级可由不同团队并行开发

````

#### 简化的功能示例

以下是一个简化的购物车功能示例，展示基本的目录结构：

```text
features/
├── shopping-cart/              # 购物车功能
│   ├── ui/                     # UI组件
│   ├── model/                  # 状态管理
│   ├── api/                    # API操作
│   └── index.ts                # 导出
````

详细的 Redux 状态管理实现请参考第 8 章节。

- **页面中使用：**

  ```typescript
  // pages/home/home.tsx
  import { ProductSearch } from "@/features/product-search";
  import { ShoppingCart } from "@/features/shopping-cart";

  export function HomePage() {
    return (
      <div>
        <header>
          <ProductSearch.SearchBar />
          <ShoppingCart.CartIcon />
        </header>
        <main>
          <ProductSearch.SearchResults />
        </main>
      </div>
    );
  }
  ```

#### 购物平台 Feature 划分标准

- **用户价值测试**

  ```text
  正确示例：
  - "用户可以搜索商品" → product-search
  - "用户可以管理购物车" → shopping-cart
  - "用户可以登录注册" → user-auth
  - "用户可以下单结账" → order-checkout

  错误示例：
  - "用户可以使用搜索框" → 太技术化
  - "用户可以点击按钮" → 不是业务价值
  - "用户可以看到商品" → 只是展示
  ```

- **功能完整性测试** - 每个 Feature 应包含完整的用户交互流程：

  ```text
  product-search/
  ├── 搜索输入 → 搜索执行 → 结果展示 → 筛选排序
  shopping-cart/
  ├── 添加商品 → 查看购物车 → 修改数量 → 删除商品
  user-auth/
  ├── 注册 → 登录 → 密码重置 → 退出登录
  ```

- **业务边界测试**

  ```text
  边界清晰：
  - product-search: 只负责商品搜索相关
  - shopping-cart: 只负责购物车管理
  - order-checkout: 只负责订单结账流程

  边界模糊：
  - product-management: 太宽泛，包含搜索、详情、评价等
  - user-operations: 太宽泛，包含登录、资料、订单等
  ```

- **团队协作测试**

  ```text
  可并行开发：
  - 搜索团队 → product-search
  - 购物车团队 → shopping-cart
  - 支付团队 → order-checkout
  - 用户团队 → user-auth

  每个团队可以独立开发、测试、部署自己的 Feature
  ```

- **数据依赖测试**

  ```text
  依赖关系清晰：
  product-search → 依赖 entities/product
  shopping-cart → 依赖 entities/product, entities/user
  order-checkout → 依赖 shopping-cart, entities/order

  循环依赖：
  Feature A 依赖 Feature B，同时 Feature B 依赖 Feature A
  ```

### 4.5 entities/ - 实体层

业务领域中的核心数据对象，代表现实世界中具有独立身份的业务概念。

#### 什么是 Entities？

**简单理解：Entities 就是你的应用中的核心数据对象。**

比如在购物网站中：

- **用户（User）** - 包含姓名、邮箱、头像等信息
- **商品（Product）** - 包含标题、价格、图片等信息
- **订单（Order）** - 包含商品列表、总价、状态等信息

**举个例子：**

```typescript
// 不好的做法：在每个功能中重复定义用户数据
// features/user-profile/user-profile.tsx
interface User {
  id: string;
  name: string;
  email: string;
}

// features/shopping-cart/cart.tsx
interface User {
  // 重复定义！
  id: string;
  name: string;
  email: string;
}

// 好的做法：在 entities 中统一定义
// entities/user/model/user.types.ts
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

// features/user-profile/user-profile.tsx
import { User } from "@/entities/user"; // 直接使用

// features/shopping-cart/cart.tsx
import { User } from "@/entities/user"; // 复用相同定义
```

#### 目录结构

```text
entities/
├── product/             # 产品实体
│   ├── model/           # 数据模型
│   │   ├── product.types.ts     # 产品类型定义
│   │   ├── product.utils.ts     # 产品工具函数
│   │   └── index.ts             # model导出
│   ├── api/             # 产品API
│   │   ├── product.api.ts       # 产品API实现
│   │   └── index.ts             # api导出
│   ├── ui/              # 产品UI组件
│   │   ├── product-card.tsx     # 产品卡片
│   │   ├── product-image.tsx    # 产品图片
│   │   ├── product-price.tsx    # 产品价格
│   │   └── index.ts             # ui导出
│   └── index.ts         # 实体公共接口
├── user/                # 用户实体
├── order/               # 订单实体
└── category/            # 分类实体
```

**Product 实体实现：**

```typescript
// entities/product/model/product.types.ts
export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number; // 原价（用于显示折扣）
  imageUrl: string;
  images?: string[]; // 多张图片
  description: string;
  shortDescription?: string;
  category: string;
  categoryId: string;
  brand?: string;
  tags?: string[];
  inStock: boolean;
  stockQuantity: number;
  rating?: number; // 评分
  reviewCount?: number; // 评价数量
  createdAt: string;
  updatedAt: string;
}

export interface ProductFilter {
  category?: string;
  priceRange?: [number, number];
  inStock?: boolean;
  brand?: string;
  tags?: string[];
  rating?: number;
}

export interface ProductSort {
  field: "price" | "name" | "rating" | "createdAt";
  order: "asc" | "desc";
}

// entities/product/model/product.utils.ts
export const ProductUtils = {
  // 格式化价格
  formatPrice: (price: number) => `¥${price.toFixed(2)}`,

  // 计算折扣百分比
  getDiscountPercent: (product: Product) => {
    if (!product.originalPrice) return 0;
    return Math.round((1 - product.price / product.originalPrice) * 100);
  },

  // 检查是否有折扣
  hasDiscount: (product: Product) => {
    return product.originalPrice && product.originalPrice > product.price;
  },

  // 获取库存状态文本
  getStockStatus: (product: Product) => {
    if (!product.inStock) return "缺货";
    if (product.stockQuantity <= 5) return "库存紧张";
    return "有库存";
  },

  // 获取评分星级
  getStarRating: (rating?: number) => {
    if (!rating) return "暂无评分";
    return "★".repeat(Math.floor(rating)) + "☆".repeat(5 - Math.floor(rating));
  },
};

// entities/product/api/product.api.ts
import { httpClient } from "@/shared/api";
import { Product, ProductFilter, ProductSort } from "../model/product.types";

export interface ProductListParams {
  page?: number;
  limit?: number;
  search?: string;
  filter?: ProductFilter;
  sort?: ProductSort;
}

export interface ProductListResponse {
  products: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export const ProductAPI = {
  // 获取产品列表
  getProducts: async (
    params: ProductListParams = {}
  ): Promise<ProductListResponse> => {
    const response = await httpClient.get("/api/products", { params });
    return response.data;
  },

  // 获取单个产品
  getProduct: async (id: string): Promise<Product> => {
    const response = await httpClient.get(`/api/products/${id}`);
    return response.data;
  },

  // 搜索产品
  searchProducts: async (
    query: string,
    params: Omit<ProductListParams, "search"> = {}
  ): Promise<ProductListResponse> => {
    return ProductAPI.getProducts({ ...params, search: query });
  },

  // 获取热门产品
  getPopularProducts: async (limit = 10): Promise<Product[]> => {
    const response = await httpClient.get("/api/products/popular", {
      params: { limit },
    });
    return response.data;
  },

  // 获取相关产品
  getRelatedProducts: async (
    productId: string,
    limit = 6
  ): Promise<Product[]> => {
    const response = await httpClient.get(
      `/api/products/${productId}/related`,
      { params: { limit } }
    );
    return response.data;
  },
};

// entities/product/ui/product-card.tsx
import React from "react";
import { Product, ProductUtils } from "../model";
import { ProductImage } from "./product-image";
import { ProductPrice } from "./product-price";

interface ProductCardProps {
  product: Product;
  onClick?: (product: Product) => void;
  showAddToCart?: boolean;
  onAddToCart?: (product: Product) => void;
  className?: string;
}

export function ProductCard({
  product,
  onClick,
  showAddToCart = false,
  onAddToCart,
  className = "",
}: ProductCardProps) {
  const handleClick = () => {
    onClick?.(product);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart?.(product);
  };

  return (
    <div className={`product-card ${className}`} onClick={handleClick}>
      <ProductImage
        src={product.imageUrl}
        alt={product.name}
        className="product-card__image"
      />

      {ProductUtils.hasDiscount(product) && (
        <div className="product-card__discount">
          -{ProductUtils.getDiscountPercent(product)}%
        </div>
      )}

      <div className="product-card__content">
        <h3 className="product-card__title">{product.name}</h3>

        {product.shortDescription && (
          <p className="product-card__description">
            {product.shortDescription}
          </p>
        )}

        <ProductPrice product={product} />

        {product.rating && (
          <div className="product-card__rating">
            <span className="stars">
              {ProductUtils.getStarRating(product.rating)}
            </span>
            <span className="count">({product.reviewCount || 0})</span>
          </div>
        )}

        <div className="product-card__stock">
          <span
            className={`stock-status ${
              product.inStock ? "in-stock" : "out-of-stock"
            }`}
          >
            {ProductUtils.getStockStatus(product)}
          </span>
        </div>

        {showAddToCart && product.inStock && (
          <button
            className="product-card__add-to-cart"
            onClick={handleAddToCart}
          >
            加入购物车
          </button>
        )}
      </div>
    </div>
  );
}

// entities/product/ui/product-image.tsx
import React, { useState } from "react";

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
}

export function ProductImage({
  src,
  alt,
  className = "",
  fallbackSrc = "/default-product.png",
}: ProductImageProps) {
  const [imageSrc, setImageSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setImageSrc(fallbackSrc);
    setIsLoading(false);
  };

  return (
    <div className={`product-image ${className}`}>
      {isLoading && <div className="product-image__loading">加载中...</div>}
      <img
        src={imageSrc}
        alt={alt}
        onLoad={handleImageLoad}
        onError={handleImageError}
        className="product-image__img"
      />
    </div>
  );
}

// entities/product/ui/product-price.tsx
import React from "react";
import { Product, ProductUtils } from "../model";

interface ProductPriceProps {
  product: Product;
  className?: string;
}

export function ProductPrice({ product, className = "" }: ProductPriceProps) {
  const hasDiscount = ProductUtils.hasDiscount(product);

  return (
    <div className={`product-price ${className}`}>
      <span className="product-price__current">
        {ProductUtils.formatPrice(product.price)}
      </span>

      {hasDiscount && (
        <span className="product-price__original">
          {ProductUtils.formatPrice(product.originalPrice!)}
        </span>
      )}
    </div>
  );
}

// entities/product/index.ts
export * from "./model";
export * from "./api";
export * from "./ui";
```

- **具体示例：用户实体**

  ```typescript
  // entities/user/model/user.types.ts
  export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    memberLevel: "NORMAL" | "VIP" | "PREMIUM";
    createdAt: Date;
    updatedAt: Date;
  }

  // entities/user/model/user.utils.ts
  export const UserUtils = {
    getFullName: (user: User) => user.name,
    isVip: (user: User) => user.memberLevel !== "NORMAL",
    getAvatarUrl: (user: User) => user.avatar || "/default-avatar.png",
  };

  // entities/user/api/user.api.ts
  export const UserAPI = {
    getUser: (id: string): Promise<User> =>
      fetch(`/api/users/${id}`).then((res) => res.json()),

    updateUser: (id: string, data: Partial<User>): Promise<User> =>
      fetch(`/api/users/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }).then((res) => res.json()),
  };

  // entities/user/ui/user-avatar.tsx
  export function UserAvatar({ user, size = "medium" }: UserAvatarProps) {
    return (
      <img
        src={UserUtils.getAvatarUrl(user)}
        alt={user.name}
        className={`avatar avatar-${size} ${
          UserUtils.isVip(user) ? "vip" : ""
        }`}
      />
    );
  }

  // entities/user/index.ts
  export { User } from "./model/user.types";
  export { UserUtils } from "./model/user.utils";
  export { UserAPI } from "./api/user.api";
  export { UserAvatar } from "./ui/user-avatar";
  ```

### 4.6 shared/ - 共享层

可复用的基础设施，不包含业务逻辑：

```text
shared/
├── ui/                         # 基础UI组件库
│   ├── button/
│   ├── input/
│   ├── modal/
│   └── index.ts
├── lib/                        # 工具函数库
│   ├── utils/                  # 通用工具
│   ├── hooks/                  # 通用hooks
│   ├── validators/             # 验证器
│   └── index.ts
├── api/                        # 基础API配置
│   ├── base.ts                 # 基础API客户端
│   ├── types.ts                # API类型定义
│   └── index.ts
├── config/                     # 基础配置
├── constants/                  # 全局常量
└── types/                      # 全局类型定义
```

## 5. 跨 Feature 业务逻辑处理

在实际开发中，经常会遇到**跨多个 feature 使用的业务相关函数**，这是 FSD 架构中的一个关键挑战。

### 5.1 核心原则

根据 FSD 官方文档，处理跨 feature 业务逻辑需要遵循以下原则：

#### 5.1.1 层级依赖规则

- **单向依赖**：上层可以使用下层，下层不能使用上层
- **同层隔离**：同一层级的模块不能直接相互依赖
- **避免循环依赖**：通过层级管理避免模块间的循环依赖

#### 5.1.2 业务逻辑上提原则

当多个 feature 需要共享业务逻辑时，应该将其**提升到更高层级**，而不是在同层之间共享。

### 5.2 解决策略

#### 5.2.1 提升到 `app` 层

**适用场景**：应用级的业务配置和跨功能业务逻辑

```text
app/
├── lib/                        # 应用级业务逻辑
│   ├── business/               # 跨功能的业务逻辑
│   │   ├── price-calculator.ts # 跨多个feature的价格计算
│   │   ├── permission-checker.ts # 跨功能的权限检查
│   │   └── data-transformer.ts # 跨功能的数据转换
│   └── utils/                  # 应用级工具函数
├── config/                     # 应用级配置
│   ├── assets.ts              # 静态资源配置
│   ├── api.ts                 # API基础配置
│   └── constants.ts           # 业务常量
└── index.ts
```

- **示例：静态资源路径处理**

  ```typescript
  // app/config/assets.ts
  const STATIC_ASSETS_URL = import.meta.env.VITE_STATIC_ASSETS_URL;

  export const generateFullAssetPath = (url: string) => {
    return `${STATIC_ASSETS_URL}/${url}`;
  };

  export const ASSET_CONFIG = {
    baseUrl: STATIC_ASSETS_URL,
    imageFormats: ["jpg", "png", "webp"],
    maxFileSize: 5 * 1024 * 1024, // 5MB
  } as const;
  ```

  ```typescript
  // app/index.ts
  export { generateFullAssetPath, ASSET_CONFIG } from "./config/assets";
  ```

  **使用方式：**

  ```typescript
  // entities/product/ui/product-card.tsx
  import { generateFullAssetPath } from "@/app";

  export const ProductCard = ({ product }: ProductCardProps) => {
    return (
      <img src={generateFullAssetPath(product.imageUrl)} alt={product.name} />
    );
  };
  ```

#### 5.2.2 抽象为 `entities` 层

**适用场景**：围绕核心业务实体的跨功能逻辑

```text
entities/
├── user/
│   ├── lib/
│   │   └── permission-helpers.ts # 用户权限相关的跨功能逻辑
│   └── ...
├── order/
│   ├── lib/
│   │   ├── order-calculator.ts   # 订单相关的跨功能计算
│   │   └── order-validator.ts    # 订单验证逻辑
│   └── ...
```

#### 5.2.3 创建专门的业务 `entities`

**适用场景**：复杂的跨功能业务规则

```text
entities/
├── business-rules/             # 专门的业务规则实体
│   ├── lib/
│   │   ├── pricing-engine.ts   # 定价引擎
│   │   ├── discount-rules.ts   # 折扣规则
│   │   └── validation-rules.ts # 验证规则
│   ├── model/
│   │   └── business-types.ts   # 业务规则类型
│   └── index.ts
```

## 6. 组件内部结构规范

### 6.1 组件目录结构

**适用范围：** 适用于 `shared/ui/`、`widgets/`、`entities/*/ui/`、`features/*/ui/` 等层级中的具体组件目录。

**标准组件目录结构：**

```text
component-name/                   # 组件目录（如 button/, product-card/ 等）
├── index.ts                      # 导入导出（Barrel 文件）
├── component-name.tsx            # 实际的组件文件
├── component-name.module.css     # 组件样式
├── component-name.test.tsx       # 组件测试
├── component-name.stories.tsx    # Storybook 文档（可选）
├── hooks/                        # 组件专用 hooks（可选）
│   └── use-component-name.ts
├── types.ts                      # 组件类型定义（可选）
├── constants.ts                  # 组件常量（可选）
└── utils.ts                      # 组件工具函数（可选）
```

**具体示例：**

```text
shared/ui/button/                 # 基础按钮组件
├── index.ts                      # export { default } from "./button"
├── button.tsx                    # 实际的按钮组件
├── button.module.css             # 按钮样式
├── button.test.tsx               # 按钮测试
└── types.ts                      # ButtonProps 等类型

entities/product/ui/product-card/ # 商品卡片组件
├── index.ts                      # export { default } from "./product-card"
├── product-card.tsx              # 实际的商品卡片组件
├── product-card.module.css       # 商品卡片样式
└── product-card.test.tsx         # 商品卡片测试
```

### 6.2 组件导出规范

**单个组件的导出：**

```typescript
// shared/ui/button/index.ts - 组件的 Barrel 文件
export { default } from "./button";
export type { ButtonProps } from "./button";

// shared/ui/button/button.tsx - 实际的组件文件
export interface ButtonProps {
  variant?: "primary" | "secondary";
  size?: "small" | "medium" | "large";
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "medium",
  children,
}: ButtonProps) {
  return (
    <button className={`btn btn-${variant} btn-${size}`}>{children}</button>
  );
}

export default Button;
```

**模块级别的导出：**

```typescript
// shared/ui/index.ts - 整个 UI 模块的 Barrel 文件
export { default as Button } from "./button";
export { default as Input } from "./input";
export { default as Modal } from "./modal";

// 也可以导出类型
export type { ButtonProps } from "./button";
export type { InputProps } from "./input";
export type { ModalProps } from "./modal";
```

### 7.1 业内标准文档

- **[Feature-Sliced Design](https://feature-sliced.design/)** - 现代前端架构方法论

  - [FSD 官方文档](https://feature-sliced.design/docs)
  - [FSD 示例项目](https://github.com/feature-sliced/examples)
  - [FSD vs 传统架构对比](https://feature-sliced.design/docs/about/motivation)

- **[Bulletproof React](https://github.com/alan2207/bulletproof-react)** - 生产级 React 应用架构

  - [项目结构指南](https://github.com/alan2207/bulletproof-react/blob/master/docs/project-structure.md)
  - [最佳实践](https://github.com/alan2207/bulletproof-react/tree/master/docs)

- **[React 官方文档](https://react.dev/)** - React 官方最佳实践
  - [Thinking in React](https://react.dev/learn/thinking-in-react)
  - [项目结构建议](https://react.dev/learn/start-a-new-react-project)

### 7.2 知名项目参考

- **[React DevTools](https://github.com/facebook/react/tree/main/packages/react-devtools)** - Meta 官方项目结构
- **[Remix](https://github.com/remix-run/remix)** - 现代全栈框架结构

  - [Remix 项目结构](https://remix.run/docs/en/main/file-conventions)

- **[Next.js](https://github.com/vercel/next.js)** - 流行 React 框架结构

  - [Next.js App Router](https://nextjs.org/docs/app)

- **[Vite](https://github.com/vitejs/vite)** - 现代构建工具
  - [Vite 项目模板](https://github.com/vitejs/vite/tree/main/packages/create-vite)

### 7.3 社区资源

- **[React Handbook](https://reacthandbook.dev/project-standards)** - React 项目标准
- **[2025 年 React 文件夹结构](https://dev.to/pramod_boda/recommended-folder-structure-for-react-2025-48mc)** - 最新推荐结构
- **[可扩展 React 应用架构](https://dev.to/codelamda/best-folder-structure-for-scalable-react-apps-a-complete-step-by-step-guide-p83)** - 可扩展架构指南
- **[React 项目结构最佳实践](https://dev.to/algo_sync/how-to-structure-a-react-project-in-2025-clean-scalable-and-practical-15j6)** - 2025 年实用指南

### 7.4 工具和模板

- **[Create React App](https://create-react-app.dev/)** - 官方脚手架
- **[Vite React Template](https://vitejs.dev/guide/#scaffolding-your-first-vite-project)** - 现代开发模板
- **[React TypeScript Cheatsheets](https://react-typescript-cheatsheet.netlify.app/)** - TypeScript 最佳实践
- **[ESLint React Plugin](https://github.com/jsx-eslint/eslint-plugin-react)** - React 代码规范

_本规范基于业内最佳实践制定，会根据社区发展和团队反馈持续更新。_
