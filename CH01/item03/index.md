## 아이템 3: 코드 생성과 타입이 관계없음을 이해하기

타입스크립트 컴파일러는 크게 두 가지 역할을 수행한다.

- 코드의 타입 오류 체크
- 최신 타입스크립트/자바스크립트를 브라우저에서 동작할 수 있도록 구버전의 자바스크립트로 트랜스파일

이 두가지가 서로 완벽히 **독립적**이다.
타입스크립트가 자바스크립트로 변환될 때 코드 내의 타입에는 영향을 주지 않는다.
반대로 자바스크립트의 실행 시점에도 작성한 타입은 영향을 미치지 않는다.

### 타입 오류가 있는 코드도 컴파일이 가능합니다

컴파일은 타입 체크와 독립적으로 동작하기 때문에 타입 오류가 있는 코드도 컴파일이 가능하다.
문제가 될 만한 부분을 알려 주지만, 그렇다고 빌드를 멈추지는 않는다.

만약 오류가 있을 때 컴파일하지 않으려면, tsconfig.json에 `noEmitOnError`를 설정하면 된다.

<br>

_noEmit_

타입스크립트 컴파일러가 출력 파일들을 만들어 내지 않도록 하는 설정이다.
이는 다른 빌드 도구에게 컴파일 작업을 담당할 수 있도록 한다.
이러한 경우에는 TS를 소스 코드 타입 체커로만 사용하게 된다.

### 런타임에는 타입 체크가 불가능합니다

```ts
interface Square {
  width: number;
}
interface Rectangle extends Square {
  height: number;
}
type Shape = Square | Rectangle;

function calculateArea(shape: Shape) {
  if (shape instanceof Rectangle) {
    // Error: 'Rectangle' only refers to a type, but is being used as a value here.
    return shape.height * shape.width;
  } else {
    return shape.width * shape.width;
  }
}
```

위 코드에서 instanceof 체크는 런타임에 일어나지만, Rectangle은 타입이기 때문에 런타임 시점에 아무런 역할을 할 수 없다.

타입스크립트의 타입은 erasable하며, 실제로 자바스크립트로 컴파일되는 과정에서 모든 인터페이스, 타입, 타입 구문은 그냥 제거되어 버린다.

런타입에도 타입 정보를 유지하기 위해서는 아래와 같은 방법이 있다.

**in 연산자를 통한 타입 가드**

```ts
function calculateArea(shape: Shape) {
  if ("height" in shape) {
    return shape.width * shape.height;
  } else {
    return shape.width * shape.width;
  }
}
```

**타입 정보를 리터럴 값으로 명시적 저장하는 태그 기법**

```ts
interface Square {
  kind: "square";
  width: number;
}
interface Rectangle {
  kind: "rectangle";
  height: number;
  width: number;
}

type Shape = Square | Rectangle;

function calculateArea(shape: Shape) {
  if (shape.kind === "rectangle") {
    return shape.width * shape.height;
  } else {
    return shape.width * shape.width;
  }
}
```

<br>

_타입과 값을 둘 다 사용하려면 타입스크립트의 클래스 문법을 사용할 수 있다._

### 타입 연산은 런타임에 영향을 주지 않습니다

```ts
function asNumber(val: number | string): number {
  return val as number;
}

// 변환된 JS 코드
function asNumber(val) {
  return val;
}
```

`as number`는 타입 연산이고 런타임 동작에는 아무런 영향을 미치지 않아
변환된 JS 코드는 값을 정제하지 못한다.

값을 정제하기 위해서는 자바스크립트 연산을 통해 변환을 수행해야 한다.

### 런타임 타입은 선언된 타입과 다를 수 있습니다

```ts
function setLightSwitch(value: boolean) {
  switch (value) {
    case true:
      turnLightOn();
      break;
    case false:
      turnLightOff();
      break;
    default:
      console.log(`I'm afraid I can't do that.`);
  }
}
```

타입스크립트는 일반적으로 실행되지 못하는 죽은 코드를 찾아낸다.
하지만 위 코드에서는 실행되지 않을 것 같은 default 부분을 TS가 찾아내지 못한다.

런타임에 실제 인수로 들어가는 값의 타입과 선언된 타입이 맞지 않을 수 있다. 가령 API를 잘못 파악해서 value가 실제로 문자열이였다면 default 부분이 실행될 수 있다.

### 타입스크립트 타입으로는 함수를 오버로드할 수 없습니다

함수 오버로딩: 동일한 이름에 매개변수만 다른 여러 버전의 함수를 허용

타입스크립트에서는 자바스크립트로 컴파일하면 타입 정보가 사라지기 때문에 중복된 함수를 구현하는 것이 되버린다. 따라서 함수 오버로딩은 불가능하다.

```ts
function add(a: number, b: number) {
  return a + b;
}
//       ~~~ Duplicate function implementation
function add(a: string, b: string) {
  return a + b;
}
//       ~~~ Duplicate function implementation
```

다만 타입 수준에서 오버로딩 기능을 지원한다.
하나의 함수에 대해 여러 개의 선언문을 작성할 수 있지만,
구현체는 오직 하나뿐이다.

```ts
function add(a: number, b: number): number;
function add(a: string, b: string): string;
```

### 타입스크립트 타입은 런타임 성능에 영향을 주지 않습니다

타입과 타입 연산자는 JS 변환 시점에 제거되기 때문에 런타임의 성능에 아무런 영향을 주지 않는다.
