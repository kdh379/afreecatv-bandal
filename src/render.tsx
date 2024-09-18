import ReactDOM from "react-dom/client";

const roots: { [key: string]: ReactDOM.Root } = {};

export function createOrGetRoot(id: string): ReactDOM.Root {
  if (!roots[id]) {
    const container = document.getElementById(id);
    if (!container) {
      throw new Error(`ID가 ${id}인 요소를 찾을 수 없습니다.`);
    }
    roots[id] = ReactDOM.createRoot(container);
  }
  return roots[id];
}

export function renderComponent<P extends object = Record<string, never>>(
  id: string,
  Component: React.ComponentType<P>,
  props?: P,
) {
  try {
    const root = createOrGetRoot(id);
    root.render(<Component {...(props as P)} />);
  } catch (error) {
    console.error(`컴포넌트 렌더링 중 오류 발생 (ID: ${id}):`, error);
  }
}
