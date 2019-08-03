import SearchInput from "./search-input";

describe("SearchInput.isEmpty", () => {
  describe("when it's called with an empty value", () => {
    it("should return true", () => {
      expect(SearchInput.isEmpty("")).toBe(true);
      expect(SearchInput.isEmpty(" ")).toBe(true);
    });
  });
  describe("when called with a non empty value", () => {
    it("should return false", () => {
      expect(SearchInput.isEmpty("a")).toBe(false);
      expect(SearchInput.isEmpty(" a ")).toBe(false);
    });
  });
});
