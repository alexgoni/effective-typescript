## 아이템 13: 타입과 인터페이스의 차이점 알기

### 인터페이스와 타입의 공통점

함수 타입도 인터페이스나 타입으로 정의할 수 있다.

```ts
type TFn = (x: number) => string;
interface IFn {
  (x: number): string;
}
```

### 인터페이스와 타입의 차이점

#### 인터페이스의 보강: 선언 병합

```ts
interface IState {
  name: string;
  capital: string;
}

interface IState {
  population: number;
}

const wyoming: IState = {
  name: "Wyoming",
  capital: "Cheyenne",
  population: 578_000,
};
```

### 타입 VS 인터페이스

복잡한 타입의 경우 타입 별칭을 사용한다.
타입과 인터페이스 두 방법으로 모두 표현 가능한 간단한 객체 타입이라면 일관성과 보강의 관점에서 고려해봐야 한다.
