import React from "react";
import {
  cleanup,
  render,
  RenderResult,
  fireEvent,
} from "@testing-library/react";
import Login from "./login";
import { Validation } from "@/presentation/protocols/validation";

type SutTypes = {
  sut: RenderResult;
  validationSpy: ValidationSpy;
};

class ValidationSpy implements Validation {
  errorMessage: string;
  input: object;

  validate(input: object): string {
    this.input = input;
    return this.errorMessage;
  }
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy();
  const sut = render(<Login validation={validationSpy} />);

  return { sut, validationSpy };
};

describe("Login Component", () => {
  afterEach(cleanup);
  test("Should start with initial state", () => {
    const { sut } = makeSut();

    const errorWrap = sut.getByTestId("error-wrap");
    expect(errorWrap.childElementCount).toBe(0);

    const submit = sut.getByTestId("submit") as HTMLButtonElement;
    expect(submit.disabled).toBe(true);
  });

  test("Should call validation with correct email", () => {
    const { sut, validationSpy } = makeSut();

    const emailInput = sut.getByTestId("email") as HTMLButtonElement;

    fireEvent.input(emailInput, { target: { value: "any_email" } });
    expect(validationSpy.input).toEqual({
      email: "any_email",
    });
  });

  test("Should call validation with correct password", () => {
    const { sut, validationSpy } = makeSut();

    const passwordInput = sut.getByTestId("password") as HTMLButtonElement;

    fireEvent.input(passwordInput, { target: { value: "any_password" } });
    expect(validationSpy.input).toEqual({
      password: "any_password",
    });
  });
});
