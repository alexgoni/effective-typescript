## 아이템 21: 타입 넓히기

타입 추론 시 지정된 단일 값을 가지고 할당 가능한 값들의 집합을 유추해야 한다.
타입스크립트에서는 이러한 과정을 "넓히기"라고 부른다.

### 넓히기 제어

#### const

const로 변수를 선언하면 값이 바뀔 일이 없기 때문에 좁은 타입으로 추론할 수 있다.

#### 타입 구문

객체와 배열의 경우 const로 넓히기를 제어할 수 없다.
타입 구문을 제공하는 것으로 타입스크립트에게 정보를 준다.

```ts
const v: { x: 1 | 3 | 5 } = {
  x: 1,
};
```

#### const 단언문

const 단언문은 타입 공간의 문법이다.
값 뒤에 `as const`를 작성하면, TS는 최대한 좁은 타입으로 추론한다.

```ts
const v1 = {
  x: 1 as const,
  y: 2,
}; // 타입은 { x: 1; y: number; }

const v2 = {
  x: 1,
  y: 2,
} as const; // 타입은 { readonly x: 1; readonly y: 2; }
```
