## 아이템 31: 타입 주변에 null 값 배치하기

값이 전부 null이거나 전부 null이 아닌 두 가지 경우로 분명히 구분된다면, 값이 섞여 있을 때보다 다루기 쉽다.
타입에 null을 추가하는 방식으로 이러한 경우를 모델링할 수 있다.

```ts
function extent(nums: Iterable<number>) {
  let minMax: [number, number] | null = null;
  for (const num of nums) {
    if (!minMax) {
      minMax = [num, num];
    } else {
      const [oldMin, oldMax] = minMax;
      minMax = [Math.min(num, oldMin), Math.max(num, oldMax)];
    }
  }
  return minMax;
}
```

null과 null이 아닌 값을 섞어서 사용하면 클래스에서도 문제가 생긴다.
속성값이 불확실하면 클래스의 모든 메서드에 나쁜 영향을 미친다.
따라서 클래스를 만들 때는 필요한 모든 값이 준비되었을 때 생성하여 null이 존재하지 않도록 하는 것이 좋다.

<br>

API 작성 시에는 반환 타입을 큰 객체로 만들고 반환 타입 전체가 null이거나 null이 아니게 만들어야 한다.
