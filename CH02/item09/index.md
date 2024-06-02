## 아이템 9: 타입 단언보다는 타입 선언을 사용하기

타입 단언은 개발자가 TS에게 타입을 알려줄 때 사용.
타입 단언이 꼭 필요한 경우가 아니라면 안전성 체크가 되는 타입 선언을 사용하자.

### 타입 단언을 사용해야 하는 경우

개발자가 TS보다 타입을 더 잘 알고 있을 때 사용한다.

```ts
document.querySelector("#myButton")?.addEventListener("click", (e) => {
  const button = e.currentTarget as HTMLButtonElement;
});
```

타입 체커는 `#myButton`이 버튼 엘리먼트인지 알 수 없다.
이때는 타입 단언문을 쓰는 것이 타당하다.

### 접미사 `!`

접미사 `!`는 null이 아니라는 단언문으로 해석된다.

### 타입 단언문으로 타입 변환

타입 단언문으로 타입 변환이 가능한 경우는 A가 B의 **서브 타입**일 때 가능하다.

`HTMLElement`는 `HTMLElement | null`의 서브 타입이므로 타입 변환이 가능하다.
`Person`은 `{}`의 서브 타입이므로 타입 변환이 가능하다.

그러나 `HTMLElement`와 `Person`은 서로의 서브 타입이 아니기 때문에 변환이 불가능하다.
이때 모든 타입은 `unknown` 타입의 서브 타입이므로 먼저 `unknown` 타입으로 단언하면 타입 변환이 가능하다.

```ts
const el: document.body as unknown as Person
```
