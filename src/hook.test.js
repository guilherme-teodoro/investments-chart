import { renderHook, act } from "@testing-library/react-hooks";
import { useFetch, useLocalStorage } from "./hook";

beforeEach(() => {
  localStorage.clear();
});

test("useFetch performs GET request", async () => {
  fetch.mockResponseOnce(JSON.stringify({ data: "12345" }));

  const url = "http://domain.com";
  const { result, waitForNextUpdate } = renderHook(() => useFetch(url));

  act(() => {
    expect(result.current[0]).toBe(null);
    expect(result.current[1]).toBe(true);
  });

  await waitForNextUpdate();

  expect(result.current[0].data).toBe("12345");
  expect(result.current[1]).toBe(false);
});

describe("useLocaleStorage", () => {
  test("when localeStorage is empty", () => {
    const key = "key";
    const initialValue = { data: "initialValue" };
    const newValue = { data: "newValue" };
    const { result } = renderHook(() => useLocalStorage(key, initialValue));

    act(() => {
      const [data, setValue] = result.current;
      expect(data).toEqual(initialValue);

      setValue(newValue);
    });

    const [data] = result.current;

    expect(data).toEqual(newValue);
    expect(localStorage.setItem).toHaveBeenLastCalledWith(
      key,
      JSON.stringify(newValue)
    );
  });

  test("when localeStorage has a value", () => {
    const key = "key";
    const initialValue = { data: "initialValue" };
    renderHook(() => useLocalStorage(key, initialValue));

    expect(localStorage.getItem).toHaveBeenLastCalledWith(key);
  });
});
