## 아이템 23: 한꺼번에 객체 생성하기

### 객체 속성 추가

안전한 타입으로 속성을 추가하려면 객체 전개를 사용한다.

```ts
const namedPoint = { ...pt, ...id };
namedPoint.name; // OK
```

### 조건부 속성 추가

```ts
declare let hasMiddle: boolean;
const firstLast = { first: "Harry", last: "Truman" };
const president = { ...firstLast, ...(hasMiddle && { middle: "S" }) };

// president는 선택적 속성을 가진 타입으로 추론된다.
const president: {
  middle?: string;
  first: string;
  last: string;
};
```
