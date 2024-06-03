## 아이템 11: 잉여 속성 체크의 한계 인지하기

타입이 명시된 변수에 **객체 리터럴**을 할당할 때 타입스크립트는 해당 타입의 속성이 있는지, 그리고 **그 외 속성은 없는지** 확인한다.

```ts
interface Room {
  numDoors: number;
  ceilingHeightFt: number;
}

const r: Room = {
  numDoors: 1,
  ceilingHeightFt: 10,
  elephant: "present",
  // 객체 리터럴은 알려진 속성만 지정할 수 있으며
  // "Room" 형식의 "elephant"가 없습니다.
};
```

그러나 아래의 경우 타입 체커를 통과한다.

```ts
const obj = {
  numDoors: 1,
  ceilingHeightFt: 10,
  elephant: "present",
};

const r: Room = obj;
```

obj의 타입은 아래처럼 추론된다.

```ts
{
  numDoors: number;
  cellingHeightFt: number;
  elephant: string;
}
```

obj 타입은 Room 타입의 부분 집합이므로 Room 타입에 할당 가능하며 타입 체커도 통과한다.

❓: 왜 첫 번째는 타입 오류가 발생하지만, 두 번째 경우는 타입 오류가 발생하지 않을까?

> 잉여 속성 체크: 타입이 명시된 변수에 **객체 리터럴**을 할당할 때 타입스크립트는 해당 타입의 속성이 있는지, 그리고 **그 외 속성은 없는지** 확인한다.

첫 번째의 경우 잉여 속성 체크에서 통과하지 못해 에러가 발생하였다.
두 번째의 경우는 obj가 Room 타입에 할당 가능한지 검사하는 **할당 가능 검사**를 통과하여 타입 에러가 발생하지 않는다.

**잉여 속성 체크와 할당 가능 검사는 별도의 과정이다.**
잉여 속성 체크는 타입이 명시된 변수에 객체 리터럴을 할당할 때 일어난다.

<br>

잉여 속성 체크는 타입 단언문을 사용할 때는 적용되지 않는다.

```ts
const o = { darkmode: true, title: "MS Hearts" } as Options; // OK
```

<br>

객체 리터럴을 할당할 때 잉여 속성 체크를 원치 않는다면,
인덱스 시그니처를 사용해서 TS가 추가적인 속성을 예상하도록 할 수 있다.

```ts
interface Options {
  darkMode?: boolean;
  [otherOptions: string]: unknown;
}

const o: Options = { darkmode: true }; // OK
```
