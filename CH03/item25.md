## 아이템 25: 비동기 코드에는 콜백 대신 async 함수 사용하기

async 함수는 반환값을 래핑한 Promise를 반환한다.
await 키워드는 각각의 프로미스가 처리될 때까지 async 함수의 실행을 멈추고 반환한다.
이때 반환값은 래핑된 Promise가 아니다. (fetch의 경우 Response 타입 객체 반환)

함수는 항상 동기 또는 비동기로 실행되어야 하며 절대 혼용해서는 안된다.

```ts
// Don't do this!
const _cache: { [url: string]: string } = {};

function fetchWithCache(url: string, callback: (text: string) => void) {
  if (url in _cache) {
    callback(_cache[url]);
  } else {
    fetchURL(url, (text) => {
      _cache[url] = text;
      callback(text);
    });
  }
}
```

동기 함수인 callback과 비동기 함수인 fetchURL이 하나의 함수 안에 포함되어 있다.
async를 사용해 아래와 같이 혼용을 막을 수 있다.

```ts
const _cache: { [url: string]: string } = {};

async function fetchWithCache(url: string) {
  if (url in _cache) {
    return _cache[url];
  }
  const response = await fetch(url);
  const text = await response.text();
  _cache[url] = text;
  return text;
}
```

콜백이나 프로미스를 사용하면 실수로 반(half)동기 코드를 작성할 수 있지만,
async는 항상 Promise를 반환하기 때문에 이를 활용하면 항상 비동기 코드를 작성할 수 있다.
