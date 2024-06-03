## 아이템 14: 타입 연산과 제너릭 사용으로 반복 줄이기

값 공간에서와 마찬가지로 반복적인 코드는 타입 공간에서도 좋지 않다.

### 매핑된 타입

```ts
interface State {
  userId: string;
  pageTitle: string;
  recentFiles: string[];
  pageContents: string;
}

interface TopNavState {
  userId: string;
  pageTitle: string;
  recentFiles: string[];
  // omits pageContents
}
```

위 예제의 경우 State의 부분 집합으로 TopNavState를 정의하는 것이 바람직해 보인다.

```ts
// 1) State를 인덱싱하는 방법
type TopNavState = {
  userId: State["userId"];
  pageTitle: State["pageTitle"];
  recentFiles: State["recentFiles"];
};
```

좀 더 똑똑하게 타입을 선언하고 싶다.

```ts
// 2) 매핑된 타입 사용하기
type TopNavState = {
  [k in "userId" | "pageTitle" | "recentFiles"]: State[k];
};
```

<br>

매핑된 타입과 제니릭을 통해 유틸리티 타입을 구현할 수 있다.

```ts
type Pick<T, K> = { [k in K]: T[k] };

type TopNavState = Pick<State, "userId" | "pageTitle" | "recentFiles">;
```

```ts
type Partial<T, K> = { [k in K]?: T[k] };
```

매핑된 타입을 사용하면 기존 타입의 속성을 기반으로 새로운 타입을 생성할 수 있다.

<br>

📖 추가) TS / JS의 `in`

`in` keyword가 반복해서 사용되는데 이를 정리하여 헷갈리지 않도록 하자.

#### 1. 반복문에서의 `in`

`for-in` 구문의 `in`
객체의 속성을 순회할 때 사용

#### 2. 객체의 특정 프로퍼티 확인

```ts
const person = {
  name: "Alice",
  age: 25,
};

if ("name" in person) {
  console.log("Name exists");
}
```

#### 3. 매핑된 타입의 `in`

유니온 타입의 각 타입을 순회할 때 사용

```ts
type Partial<T, K> = { [k in K]?: T[k] };
```

### typeof

값의 형태에 해당하는 타입을 정의하고 싶은 경우

```ts
const INIT_OPTIONS = {
  width: 640,
  height: 480,
  color: "#00FF00",
  label: "VGA",
};

type Options = typeof INIT_OPTIONS;
```

### ReturnType 유틸리티

함수나 메서드의 반환 값에 명명된 타입을 만들고 싶을 때

```ts
type UserInfo = ReturnType<typeof getUserInfo>;
```

### 타입 매개변수 제한하기

제네릭 타입은 타입을 위한 함수다.
이때 제네릭 타입에서 매개변수를 **제한**할 수 있는 방법이 필요하다.

```ts
interface Name {
  first: string;
  last: string;
}

type DancingDuo<T extends Name> = [T, T];
```

**`extends`는 확장 개념이 아닌 부분 집합 개념이다.**

<br>

요약: 타입의 반복을 줄이기 위해 타입스크립트가 제공한 도구들이 있다.
여기에는 keyof, typeof, 인덱싱, 매핑된 타입, 제네릭이 포함된다.
