# 3장 타입 추론

TS는 타입 추론을 적극적으로 수행한다.
타입 추론은 수동으로 명시해야 하는 타입 구문의 수를 줄여주기 때문에, 코드 전체적인 안정성이 향상된다.

## 아이템 19: 추론 가능한 타입을 사용해 장황한 코드 방지하기

비구조화 할당문은 모든 지역 변수의 타입이 추론되도록 한다.

```ts
function logProduct(product: Product) {
  const { id, name, price } = product;
  console.log(id, name, price);
}
```

정보가 부족해서 타입스크립트가 스스로 타입을 판단하기 어려운 상황도 있다
매개 변수의 경우가 그 예이다. (기본값이 있는 경우 타입 구문을 생략하기도 한다.)

이상적인 TS 코드는 함수 시그니처에 타입 구문을 포함하지만
함수 내에서 생성된 지역 변수에는 타입 구문을 넣지 않는다.

### 타입이 추론될 수 있음에도 타입을 명시하고 싶은 상황

#### 객체 리터럴

객체 리터럴을 정의할 때 타입을 명시하면 잉여 속성 체크가 동작한다.
오류가 있다면 변수가 사용되는 순간이 아닌 할당하는 시점에 오류가 표시된다.

#### 함수 반환값

타입 추론이 가능할지라도 구현상의 오류가 함수를 호출한 곳까지 영향을 미치지 않도록 하기 위해 타입 구문을 명시하는게 좋다.

```ts
const cache: { [ticker: string]: number } = {};
function getQuote(ticker: string) {
  if (ticker in cache) {
    return cache[ticker];
  }
  return fetch(`https://quotes.example.com/?q=${ticker}`)
    .then((response) => response.json())
    .then((quote) => {
      cache[ticker] = quote;
      return quote as number;
    });
}
```

이 코드를 작성한 개발자의 원래 의도는 반환값이 `Promise<number>`다.
그러나 `return cache[ticker]`는 number를 반환한다.

오류는 getQuote 내부가 아닌 getQuote를 호출한 코드에서 발생한다.

```ts
getQuote("MSFT").then(considerBuying);
//               ~~~~ Property 'then' does not exist on type
//                    'number | Promise<number>'
```

반환 타입을 명시하면 구현상의 오류가 사용자 코드의 오류로 표시되지 않는다.
즉, 오류의 위치를 제대로 표시해준다.

추가적으로 반환 타입을 명시하면 함수에 대해 더욱 명확하게 알 수 있다.
또한 반환 타입을 명시함으로써 기존에 명명된 타입을 사용할 수 있다.

```ts
interface Vector2D {
  x: number;
  y: number;
}
function add(a: Vector2D, b: Vector2D) {
  return { x: a.x + b.x, y: a.y + b.y };
}
```

위 코드에서 TS는 반환 타입을 `{ x: number; y: number; }`로 추론한다.
반환 타입이 명명된 타입인 `Vector2D`인 것이 더 적절할 것이다.

### 요약

- 타입스크립트가 타입을 추론할 수 있다면 타입 구문을 작성하지 않는게 좋다.
- 이상적인 경우 함수/메서드의 시그니처에는 타입 구문이 있지만, 함수 내의 지역 변수에는 타입 구문이 없다.
- 추론될 수 있는 경우라도 객체 리터럴과 함수 반환에는 타입 명시를 고려해야 한다.
  이는 내부 구현의 오류가 사용자 코드 위치에 나타나는 것을 방지해 준다.
