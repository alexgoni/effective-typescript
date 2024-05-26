## 아이템 2: 타입스크립트 설정 이해하기

### noImplictAny

변수들이 미리 정의된 타입을 가져야 하는지 여부를 제어한다.

`noImplictAny`가 false(기본값)로 해제되었을 경우 타입 체커는 아래 코드를 허용한다.

```ts
function add(a, b) {
  return a + b;
}

// add 함수의 콜 시그니처
function add(a: any, b: any): any;
```

`noImplictAny`를 false로 설정해야 하는 경우는 기존 자바스크립트 프로젝트를 타입스크립트로 마이그레이션할 때 정도만 고려해볼 수 있겠다.

### strictNullChecks

null과 undefined가 모든 타입에서 허용되는지 확인하는 설정

`strictNullChecks`가 false(기본값)로 해제되었을 경우 타입 체커는 아래 코드를 허용한다.

```ts
const x: number = null;
```

<br>

타입스크립트에서 strict 설정을 하면 가장 두 가지 설정를 포함한 기본적인 옵션이 설정되기 때문에 대부분의 오류를 잡아낼 수 있다.
