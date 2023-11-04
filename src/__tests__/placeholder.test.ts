function add(a: number, b: number): number {
  return a + b;
}

describe("add function", () => {
  it("correctly adds two numbers", () => {
    expect(add(1, 2)).toBe(3);
    expect(add(-1, 2)).toBe(1);
    expect(add(0, 0)).toBe(0);
  });
});
