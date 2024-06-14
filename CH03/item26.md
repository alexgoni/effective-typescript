## 아이템 26: 타입 추론에 문맥이 어떻게 사용되는지 이해하기

타입스크립트는 타입을 추론할 때 단순히 값만 고려하지 않는다.
값이 존재하는 곳의 문맥까지도 살피는데 이때 문맥을 고려해 타입을 추론하면 의도하지 않은 결과가 나오기도 한다.
값과 문맥이 분리되어 생기는 타입 에러 예시를 알아보자.

```ts
type Language = "JavaScript" | "TypeScript" | "Python";
function setLanguage(language: Language) {
  /* ... */
}

setLanguage("JavaScript"); // OK

let language = "JavaScript";
setLanguage(language);
//          ~~~~~~~~ Argument of type 'string' is not assignable
//                   to parameter of type 'Language'
```

위의 예시는 값이 JavaScript이지만 language의 타입이 string이여서 setLanguage 함수에 전달할 수 없다.
const를 사용해서 타입을 제한하거나, 타입 선언을 해주는 것으로 문제를 해결할 수 있다.

### 튜플 사용 시 주의점

```ts
function panTo(where: [number, number]) {
  /* ... */
}

panTo([10, 20]); // OK

const loc = [10, 20];
panTo(loc);
//    ~~~ Argument of type 'number[]' is not assignable to
//        parameter of type '[number, number]'
```

여기서도 이전 예제처럼 값은 매개 변수에 전달 가능하지만 문맥으로서는 매개 변수에 전달할 수 없다.
타입 선언을 제공함으로써 문제를 해결할 수 있다.

`as const`로 상수 단언을 하는 경우 매개 변수에 들어가는 값이 readonly 형식이 아니여서 할당할 수 없다.

```ts
const loc = [10, 20] as const;
//    ^? const loc: readonly [10, 20]
panTo(loc);
//    ~~~ The type 'readonly [10, 20]' is 'readonly'
//        and cannot be assigned to the mutable type '[number, number]'
```

panTo 함수에 readonly 구문을 추가하면 문맥 손실과 관련한 문제를 해결할 수 있지만
정의한 곳이 아니라 사용한 곳에서 오류가 발생하는 문제가 있다. => 근본적인 원인을 파악하기 어렵다.

### 객체 사용 시 주의점

```ts
type Language = "JavaScript" | "TypeScript" | "Python";
interface GovernedLanguage {
  language: Language;
  organization: string;
}

function complain(language: GovernedLanguage) {
  /* ... */
}

complain({ language: "TypeScript", organization: "Microsoft" }); // OK

const ts = {
  language: "TypeScript",
  organization: "Microsoft",
};
complain(ts);
//       ~~ Argument of type '{ language: string; organization: string; }'
//            is not assignable to parameter of type 'GovernedLanguage'
//          Types of property 'language' are incompatible
//            Type 'string' is not assignable to type 'Language'
```

ts 객체에서 language의 타입은 string으로 추론된다.
타입 선언을 추가하거나 상수 단언을 사용해 해결할 수 있다.
