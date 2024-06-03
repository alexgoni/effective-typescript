## 아이템 12: 함수 표현식에 타입 적용하기

타입스크립트에서는 함수 표현식을 사용하는 것이 좋다.

### 반복되는 타입 선언을 함수 시그니처를 통해 줄일 수 있다.

```ts
type BinaryFn = (a: number, b: number) => number;
const add: BinaryFn = (a, b) => a + b;
const sub: BinaryFn = (a, b) => a - b;
const mul: BinaryFn = (a, b) => a * b;
const div: BinaryFn = (a, b) => a / b;
```

### 라이브러리

라이브러리는 공통 함수 시그니처를 타입으로 제공하기도 한다.
리액트는 함수 매개변수에 명시하는 MouseEvent 타입 대신에 함수 전체에 적용할 수 있는 MouseEventHandler 타입을 제공한다.

라이브러리를 직접 만들고 있다면, 공통 함수 시그니처를 제공하는 것이 좋다.
