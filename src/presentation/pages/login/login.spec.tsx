import React from "react";
import { render, RenderResult } from "@testing-library/react";
import Login from "./login";

type SutTypes = {
  sut: RenderResult;
};

const makeSut = (): SutTypes => {
  const sut = render(<Login />);

  return { sut };
};

describe("Login Component", () => {
  test("Should start with initial state", () => {
    const { sut } = makeSut();

    const errorWrap = sut.getByTestId("error-wrap");
    expect(errorWrap.childElementCount).toBe(0);

    const submit = sut.getByTestId("submit") as HTMLButtonElement;
    expect(submit.disabled).toBe(true);
  });
});
