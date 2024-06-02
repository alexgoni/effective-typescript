## 아이템 10: 객체 래퍼 타입 피하기

타입스크립트는 기본형과 객체 래퍼 타입을 별도로 모델링한다.

- string과 String
- number와 Number
- boolean과 Boolean
- symbol과 Symbol
- bigint와 BigInt

기본형은 객체 래퍼에 할당할 수 있지만 객체 래퍼는 기본형에 할당할 수 없다.

```ts
function isGreeting(phrase: String) {
  return ["hello", "good day"].includes(phrase);
  // String 형식의 인수는 string 형식의 매개변수에 할당될 수 없다.
}
```

따라서 객체 래퍼 타입은 지양하고 기본형 타입을 사용한다.
