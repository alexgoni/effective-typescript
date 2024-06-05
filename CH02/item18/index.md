## 아이템 18: 매핑된 타입을 사용하여 값을 동기화하기

```ts
interface ScatterProps {
  // The data
  xs: number[];
  ys: number[];

  // Display
  xRange: [number, number];
  yRange: [number, number];
  color: string;
  temp: number;

  // Events
  onClick: (x: number, y: number, index: number) => void;
}

function shouldUpdate(oldProps: ScatterProps, newProps: ScatterProps) {
  let k: keyof ScatterProps;
  for (k in oldProps) {
    if (oldProps[k] !== newProps[k]) {
      if (k !== "onClick") return true;
    }
  }
  return false;
}
```

만약 새로운 속성이 추가된다면 값이 변경될 때마다 차트를 다시 그릴 것. 불필요한 리렌더링 발생

```ts
const REQUIRES_UPDATE: { [k in keyof ScatterProps]: boolean } = {
  xs: true,
  ys: true,
  xRange: true,
  yRange: true,
  color: true,
  onClick: false,
};

function shouldUpdate(oldProps: ScatterProps, newProps: ScatterProps) {
  let k: keyof ScatterProps;
  for (k in oldProps) {
    if (oldProps[k] !== newProps[k] && REQUIRES_UPDATE[k]) {
      return true;
    }
  }
  return false;
}
```

새로운 속성을 추가하는 경우 `REQUIRES_UPDATE`에서 타입 에러가 발생한다.
매핑된 타입을 사용해 관련된 값과 타입을 동기화하도록 강제할 수 있다.
