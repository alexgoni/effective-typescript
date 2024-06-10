## 아이템 22: 타입 좁히기

타입스크립트가 넓은 타입으로부터 좁은 타입으로 진행하는 과정

### null check

```ts
const el = document.getElementById("foo"); // 타입이 HTMLElement | null

if (el) {
  el; // 타입이 HTMLElement
} else {
  el; // 타입이 null
}
```

🛑 null check 주의할 점

```ts
function foo(x?: number | string | null) {
  if (!x) {
    x; // 타입이 string | number | null | undefined
  }
}
```

빈 문자열과 0 모두 false가 되기 때문에 타입이 좁혀지지 않았다.

### instanceof

```ts
function contains(text: string, search: string | RegExp) {
  if (search instanceof RegExp) {
    search; // 타입이 RegExp
  } else {
    search; // 타입이 string
  }
}
```

### 속성 체크 `in`

```ts
interface Apple {
  isGoodForBaking: boolean;
}

interface Orange {
  numSlices: number;
}

function pickFruit(fruit: Apple | Orange) {
  if ("isGoodForBaking" in fruit) {
    fruit; // 타입이 Apple
  } else {
    fruit; // 타입이 Orange
  }
  fruit; // 타입이 Apple | Orange
}
```

### 명시적 태그

```ts
interface UploadEvent {
  type: "upload";
  filename: string;
  contents: string;
}

interface DownloadEvent {
  type: "download";
  filename: string;
}

type AppEvent = UploadEvent | DownloadEvent;

function handleEvent(e: AppEvent) {
  switch (e.type) {
    case "download":
      e; // 타입이 DownloadEvent
      break;
    case "upload":
      e; // 타입이 UploadEvent
      break;
  }
}
```

### 사용자 정의 타입 가드 with `is`

```ts
function isInputElement(el: Element): el is HTMLInputElement {
  return "value" in el;
}

function getElementContent(el: HTMLElement) {
  if (isInputElement(el)) {
    el; // 타입이 HTMLInputElement
    return el.value;
  }
  el; // 타입이 HTMLElement
  return el.textContent;
}
```

반환 타입의 `el is HTMLInputElement`는 함수의 반환이 true인 경우, 타입 체커에게 인수가 해당 타입임을 알려준다.
