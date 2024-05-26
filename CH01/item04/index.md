## 아이템 4: 구조적 타이핑에 익숙해지기

### 덕 타이핑

객체가 어떤 타입에 부합하는 변수와 메서드를 가질 경우 객체를 해당 타입에 속하는 것으로 간주하는 방식

덕 타이핑은 동적 타입 언어에서 주로 사용되는 개념으로 JS는 본질적으로 덕 타이핑 기반이다.
이 개념은 객체의 유형이나 클래스가 아닌, **객체의 속성과 메서드의 존재**에 따라 객체의 타입을 결정한다는 아이디어를 기반으로 한다.

### 타입 확장

함수에서 호출에 사용되는 매개변수의 프로퍼티들이 매개변수의 타입에 선언된 속성만을 가질 거라 생각하기 쉽다. 이러한 타입은 봉인된 타입이라 불린다.

반면 타입스크립트에서 타입은 확장에 열려 있다.
즉, 타입에 선언된 속성 외에 임의의 속성을 추가하더라도 오류가 발생하지 않는다.
예를 들어 고양이라는 타입에 크기 속성을 추가하여 작은 고양이가 되어도 고양이라는 사실은 변하지 않는다.

아래 예시를 통해 좀 더 깊게 이해해보자.

```ts
interface Book {
  name: string;
  price: number;
}

let book: Book = {
  name: "typescript",
  price: 10000,
  skill: "reactjs", // 타입 에러
};
```

```ts
interface Book {
  name: string;
  price: number;
}

interface ProgrammingBook {
  name: string;
  price: number;
  skill: string;
}

let book: Book;

let programmingBook: ProgrammingBook = {
  name: "타입스크립트",
  price: 33000,
  skill: "reactjs",
};

book = programmingBook;
```

첫 번째 코드의 경우 타입 스크립트는 Book에 대한 타입 정의를 두 가지 프로퍼티로만 하였다. 하지만 할당한 객체는 skill 프로퍼티가 추가된 객체이므로 이는 구조적 타이핑에 맞지 않는다.

두 번째 코드의 경우 ProgrammingBook 타입이 선언되면서 Book 타입과 ProgrammingBook 타입의 집합 관계가 형성된다.
따라서 작은 집합의 값을 큰 집합의 변수에 할당하는 것은 문제 되지 않는다.
