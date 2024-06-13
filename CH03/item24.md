## 아이템 24: 일관성 있는 별칭 사용하기

타입스크립트의 **제어 흐름 분석**에 따라 의도하지 않은대로 타입이 유추될 수 있다.

```ts
interface Polygon {
  exterior: Coordinate[];
  holes: Coordinate[][];
  bbox?: BoundingBox;
}

function isPointInPolygon(polygon: Polygon, pt: Coordinate) {
  const box = polygon.bbox;

  if (polygon.bbox) {
    if (
      pt.x < box.x[0] ||
      pt.x > box.x[1] ||
      //     ~~~                ~~~  'box' is possibly 'undefined'
      pt.y < box.y[0] ||
      pt.y > box.y[1]
    ) {
      //     ~~~                ~~~  'box' is possibly 'undefined'
      return false;
    }
  }
  // ...
}
```

객체 구조 분해 할당을 통해 일관된 이름을 사용하는 것으로 제어 흐름 분석을 방해하지 않을 수 있다.

```ts
function isPointInPolygon(polygon: Polygon, pt: Coordinate) {
  const { bbox } = polygon;
  if (bbox) {
    const { x, y } = bbox;
    if (pt.x < x[0] || pt.x > x[1] || pt.y < y[0] || pt.y > y[1]) {
      return false;
    }
  }
  // ...
}
```

또한 함수에 객체를 넘겨주는 경우 함수가 객체의 속성을 변경해 반환할 수 있다. (비순수 함수)
그러나 이 경우 함수를 호출할 때마다 속성 체크를 반복해야 하기 때문에 타입스크립트는 함수가 타입 정제를 무효화하지 않는다고 가정한다.
따라서 위의 객체 구조 분해 할당 예시와 같이 지역 변수를 사용하는 것으로 타입 정제를 믿을 수 있다.
