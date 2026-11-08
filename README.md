# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## 작성자 설명

React 데모 개발 소스 입니다.
고객사 납품 시 Angular 소스이었던 것을 React 로 변환한 것이며,
기본 기능만을 구현했습니다.

주 패키지 & Component  
src/App.tsx  
src/common/router/rootRouter.ts
src/common/store/loadingSlice.ts
src/common/store/store.ts  
src/pages/PageSet.tsx  
src/pages/member/MameberList.tsx  
src/common/service/AxiosApi.ts  
src/common/component/tree/TreeView.tsx